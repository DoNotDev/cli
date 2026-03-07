---
name: polish
description: Generate tests, database rules, CI/CD, config, fix bugs, i18n (Phase 4). Use AFTER /build when the app works and needs production-readiness.
argument-hint: [task]
disable-model-invocation: true
---

# Polish — Production-Ready

**WORKFLOW:** `/brainstorm` → `/design` → `/build` → `/polish`

## Step 0 — Start Phase (MANDATORY)

```
start_phase(4)
```
Do NOT proceed without this call.

## Step 1 — Read Context

- `guides/wai-way/spec_template.md` — validated spec (test plan)
- `entities/index.ts` — all entity definitions
- `src/pages/` — all page files

## Steps 2-5 — Parallel-capable

These steps are independent. Launch them in parallel when possible:

### Tests
Call `get_guide("TESTING")` for patterns.
- Entity tests → `tests/entities/[Entity].test.ts`
- Page tests → `tests/pages/[Page].test.tsx`
- Access control → `tests/access/access-rules.test.ts`

### Database Rules
Auto-detect provider (Firestore or Supabase RLS). Generate rules from entity access definitions.

### CI/CD
Create `.github/workflows/ci.yml` — type-check → test → build → deploy.

### Config
- `src/config/app.ts` — APP_NAME, preset, footer
- `src/config/legal.ts` — company, contacts, jurisdiction
- `.env` — provider config, license key

## Step 6 — Validate

```bash
bun test
```
All tests must pass. Fix failures.

## Step 7 — Mobile Check

DevTools → 375px → navigation, forms, text, buttons (44px min).

## Step 8 — i18n (Optional)

Extract strings to `src/locales/`, replace with `useTranslation()`.

## Ship Readiness

- `dndev tc` passes
- `bun test` passes
- Database rules generated
- CI/CD created
- No critical bugs
- Mobile works at 375px

## Complete Phase

```
complete_phase({ files: ["...all test/config files..."], summary: "Tests passing, config complete, ready to ship" })
```

Wait for user `approve_phase()`. Then → `dndev deploy`.
