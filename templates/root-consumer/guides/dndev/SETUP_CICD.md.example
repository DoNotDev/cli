# Setup: CI/CD

**One command to set up GitHub Actions: secrets, workflows, staging.**

---

## Prerequisites

1. **GitHub CLI** installed and authenticated:
   ```bash
   gh auth login
   ```
2. **Git remote** pointing to your GitHub repository
3. **`.dndev.secrets`** at project root with private tokens:
   ```env
   GH_PAT=ghp_your_personal_access_token
   VERCEL_TOKEN=your_vercel_token        # if using Vercel
   SUPABASE_ACCESS_TOKEN=your_token      # if using Supabase
   ```
4. **Service account key** (Firebase projects):
   - `service-account-key.json` in your app directory
   - `service-account-key.staging.json` for staging (optional)

---

## Quick Start

```bash
dndev setup-cicd
```

The command will:
1. Detect your app and providers (Firebase, Vercel, Supabase)
2. Show a plan of secrets to upload and workflows to generate
3. Upload all secrets to GitHub
4. Write `.github/workflows/ci.yml`, `deploy.yml`, and optionally `deploy-staging.yml`

---

## Options

```bash
dndev setup-cicd --app web       # Target specific app
dndev setup-cicd --dry-run       # Preview without uploading or writing
```

---

## What Gets Created

### Secrets (uploaded to GitHub)

| Secret | Source | When |
|--------|--------|------|
| `GH_PAT` | `.dndev.secrets` | Always (private dndev checkout) |
| `FIREBASE_SERVICE_ACCOUNT` | `service-account-key.json` (base64) | Firebase projects |
| `FIREBASE_SERVICE_ACCOUNT_STAGING` | `service-account-key.staging.json` (base64) | If staging detected |
| `VERCEL_TOKEN` | `.dndev.secrets` | Vercel projects |
| `VERCEL_ORG_ID` | `.env` | Vercel projects |
| `VERCEL_PROJECT_ID` | `.env` | Vercel projects |
| `SUPABASE_ACCESS_TOKEN` | `.dndev.secrets` | Supabase projects |
| `SUPABASE_PROJECT_REF` | Extracted from `VITE_SUPABASE_URL` | Supabase projects |
| `VITE_*` / `NEXT_PUBLIC_*` | `.env` | Public build vars |

### Workflows

| File | Trigger | What it does |
|------|---------|-------------|
| `ci.yml` | Push + PR to main | Checkout, install, typecheck, test |
| `deploy.yml` | Push to main | Build + deploy to detected providers |
| `deploy-staging.yml` | Push to staging/develop | Same as deploy, using staging credentials |

---

## Staging Support

Staging is auto-detected if:
- `.firebaserc` contains a `staging` project alias
- `service-account-key.staging.json` exists

To enable staging manually:

1. Add staging alias to `.firebaserc`:
   ```json
   {
     "projects": {
       "default": "my-app-prod",
       "staging": "my-app-staging"
     }
   }
   ```
2. Download the staging service account key as `service-account-key.staging.json`
3. Re-run `dndev setup-cicd`

---

## Troubleshooting

**"Could not detect GitHub repository"**
→ Ensure `git remote -v` shows a GitHub URL.

**Missing secrets warning**
→ Add the missing values to `.dndev.secrets` or `.env` and re-run.

**"gh: not found"**
→ Install GitHub CLI: https://cli.github.com/

---

## See Also

- [SETUP_FIREBASE.md](./SETUP_FIREBASE.md) — Firebase setup
- [SETUP_VERCEL.md](./SETUP_VERCEL.md) — Vercel setup
- [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) — Supabase setup
- [ENV_SETUP.md](./ENV_SETUP.md) — Environment variables
