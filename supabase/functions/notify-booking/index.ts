import { createClient } from "jsr:@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
const twilioFromNumber = Deno.env.get("TWILIO_FROM_NUMBER");

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
  },
});

type QueueEntry = {
  id: string;
  table_name: string;
  record_id: string;
  payload: Record<string, unknown>;
  status: string;
  attempt_count: number;
};

async function markAsProcessed(entry: QueueEntry) {
  await supabase
    .from("notifications.queue")
    .update({ status: "processed", attempt_count: entry.attempt_count + 1 })
    .eq("id", entry.id);
}

async function markAsFailed(entry: QueueEntry, errorMessage: string) {
  const { error: updateError } = await supabase
    .from("notifications.queue")
    .update({
      status: "failed",
      attempt_count: entry.attempt_count + 1,
      last_error: errorMessage,
    })
    .eq("id", entry.id);

  if (updateError) {
    console.error("Failed to update queue status", updateError.message);
  }

  const { error: failureError } = await supabase.from("notifications.failures").insert({
    queue_id: entry.id,
    error_message: errorMessage,
  });

  if (failureError) {
    console.error("Failed to log failure", failureError.message);
  }
}

async function sendEmail(entry: QueueEntry) {
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY not configured; configure to enable email delivery");
  }

  // TODO: Replace with actual Resend API call. This placeholder logs the payload.
  console.log("[notify-booking] Email stub", {
    table: entry.table_name,
    record: entry.payload,
  });
}

async function sendSms(entry: QueueEntry) {
  if (!twilioAccountSid || !twilioAuthToken || !twilioFromNumber) {
    console.log("Twilio credentials not set; skipping SMS delivery");
    return;
  }

  // TODO: Replace with actual Twilio API call. This placeholder logs the payload.
  console.log("[notify-booking] SMS stub", {
    table: entry.table_name,
    record: entry.payload,
  });
}

async function processEntry(entry: QueueEntry) {
  try {
    // Implement channel selection logic based on table_name or payload metadata.
    await sendEmail(entry);
    await sendSms(entry);
    await markAsProcessed(entry);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Failed to process notification", { id: entry.id, message });
    await markAsFailed(entry, message.slice(0, 500));
  }
}

async function getPendingEntries(limit = 25) {
  const { data, error } = await supabase
    .from("notifications.queue")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch pending queue entries: ${error.message}`);
  }

  return (data ?? []) as QueueEntry[];
}

Deno.serve(async (req) => {
  if (req.method !== "POST" && req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const entries = await getPendingEntries();

    if (entries.length === 0) {
      return new Response(JSON.stringify({ processed: 0, message: "No pending notifications" }), {
        headers: { "content-type": "application/json" },
      });
    }

    await Promise.all(entries.map((entry) => processEntry(entry)));

    return new Response(
      JSON.stringify({
        processed: entries.length,
        message: "Processed notification queue",
      }),
      {
        headers: { "content-type": "application/json" },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("notify-booking failure", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
});
