# Analytics & Monitoring Implementation Guide

## Goals

- Provide actionable telemetry for marketing and product decisions.
- Detect runtime errors and performance bottlenecks in production.
- Keep instrumentation privacy-aware and environment-specific.

## Tooling Decisions

- **Product analytics**: Google Analytics 4 (GA4) with measurement ID stored in `VITE_GA_MEASUREMENT_ID`.
- **Error monitoring**: Sentry JavaScript SDK loaded in the Vite application with DSN stored in `VITE_SENTRY_DSN`.
- **Performance metrics** (optional): Web Vitals reporting via `web-vitals` package piped to analytics endpoint.

Document any deviations (e.g., vendor changes) in this file so stakeholders stay aligned.

## Environment Configuration

1. Add the following variables to `.env.example` (done):
   - `VITE_GA_MEASUREMENT_ID`
   - `VITE_SENTRY_DSN`
2. Populate actual values in environment-specific secret stores:
   - Local: `.env`
   - Staging/Production: Hosting provider (e.g., Vercel/Netlify) environment variables.
3. For Supabase Edge Functions or backend workers, store backend-only keys with `supabase secrets set ...` and mirror in CI.

## Frontend Integration Steps

1. **Analytics wrapper**
   - Update `src/components/Analytics.tsx` to initialize GA4 only when the measurement ID is present.
   - Track route changes by subscribing to React Router navigation events.
   - Guard against SSR/build-time execution by checking `typeof window !== 'undefined'`.

2. **Error monitoring**
   - Initialize Sentry in `src/main.tsx` using the DSN from `import.meta.env.VITE_SENTRY_DSN`.
   - Enable source maps (`build.sourcemap = true` in `vite.config.ts`) for staged environments.
   - Wrap the root component in `Sentry.ErrorBoundary` with a user-friendly fallback UI.

3. **Performance data (optional)**
   - Import `reportWebVitals` (create `src/reportWebVitals.ts`) and send metrics to GA/Sentry.

## Privacy & Consent

- Implement a consent banner for EU/EEA visitors. Until consent is given, defer GA initialization and anonymize IPs (`gtag('config', id, { anonymize_ip: true })`).
- Update the site's privacy policy to describe data collection practices.

## Testing & Verification

- **Unit tests**: Mock `window.gtag` and Sentry to verify configuration branches.
- **Integration tests**: Run Cypress or Playwright in staging to ensure analytics scripts load only when env vars present.
- **Manual checks**:
  - GA DebugView to confirm pageview events.
  - Sentry dashboard to confirm error capture with correct release/environment tags.

## CI/CD Considerations

- Add `npm run lint`, `npm run test`, and `npm run build` steps that run with analytics env vars unset to ensure graceful degradation.
- Optionally add a pipeline step that pings GA Measurement Protocol with a dry-run event to verify credentials.
- Upload sourcemaps to Sentry as part of the build (using `sentry-cli`).

## Monitoring & Runbook

- GA4: Create dashboards for traffic, conversion funnels, and event goals. Share with marketing stakeholders.
- Sentry: Configure alert rules (e.g., issue frequency, new issue) to email/PagerDuty the engineering contact.
- Review analytics dashboards weekly; triage Sentry alerts daily.

## Rollout Checklist

- **Environment variables set** in staging and production.
- **Analytics & Sentry initialized** behind feature flags/consent checks.
- **Sourcemaps uploaded** for production builds.
- **Dashboards and alerts** shared with stakeholders.
- **Documentation updated** (this guide + `docs/environment-setup.md`).
