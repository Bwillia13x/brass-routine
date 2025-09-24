# TypeScript Strict Mode Guide

## Overview

Strict mode is now enabled in `tsconfig.json` and `tsconfig.app.json`, and CI runs `npm run typecheck` (`tsc --noEmit`) to ensure type safety. This document summarizes the expectations for contributors and provides tips for resolving common issues.

## Local Workflow

1. Install dependencies: `npm install`
2. Run the type checker before committing:
   ```bash
   npm run typecheck
   ```
3. Use `npm run build` or `npm run dev` to confirm runtime behavior after addressing type errors.

> **Tip:** Configure your editor to use the workspace TypeScript version (`typescript@^5.8.3`) so diagnostics match CI.

## Common Fix Patterns

- **Missing null checks**: Guard access with optional chaining or explicit `if (!value)` checks.
- **Implicit `any`**: Add explicit parameter/return types or leverage generics from utility libraries.
- **Union narrowing**: Use `switch` statements or type predicates to discriminate unions returned by Supabase queries or API responses.
- **3rd-party types**: Install `@types/*` packages or create module declarations in `src/types/`.
- **Case-sensitive imports**: Align file paths with actual casing; `forceConsistentCasingInFileNames` now fails mixed-case imports.

## Working With Supabase

- Type Supabase queries using generated types if available, or create `Database` interfaces describing table columns.
- For RLS-protected tables, prefer strongly typed service layers that map raw rows to domain models.

## Pull Request Expectations

- CI (lint → typecheck → build → test) must pass with no skipped checks.
- Include type-related refactors in the PR description when they change business logic.
- Document remaining `TODO` comments or follow-up tickets if strict mode reveals deeper issues outside the current scope.

## Troubleshooting

- Use `tsc --noEmit --pretty false` for concise CI-style output locally.
- When dependencies lack types, wrap them in typed adapters rather than disabling strict flags globally.

## Resources

- [TSConfig reference](https://www.typescriptlang.org/tsconfig)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Supabase TypeScript docs](https://supabase.com/docs/reference/javascript/typescript-support)
