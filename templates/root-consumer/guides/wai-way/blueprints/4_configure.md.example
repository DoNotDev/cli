# BLUEPRINT: 4_CONFIGURE + TEST

**Goal:** Generate test files, configure the app, verify everything works.

**MCP:** `start_phase(4)` to begin. `complete_phase({ files: [...], lesson: "..." })` when done.
**Done when:** Tests pass, config complete, firestore rules generated.

**Prerequisite:** Phase 0-3 complete. PRD + HLD + LLD validated, app is functional with hardcoded strings.

---

## Step 1: Generate Test Setup

Create these files:

### vitest.config.ts
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
});
```

### tests/setup.ts
```ts
import '@testing-library/jest-dom';
```

**READ** `get_guide("TESTING")` for full testing patterns.

---

## Step 2: Generate Entity Tests

**READ:** `entities/index.ts` — get the list of all entities.
**READ:** `docs/PRD.md` — get the permissions matrix and business rules.
**READ:** `docs/LLD.md` — get the per-entity access matrices.

For **each entity** in `entities/`, create `tests/entities/[EntityName].test.ts`:

- [ ] All required fields are defined
- [ ] Field types match spec
- [ ] Access rules match spec (create/read/update/delete per role)
- [ ] State transitions are valid (if entity has states)
- [ ] Default values set correctly

---

## Step 3: Generate Page Tests

**READ:** Every `src/pages/*Page.tsx` file.

For **each page**, create `tests/pages/[PageName].test.tsx`:

- [ ] Page renders without error
- [ ] PageMeta is defined (title, auth, admin)
- [ ] Route protection matches HLD page map (public pages have `auth: false`, protected have `auth: true`, admin have `admin: true`)

---

## Step 4: Generate Access Control Tests

**READ:** `docs/PRD.md` permissions matrix and `docs/LLD.md` access matrices.

Create `tests/access/access-rules.test.ts`:

- [ ] Admin-only entities require admin access
- [ ] User-owned entities have owner access on update/delete
- [ ] Public entities allow guest read
- [ ] No entity allows unauthenticated write

---

## Step 5: Generate Firestore Rules

**READ:** All entities' access definitions.

Create `firestore.rules` from entity access rules:

- Each entity's collection maps to a Firestore match rule
- `create` access → `allow create` condition
- `read` access → `allow read` condition
- `update` access → `allow update` condition
- `delete` access → `allow delete` condition
- `owner` → `resource.data.userId == request.auth.uid`
- `admin` → `request.auth.token.admin == true`
- `authenticated` → `request.auth != null`

---

## Step 6: Update Configuration

### app.ts
**READ:** `src/config/app.ts`
- [ ] `APP_NAME` from PRD
- [ ] `APP_SHORT_NAME` abbreviation
- [ ] `preset` from HLD (landing/admin/moolti/docs/blog/game/plain)
- [ ] Footer legal links

### legal.ts
**READ:** `src/config/legal.ts`
- [ ] Company name and registration
- [ ] Contact emails
- [ ] Hosting provider
- [ ] Jurisdiction

### .env
- [ ] `VITE_FIREBASE_*` — Firebase config values
- [ ] `VITE_DONOTDEV_LICENSE_KEY` — License key
- [ ] Optional: `VITE_STRIPE_*`, `VITE_SENTRY_DSN`

---

## Step 7: Generate CI/CD

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run type-check
      - run: bun test

  deploy:
    needs: quality
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
```

Adapt based on spec:
- If **functions** enabled → add `firebase deploy --only functions` step
- If **staging** environment → add staging job with `dndev staging`
- If **no Firebase** (Vercel) → replace deploy job with Vercel action

---

## Step 8: Run Tests

```bash
bun test
```

Fix any failures. All tests must pass.

---

## Step 9: Mobile Check

1. Open DevTools (F12) → device toolbar (Ctrl+Shift+M) → 375px
2. Check:
   - [ ] Navigation works (mobile menu)
   - [ ] Forms are usable
   - [ ] Text is readable
   - [ ] Buttons tappable (44px min)
   - [ ] No horizontal scroll

---

## Step 10: i18n (Optional)

**Only after Steps 1-9 pass!**

Extract hardcoded strings to `src/locales/[namespace]_en.json`, replace with `useTranslation()`.

---

## Final Checklist

- [ ] `vitest.config.ts` created
- [ ] Entity tests generated (one per entity)
- [ ] Page tests generated (one per page)
- [ ] Access control tests generated
- [ ] `firestore.rules` generated from entities
- [ ] `.github/workflows/ci.yml` generated
- [ ] `app.ts` configured
- [ ] `legal.ts` configured
- [ ] `.env` configured
- [ ] `bun test` passes
- [ ] Mobile responsive at 375px
- [ ] (Optional) i18n added

---

## Output

Call `complete_phase` with ALL generated test files + config files:

```
complete_phase({
  files: [
    "vitest.config.ts",
    "tests/setup.ts",
    "tests/entities/Task.test.ts",
    "tests/entities/User.test.ts",
    "tests/pages/DashboardPage.test.tsx",
    "tests/access/access-rules.test.ts",
    "firestore.rules",
    ".github/workflows/ci.yml",
    "src/config/app.ts",
    "src/config/legal.ts"
  ],
  lesson: "..."
})
```
