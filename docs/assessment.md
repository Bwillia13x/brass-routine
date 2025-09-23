# Platform Readiness Assessment

## Summary
- **Project type:** Vite + React + TypeScript frontend with Supabase backend (auth + Postgres).
- **Deployment target:** Lovable-hosted static frontend with Supabase as managed backend.
- **Overall readiness:** Strong foundation, but several production readiness gaps in configuration management, form validation, and Supabase integration ergonomics.

## Frontend Assessment
- ✅ Modern stack (React 18, TanStack Query, shadcn/ui, Tailwind CSS) with modular page components.
- ✅ Global error boundary, lazy loaded routes, and shared layout primitives already in place.
- ⚠️ Critical configuration values (Supabase URL and anon key) are hard-coded in source. This blocks environment-specific builds and leaks secrets.
- ⚠️ Key forms (Booking, Contact) rely on uncontrolled browser validation with manual state management, no schema validation, and duplicate Supabase mutation code.
- ⚠️ Navigation actions in CTA buttons use `window.location.href` which bypasses router navigation (hurting SPA UX and analytics). Lower severity but noted.
- ⚠️ No shared API layer around Supabase. Pages call `.from().insert()` directly, repeating mapping logic and omitting structured error reporting/logging.

## Backend Assessment (Supabase)
- ✅ SQL migrations define core tables with Row Level Security (RLS) and helper functions for roles.
- ✅ Supabase types generated for typed client usage.
- ⚠️ No environment abstraction around Supabase credentials (risks deploying wrong project, leaking keys, and complicates staging/prod split).
- ⚠️ Missing structured error objects / logging around inserts. Failures surface as generic toast errors with no diagnostics.
- ⚠️ No rate limiting/throttling for public contact form. (Out of scope for this iteration but tracked.)

## Recommended Development Tasks
1. **Configuration hardening**
   - Load Supabase credentials from `import.meta.env` with runtime guards.
   - Provide `.env.example` and update docs for environment setup.

2. **Supabase client ergonomics**
   - Centralize mutation helpers (e.g., `submitContactMessage`, `submitAppointmentRequest`) that sanitize payloads and return typed results/errors.
   - Normalize error messages for frontend toasts and future logging.

3. **Form validation and UX polish**
   - Refactor Booking and Contact forms to `react-hook-form` + `zod` schemas.
   - Display inline validation feedback and disable submit while processing.

4. **(Backlog)** Router-based navigation helpers, Supabase service layer tests, audit logging for RLS actions.

## Execution Plan (current sprint)
- Implement tasks 1–3 above.
- Ensure ESLint passes and document configuration updates for the team.
