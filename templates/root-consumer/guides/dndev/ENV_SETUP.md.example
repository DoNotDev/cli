# Getting Started

**The complete onboarding flow — from `dndev init` to deployed app.**

If you haven’t run `dndev init` yet, see [AGENT_START_HERE.md](./AGENT_START_HERE.md) § **Getting started (for humans)** (P0 → Install CLI → Run AI.md → Enjoy).

---

## The Flow

```
bun install                    → install dependencies
dndev dev                      → start app, read the homepage setup guide
dndev coach                    → see what to configure (numbered checklist)
  (fill in .env values from dashboard)
dndev setup                    → validate .env, automate provider config
dndev doctor                   → health check
dndev emu start                → test locally with emulators (Firebase)
dndev deploy                   → deploy to production
```

---

## Step 1: Install & Run

```bash
bun install
dndev dev
```

Open the app. The homepage shows every setup step with instructions.

---

## Step 2: Git

```bash
git init
git add . && git commit -m "Initial scaffold"
```

Create a repo on GitHub, then:

```bash
git remote add origin <your-repo-url>
git push -u origin main
```

---

## Step 3: Backend Setup

### 1. See what to configure

```bash
dndev coach
```

Prints a numbered checklist: which dashboard to visit, what to copy, where to paste it. No automation, no prompts.

### 2. Fill in credentials

Follow the coach checklist. Paste **public** credentials into `apps/<app>/.env`, and **secret** keys into `.dndev.secrets` at project root.

### 3. Run setup

```bash
dndev setup
```

Validates all required env vars are present, runs provider automation (CLI linking, migrations, etc.), and runs an inline health check. If values are missing, it tells you which ones and points you back to `dndev coach`.

See [SETUP_FIREBASE.md](./SETUP_FIREBASE.md) or [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) for full details. See [Secrets Philosophy](#secrets-philosophy) for how we handle secret keys.

---

## Step 4: Test Locally

```bash
dndev emu start          # Firebase emulators
```

Select services: Auth + Firestore + Functions. This starts Firebase emulators so you can develop without touching production.

For Supabase, development runs against your Supabase project directly (or use `supabase start` for local Supabase if installed).

---

## Step 5: Build With AI

Open the project in **Cursor**, **Claude Code**, **Windsurf**, or **AntiGravity**.

The AI reads `AI.md` and follows the WAI-WAY protocol:
- Phase 0: Brainstorm -> produce a spec
- Phase 1: Scaffold -> create pages
- Phase 2: Entities -> define data models
- Phase 3: Compose -> build pages with components
- Phase 4: Configure -> generate tests, firestore rules, CI/CD

Read `guides/wai-way/WAI_WAY_CLI.md` for the full workflow.

---

## Step 6: Deploy

```bash
dndev deploy
```

Deploys hosting + functions + rules. Syncs runtime secrets automatically before deploying functions.

---

## Secrets Philosophy

**DoNotDev follows strict rules about credentials:**

### Tier 1: Public Keys -- We Ask Directly

These are safe to share, shipped in your client JS bundle. We ask for them during setup.

| Key | Where It Goes |
|-----|--------------|
| Firebase API key, project ID, auth domain, etc. | `apps/<app>/.env` as `VITE_FIREBASE_*` |
| Supabase project URL | `apps/<app>/.env` as `VITE_SUPABASE_URL` |
| Supabase anon key (public JWT) | `apps/<app>/.env` as `VITE_SUPABASE_ANON_KEY` |
| Stripe publishable key | `apps/<app>/.env` as `VITE_STRIPE_PUBLISHABLE_KEY` |

### Tier 2: Secret Keys -- One File, Project Root

All secret keys go in **`.dndev.secrets`** at project root (gitignored). One file, every secret.

| Key | How To Get It |
|-----|---------------|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens |
| `SUPABASE_SECRET_KEY` | Supabase Dashboard → Settings → API |
| `SUPABASE_ACCESS_TOKEN` | https://supabase.com/dashboard/account/tokens |
| `STRIPE_SECRET_KEY` | https://dashboard.stripe.com/apikeys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks |

Resolution order: `process.env` (CI) → `.dndev.secrets` (local) → legacy paths (with warning).

Then sync to your runtime:

```bash
dndev sync-secrets                    # -> Firebase Secret Manager or Vercel env
dndev sync-secrets --target github    # -> GitHub Secrets (for CI/CD)
```

### Tier 3: Service Account Files -- Download, Place, Gitignore

| File | Where It Goes | How To Get It |
|------|--------------|---------------|
| `service-account-key.json` | App root (next to firebase.json) | Firebase Console -> Settings -> Service Accounts |
| `service-account-key.staging.json` | Same location, for staging | Same, from staging project |

These files are `.gitignored`. Never commit them. For CI/CD, upload the file content as a GitHub Secret and decode it in your workflow.

---

## Environment Variables

**Public config** lives in each app's `.env`. **Secrets** live in `.dndev.secrets` at project root.

```
my-project/
+-- .dndev.secrets            <-- ALL secrets (gitignored)
+-- .dndev.secrets.example    <-- Template (committed)
+-- apps/
|   +-- my-app/
|       +-- .env              <-- Public keys: VITE_*, VERCEL_ORG_ID, VERCEL_PROJECT_ID
|       +-- .env.staging      <-- Used by dndev staging
|       +-- .env.production   <-- Production overrides
|       +-- service-account-key.json  <-- Firebase SA (gitignored)
```

**Rules:**
- `VITE_*` / `NEXT_PUBLIC_*` vars → `apps/<app>/.env` (public, shipped to browser)
- `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` → `apps/<app>/.env` (public, per-app)
- All secret keys → `.dndev.secrets` at project root (one file, gitignored)
- Service account files → app root, gitignored

---

## CLI Commands

| Command | What It Does |
|---------|-------------|
| `dndev dev` | Start dev server |
| `dndev emu start` | Start Firebase emulators |
| `dndev coach` | Show what to configure (numbered checklist) |
| `dndev setup` | Validate .env, automate provider config, health check |
| `dndev doctor` | Check project health (providers, .env) |
| `dndev deploy` | **Firebase:** hosting + functions + rules. **Supabase:** deploys frontend to [Vercel](https://vercel.com) (via scaffolded vercel.json) and Edge Functions to Supabase. Set `VITE_SUPABASE_*` in Vercel project env. |
| `dndev staging` | Deploy to staging environment |
| `dndev sync-secrets` | Push .dndev.secrets to runtime (Firebase/Vercel) |
| `dndev sync-secrets --target github` | Push secrets to GitHub Secrets (CI/CD) |
| `bun test` | Run tests (after Phase 4) |
| `bun run type-check` | TypeScript validation |

---

## What's Optional

| Feature | Required? | When to Set Up |
|---------|-----------|---------------|
| Git + GitHub | Recommended | Before starting development |
| Firebase or Supabase | Yes (pick one) | Before building any features |
| Cloud Functions | If using server logic | Before deploying functions |
| Stripe | If using billing | When adding payment features |
| GitHub Actions CI/CD | Optional | Phase 4 generates the workflow |
| Staging environment | Optional | When you want a test environment |
| Custom domain | Optional | After first deploy |
| Sentry | Optional | When you want error tracking |
| i18n | Optional | Phase 4 or after launch |

---

**Start here: `bun install && dndev dev`. The homepage tells you everything else.**
