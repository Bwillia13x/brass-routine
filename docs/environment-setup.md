# Environment & Supabase Setup

## Overview

This project relies on Supabase for authentication, profile storage, booking requests, and contact form submissions. The frontend is built with Vite + React and consumes Supabase REST APIs through the official client SDK. Each environment (local, staging, production) must provide its own Supabase credentials via environment variables.

## Environment Variables

Copy `.env.example` to `.env` in the project root and provide environment-specific values. Do **not** commit the populated `.env` file.

Required variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Optional variables (future expansion):

- `VITE_SUPABASE_SERVICE_ROLE` for server-side automation (never expose to browser)
- Analytics IDs (e.g., `VITE_GA_MEASUREMENT_ID`)
- Error monitoring DSNs (e.g., `VITE_SENTRY_DSN`)

### Local Development

1. Create a new Supabase project for local testing or reuse a staging project.
2. In the Supabase dashboard, navigate to **Project Settings → API** and copy the project URL and anon key.
3. Add the values to your local `.env` file:

   ```bash
   VITE_SUPABASE_URL="https://your-project-ref.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key"
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

### Staging

1. Provision a dedicated Supabase project for staging.
2. Store the staging Supabase URL and anon key as environment variables in your hosting provider (e.g., Vercel/Netlify) under a staging environment.
3. Deploy the app using the staging branch; verify the staging URL uses staging Supabase credentials.
4. Apply Supabase migrations (see below) to keep staging in sync with production schema.

### Production

1. Create a production Supabase project; rotate credentials if any have been exposed in version control.
2. Store Supabase URL/anon key in secure secret management (hosting provider environment variables, Vault, etc.).
3. Restrict access to the Supabase anon key (only injected at build/runtime via hosting provider).
4. Confirm RLS policies are enabled to protect production data.

## Supabase Database Schema

The Supabase migrations in `supabase/migrations/` must be applied to every environment:

- `20250913023516_e27a8275-4206-4924-9545-e2f818014556.sql`
- `20250915191938_fc7a1b71-e824-466b-8130-8e72be2d5fdd.sql`
- `20250924150500_notifications_queue.sql`

### Applying Migrations

1. Install the Supabase CLI: <https://supabase.com/docs/guides/cli>
1. Authenticate with `supabase login`.
1. Navigate to the project root and set the project reference for the target environment:

   ```bash
   supabase link --project-ref your-project-ref
   ```

1. Apply migrations:

   ```bash
   supabase db push
   ```

Alternatively, you can run the SQL files manually via the Supabase dashboard **SQL Editor**.

1. Deploy notification edge function (after configuring secrets):

   ```bash
   supabase functions deploy notify-booking
   supabase functions schedule create notify-booking --cron "*/2 * * * *"
   ```

## Authentication & Profiles

- `profiles`, `appointments`, and `contact_messages` tables are protected by Row Level Security (RLS) defined in the migrations.
- Ensure `auth.users` triggers (`on_auth_user_created`) are enabled to automatically create profile rows.
- Update email templates and authentication settings in the Supabase dashboard (e.g., redirect URLs, SMTP provider).

## Admin Role Management Snippets

Use these snippets to elevate specific accounts and verify Row Level Security (RLS) behavior across sensitive tables.

### Identify Supabase User IDs

Run this query in the Supabase SQL Editor (or via the CLI) to map user emails to their `auth.users.id` values. Copy the UUID that corresponds to the account you want to elevate.

```sql
select id, email, created_at
from auth.users
order by created_at desc;
```

### Assign or Revoke the Admin Role

Use parameterized queries where possible when running from application code. When testing in the SQL Editor, substitute the UUID manually.

```sql
-- grant the admin role
insert into public.user_roles (user_id, role)
values ('<auth_user_uuid>', 'admin')
on conflict (user_id, role) do nothing;

-- double-check assigned roles
select user_id, role, granted_at
from public.user_roles
where user_id = '<auth_user_uuid>';

-- revoke if needed
delete from public.user_roles
where user_id = '<auth_user_uuid>'
  and role = 'admin';
```

### Check Effective Policies

Confirm the policies that apply to each protected table before testing access.

```sql
select policyname, permissive, roles
from pg_policies
where schemaname = 'public'
  and tablename = 'contact_messages';
```

### RLS Verification Walkthrough

Supabase policies rely on the `request.jwt.claim.sub` session value to determine the current user. You can emulate authenticated requests directly in SQL by setting the session role and JWT claims before executing your test queries.

```sql
set local role authenticated;
set local "request.jwt.claim.sub" = '<auth_user_uuid>';
set local "request.jwt.claim.role" = 'authenticated';

-- confirm the impersonated identity
select auth.uid() as current_uid;

-- verify RLS results for non-admin users
select id, full_name, email
from public.contact_messages;

-- ensure the user has an admin entry, then re-run broader visibility checks
select id, client_name, preferred_date
from public.appointments;

-- reset session changes when finished
reset role;
reset all;
