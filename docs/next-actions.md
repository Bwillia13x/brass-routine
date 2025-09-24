# Immediate Next Actions

## Secrets Rotation

- Rotate the Supabase anon and service keys that were previously committed.
- Update environment variables everywhere they are used:
  - Local `.env` files
  - Hosting provider secrets for staging and production
  - Supabase dashboard webhooks or integrations, if any
- Invalidate old keys through the Supabase dashboard (`Project Settings → API → Reset Keys`).
- After rotation, run `npm run build` locally to confirm the new keys are loaded correctly, and redeploy staging/production builds.

## Hosting Selection & Configuration

- Choose the primary hosting provider (e.g., Vercel, Netlify, Supabase Hosting).
- Configure separate staging and production deployments with environment-specific variables.
- Document deployment commands (e.g., `npm run build`) and confirm the CI workflow mirrors the hosting build process.
- Set up custom domain mapping, HTTPS certificates, and redirect rules once hosting is chosen.

## Upcoming Tasks Once Above Are Complete

- Apply Supabase migrations to staging/production using the Supabase CLI (`supabase db push`).
- Implement booking/contact form notifications and spam protection.
- Add automated tests (unit + end-to-end) and extend the CI pipeline to run them.
- Integrate analytics/monitoring (GA4, Sentry) with real keys per environment.
- Evaluate enabling TypeScript strictness options (`strict`, `forceConsistentCasingInFileNames`) and capture remediation work needed before toggling them on.

## Supabase Role Assignment & RLS Verification

- Identify the target `auth.users.id` from the Supabase dashboard.
- Grant admin role:

  ```sql
  insert into public.user_roles (user_id, role)
  values ('<auth_user_uuid>', 'admin')
  on conflict (user_id, role) do nothing;
  ```

- Validate RLS:

  ```sql
  set role authenticated;
  select * from public.contact_messages;
  ```

## Booking & Contact Notifications

1. **Define success criteria**: Document who should receive alerts (studio owner, staff, customer confirmations) and required delivery windows (instant vs. daily digest).
2. **Select delivery channel**: Evaluate Supabase Edge Functions + Resend/SMTP (email), SMS (Twilio), and dashboard-only notifications. Capture trade-offs and costs in `docs/notifications.md` (create as needed).
3. **Provision secrets**: Store provider API keys as Supabase project secrets (`supabase secrets set ...`) and mirror them in hosting environment variables.
4. **Implement database trigger**: Create SQL trigger/function on `public.appointments` and `public.contact_messages` that pushes payloads to a new notifications queue table or directly invokes an Edge Function.
5. **Build Edge Function**: Use Supabase CLI (`supabase functions new notify-booking`) to send templated emails/SMS. Include retry/error logging.
6. **Update UI feedback**: Ensure booking/contact forms in `src/pages/BookingPage.tsx` and related components surface success/failure states tied to notification outcomes.
7. **Test end-to-end**: Add Vitest/integration tests mocking Supabase responses, plus manual staging verification using test submissions.
8. **Monitor delivery**: Stream logs via `supabase functions logs` and add dashboard views for failed notifications.

## Analytics & Monitoring

1. **Pick tooling**: Confirm GA4 for product analytics and Sentry (or LogRocket) for error monitoring; log decisions in `docs/analytics.md`.
2. **Manage environment keys**: Add placeholders to `.env.example` (`VITE_GA_MEASUREMENT_ID`, `VITE_SENTRY_DSN`) and configure real values via hosting provider secrets per environment.
3. **Instrument frontend**: Initialize analytics in `src/components/Analytics.tsx` with route change tracking; wrap `src/main.tsx` with Sentry error boundary.
4. **Privacy & consent**: Add cookie consent UI if required and ensure GA is disabled until consent is granted in applicable regions.
5. **Quality gates**: Add unit tests to verify analytics init toggles and Sentry configuration in test mode.
6. **Operationalize**: Document dashboard URLs, alert thresholds, and on-call rotation expectations for stakeholders.

## TypeScript Strict Mode Prep

1. **Branch & toggle**: Create a feature branch and enable `strict` plus `forceConsistentCasingInFileNames` in `tsconfig.json`.
2. **Audit compiler errors**: Run `npm run build` and `npm run typecheck` (if available) to catalog violations. Tag each error with owning module/component.
3. **Prioritize fixes**: Group issues into quick wins (type annotations, null checks) vs. larger refactors. Create GitHub issues or TODOs per group.
4. **Gradual adoption**: Resolve critical blockers, then merge the stricter config guarded by `skipLibCheck` or per-module `tsconfig` overrides if necessary.
5. **Enforce in CI**: Update the CI pipeline to run `tsc --noEmit` so regressions fail builds once strict mode passes locally.
