# Testing Workflow

## Tooling

- **Vitest**: primary test runner (configured in `vite.config.ts`).
- **@testing-library/react**: rendering utilities for React component tests.
- **@testing-library/jest-dom**: extended DOM matchers; loaded via `src/test/setup.ts`.

## Scripts

- `npm run test`: executes the full Vitest suite once (used in CI).
- `npm run test:watch`: interactive watch mode for local development.

## Directory Structure

- Place reusable setup files under `src/test/`.
- Organize component tests under `src/test/components/`, hooks under `src/test/hooks/`, etc.
- Co-locate fixtures/mocks with the relevant test directories.

## Writing Tests

1. Import components using the `@` alias (e.g., `import Component from '@/components/Component'`).
2. Use Testing Library patterns (`render`, `screen`, `userEvent`).
3. Prefer querying by accessible roles/text labels to reflect real user interactions.
4. Clean up side effects (e.g., timers, mocks) within each test when needed.

### Example

```tsx
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '@/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('displays loading text', () => {
    render(<LoadingSpinner text="Loading" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
```

## Coverage Strategy

- Vitest coverage reports (`text` + `lcov`) are enabled; run `npm run test -- --coverage` to generate reports.
- Target critical paths first: navigation, booking forms, authentication flows (`src/pages/BookingPage.tsx`, `src/pages/Auth.tsx`).

## Continuous Integration

- `.github/workflows/ci.yml` runs lint, build, and test steps on `main` and pull requests.
- Keep CI green by running `npm run lint` and `npm run test` locally before pushing.
- Coverage thresholds are not enforced yet; plan to introduce minimum statements/branches coverage once core flows are tested.
- When adding new features, include corresponding unit tests to avoid regressions.

## Next Steps

- Expand tests to cover Supabase-dependent flows using mocks.
- Introduce integration/E2E testing (e.g., Cypress or Playwright) for booking and membership journeys.
- Consider adding visual regression or accessibility tests as the UI stabilizes.
