# Booking & Contact Notifications

## Overview

This guide outlines the plan to deliver notifications when new records are inserted into `public.appointments` and `public.contact_messages`. It covers stakeholder requirements, architecture options, implementation steps, and testing/monitoring guidelines for production readiness.

## Stakeholder Requirements

- **Recipients**: Studio owner (primary), optional CC to staff, optional customer confirmation messages.
- **Latency**: Owner/staff alerts should be near real-time (<2 minutes). Customer confirmations can tolerate up to 5 minutes.
- **Channels**: Email must be supported; SMS is optional but recommended for high-priority booking requests.
- **Reliability**: Automatic retries at least 3 times with exponential backoff. Manual replay should be possible from failed event logs.
- **Compliance**: Notifications must include business contact info and opt-out instructions where appropriate (SMS regulations).

## Architecture Selection

| Option | Pros | Cons | Notes |
| --- | --- | --- | --- |
| Supabase Edge Function + Resend (Email) | Serverless, low maintenance, templated email support | Requires external provider, rate limits | Suggested default path |
| Supabase Edge Function + Twilio (SMS) | Reliable SMS delivery, dynamic sender IDs | Higher cost, compliance requirements | Use for priority alerts |
| External webhook (Zapier/Make) | Quick to prototype, non-code automation | Vendor lock-in, limited control | Acceptable interim solution |

**Recommendation**: Build Supabase Edge Functions that call Resend for email and optionally Twilio for SMS. Maintain all logic within Supabase to simplify deployment and auditing.

## Environment & Secrets

Store credentials securely; never commit real keys.

- `supabase secrets set RESEND_API_KEY="..."`
- `supabase secrets set TWILIO_ACCOUNT_SID="..."`
- `supabase secrets set TWILIO_AUTH_TOKEN="..."`
- Mirror the same values as hosting provider environment variables (e.g., Vercel project settings).

Update `.env.example` if browser-visible keys are ever required (not expected for server-side notifications).

## Database Trigger Flow

1. Create a helper schema (`notifications`) to store a queue table and logging table.
2. Write a SQL function that enqueues events for both bookings and contacts.
3. Attach `AFTER INSERT` triggers to `public.appointments` and `public.contact_messages`.

Example SQL outline:

```sql
create schema if not exists notifications;

do $$
begin
  if not exists (
    select 1 from pg_tables
    where schemaname = 'notifications' and tablename = 'queue'
  ) then
    create table notifications.queue (
      id uuid primary key default gen_random_uuid(),
      table_name text not null,
      record_id uuid not null,
      payload jsonb not null,
      created_at timestamptz default now(),
      processed_at timestamptz
    );
  end if;
end$$;
```

Trigger function skeleton:

```sql
create or replace function notifications.enqueue_booking()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into notifications.queue (table_name, record_id, payload)
  values (TG_TABLE_NAME, new.id, to_jsonb(new));
  return new;
end;
$$;

create trigger on_appointments_insert
after insert on public.appointments
for each row execute function notifications.enqueue_booking();
```

Duplicate the trigger for `public.contact_messages`. The queue allows retries if an Edge Function fails.

## Edge Function Implementation

1. Initialize the function:

```bash
supabase functions new notify-booking
```

1. Implement logic in `supabase/functions/notify-booking/index.ts`:

- Fetch pending queue entries (optionally using Supabase RPC).
- Format email/SMS templates.
- Send via Resend/Twilio using secrets from the environment.
- Mark records as processed and store failures in `notifications.failures`.

1. Deploy and schedule:

```bash
supabase functions deploy notify-booking
supabase functions schedule create notify-booking --cron "*/2 * * * *"
```

Cron scheduling runs every 2 minutes; adjust based on latency requirements. Alternatively, invoke via webhook triggered by the database trigger (beta feature).

## Frontend Feedback & UX

- Update `src/pages/BookingPage.tsx` and related form components to display status messages when notifications succeed or fail (e.g., "Confirmation email sent").
- Surface fallback instructions if the notification queue is down (e.g., contact phone number).
- Optional: Expose a dashboard in the admin UI to view recent submissions and notification delivery status.

## Testing Strategy

- **Unit tests**: Mock Resend/Twilio endpoints and verify payload formatting.
- **Integration tests**: Use Supabase CLI local stack to run migrations + Edge Functions. Insert test records and assert queue processing.
- **Staging drills**: Perform manual submissions to ensure end-to-end delivery, capturing logs/screenshots for client sign-off.

## Monitoring & Alerting

- Stream logs via `supabase functions logs notify-booking --tail` during rollout.
- Create an alerting rule using provider webhooks (Resend/Twilio) to notify of repeated failures.
- Retain failed queue entries; schedule a daily job to email a summary of unprocessed notifications.

## Rollout Checklist

- **Secrets configured** in Supabase and hosting environments.
- **Queue tables migrated** using `supabase db push`.
- **Edge Function deployed** and cron schedule verified.
- **Unit/integration tests added** to CI pipeline.
- **UX messaging updated** in booking/contact pages.
- **Monitoring configured** with alert recipients documented.
- **Runbook documented** (this file) and shared with stakeholders.
