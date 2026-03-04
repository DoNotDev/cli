---
description: Generate tests, firestore rules, CI/CD, config, fix bugs, i18n (Phase 4) - AFTER /build
---

# Polish Command - Production-Ready App

**⚠️ MODE CHECK:** This command is for **Consumer App Development** only.

**If you're in the framework monorepo (this repo):**
- ❌ **DO NOT use `/polish`** - framework dev doesn't use this workflow
- ✅ See [Modes Guide](https://github.com/donotdev/framework/blob/main/docs/development/MODES.md) for framework dev workflow

**If you're in a consumer repo:**
- ✅ Use `/polish` after `/build` is complete
- ✅ Use `/polish` to generate tests, firestore rules, CI/CD
- ✅ Use `/polish` to fix bugs, add styling, add i18n
- ✅ Use `/polish` to finalize configuration

**WORKFLOW ORDER:**
1. `/brainstorm` → Extract requirements, generate spec
2. `/design` → Create technical plan
3. `/build` → Implement code using framework defaults
4. `/polish` → Generate tests, config, CI/CD, fix bugs (THIS COMMAND)

---

## Usage

```
/polish [task]
```

**Examples:**
```
/polish Generate all tests and firestore rules
/polish Fix bug: Projects list is empty
/polish Add French and Spanish translations
/polish Complete configuration and deploy
```

---

## Process

### Step 0: Start Phase (MANDATORY — DO THIS FIRST)

**BEFORE any polish work**, call:
```
start_phase(4)
```
This activates Phase 4: CONFIGURE and loads the blueprint, persona, context, and lessons. **Do NOT proceed without this call.**

### Step 1: Activate Polisher Agent

**Deploy:** `/agents polisher` (Phase 4 Polisher persona)

**READ first:**
- `guides/wai-way/spec_template.md` — validated spec (your test plan)
- `entities/index.ts` — all entity definitions
- `src/pages/` — all page files
- `guides/dndev/SETUP_TESTING.md` — testing patterns

### Step 2: Generate Tests

Call `get_guide("TESTING")` for patterns.

1. **Entity tests** — one per entity in `tests/entities/[Entity].test.ts`
2. **Page tests** — one per page in `tests/pages/[Page].test.tsx`
3. **Access control tests** — `tests/access/access-rules.test.ts`

### Step 3: Generate Firestore Rules

Create `firestore.rules` from entity access definitions.

### Step 4: Generate CI/CD

Create `.github/workflows/ci.yml` — type-check → test → build → deploy.

### Step 5: Configure

- `src/config/app.ts` — APP_NAME, preset, footer
- `src/config/legal.ts` — company, contacts, jurisdiction
- `.env` — Firebase config, license key

### Step 6: Run Tests

```bash
bun test
```

All tests must pass.

### Step 7: Fix Bugs (if any)

- Understand → Diagnose → Fix (minimal) → Verify → Check regressions

### Step 8: Mobile Check

DevTools → 375px → navigation, forms, text, buttons (44px)

### Step 9: i18n (Optional)

Extract strings to `src/locales/`, replace with `useTranslation()`.

---

## What Polisher Does

| Task | Description |
|------|-------------|
| **Test Generation** | Entity tests, page tests, access tests from spec |
| **Firestore Rules** | Security rules from entity access definitions |
| **CI/CD** | GitHub Actions workflow (test → build → deploy) |
| **Configuration** | app.ts, legal.ts, .env, Firebase setup |
| **Bug Fixes** | Diagnose and fix bugs with minimal changes |
| **i18n** | Extract strings, create translation files (optional) |

---

## Ship Readiness

App is ready to ship when:
- ✅ `dndev tc` passes
- ✅ `bun test` passes
- ✅ `firestore.rules` generated
- ✅ `.github/workflows/ci.yml` created
- ✅ No critical bugs
- ✅ Auth is secure
- ✅ Mobile works at 375px
- ✅ Configuration complete
- ✅ (Optional) i18n added

## Phase Completion (MANDATORY)

When all ship readiness checks pass, call:
```
complete_phase({ files: ["...all test/config files..."], summary: "Tests passing, config complete, ready to ship" })
```
Wait for user to call `approve_phase()`.

---

## Next Step

Once app is production-ready:
→ `dndev deploy`
