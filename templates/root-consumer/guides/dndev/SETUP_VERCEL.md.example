# Setup: Vercel (Hosting & Functions)

**Deploy your frontend (and optionally serverless functions) to Vercel. Works with any backend (Firebase, Supabase, or both).**

---

## Architecture

Vercel serves your built Vite or Next.js app on a global CDN. It can also run **Vercel Functions** (serverless API routes).

**Vercel as hosting only** (backend elsewhere):
- **Firebase** → Cloud Functions + Firestore + Auth + Storage
- **Supabase** → Edge Functions + PostgreSQL + Auth + Storage

**Vercel as hosting + functions** (alongside a backend):
- Vercel Functions handle API routes (`/api/*`)
- Combine with Firebase/Supabase for auth + database

The framework scaffolds `vercel.json` with CSP headers, rewrites, and caching rules.

---

## Step 1: Create Vercel Project

1. Create a [Vercel](https://vercel.com) account
2. Import your Git repo from the Vercel Dashboard
3. Set the **Root Directory** to `apps/<your-app>` (or leave blank if monorepo auto-detected)
4. Set **Framework Preset** to Vite (or Next.js if using Next)

---

## Step 2: Add Credentials

**Secret (shared across apps):** add to `.dndev.secrets` at project root:

```env
VERCEL_TOKEN=your_vercel_token
```

**Per-app (public):** add to `apps/<your-app>/.env`:

```env
VERCEL_ORG_ID=your_team_id
VERCEL_PROJECT_ID=your_project_id
```

**Where to find them:**

| Variable | Where | File |
|----------|-------|------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) — scope to your team | `.dndev.secrets` |
| `VERCEL_ORG_ID` | Vercel Dashboard → Settings → General → **Team ID** | `apps/<app>/.env` |
| `VERCEL_PROJECT_ID` | Vercel Dashboard → Your Project → Settings → General → **Project ID** | `apps/<app>/.env` |

That's it. No `vercel login`, no `vercel link`, no interactive prompts.

---

## Step 3: Set App Environment Variables

In **Vercel Dashboard → Project → Settings → Environment Variables**, add your app's env vars:

**If using Firebase:**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

**If using Supabase:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLIC_KEY`

**Common (all backends):**
- `VITE_DONOTDEV_LICENSE_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY` (if using billing)

**Server-side (Vercel Functions only):**
- `STRIPE_SECRET_KEY` (if using billing)
- `SUPABASE_SERVICE_ROLE_KEY` (if using Supabase)

For Next.js apps, replace the `VITE_` prefix with `NEXT_PUBLIC_` (same var names, different prefix).

---

## Step 4: Deploy

```bash
dndev deploy
```

That's it. The CLI reads your credentials from `.env.local` and deploys to production.

**Option B — Git push (auto-deploy)**

If your repo is connected to Vercel, pushing to your branch auto-deploys:

```bash
git push origin main
```

---

## Vercel Functions (Optional)

The framework provides helpers for Vercel Functions via `@donotdev/functions/vercel`. Place your API routes in `pages/api/` (Next.js) or `api/` (Vite).

### Custom Functions

```typescript
// pages/api/product-details.ts
import * as v from 'valibot';
import { createVercelBaseFunction } from '@donotdev/functions/vercel';

const schema = v.object({ productId: v.string() });

export default createVercelBaseFunction(
  'POST',
  schema,
  'get_product_details',
  async (req, res, data, { uid }) => {
    // data is validated, uid is the authenticated user
    const product = await getProduct(data.productId);
    return res.status(200).json(product);
  }
);
```

Auth, rate limiting, schema validation, and metrics — all included by default.

### Pre-built Endpoints

The framework ships ready-made API handlers:

```typescript
// pages/api/auth/claims.ts
import { setCustomClaims } from '@donotdev/functions/vercel';
export default setCustomClaims;

// pages/api/billing/checkout.ts
import { createCheckoutSession } from '@donotdev/functions/vercel';
import { billingConfig } from '../../../config/billing';
export default createCheckoutSession(billingConfig);
```

Available: auth (claims, status, delete account), billing (checkout, cancel, portal, change plan), OAuth (token exchange, access grants).

### When to use Vercel Functions vs Firebase/Supabase functions

- **Vercel Functions:** API routes, webhooks, third-party proxies — especially in Next.js apps
- **Firebase Cloud Functions:** Firestore triggers, heavy backend logic tied to Firebase
- **Supabase Edge Functions:** Database triggers, logic tied to Supabase

**Server secrets** for Vercel Functions go in Vercel Dashboard → Environment Variables (not `VITE_*` or `NEXT_PUBLIC_*` prefixed — those are exposed to the browser).

---

## Environment Variables

| File | What Goes Here | Loaded By |
|------|---------------|-----------|
| `.dndev.secrets` | `VERCEL_TOKEN` (gitignored) | `dndev deploy` |
| `apps/<app>/.env` | Public keys + `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | Vite/Next.js + `dndev deploy` |
| `apps/<app>/.env.production` | Production overrides | Vite/Next.js (build --mode production) |
| Vercel Dashboard | All production env vars (client + server) | Vercel runtime |

**Client vars** (browser-safe): `VITE_*` or `NEXT_PUBLIC_*` prefix.

---

## Local Development

```bash
dndev dev
```

The app runs locally, talking to your backend (Firebase or Supabase) directly.

For local function emulation:

```bash
dndev emu start
```

---

## Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records as instructed by Vercel
4. If using Firebase Auth: update your `FIREBASE_AUTH_DOMAIN` env var to your custom domain

---

## Troubleshooting

**"Missing Vercel credentials"**
→ Check `VERCEL_TOKEN` is in `.dndev.secrets` at project root
→ Check `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are in `apps/<app>/.env`
→ Run `dndev setup` to validate

**"Build fails on Vercel"**
→ Check Root Directory is set to your app directory
→ Ensure `package.json` has correct `build` script
→ Check all `VITE_*` env vars are set in Vercel Dashboard

**"CORS error"**
→ Vercel handles CORS for same-origin requests automatically
→ For cross-origin: CSP headers in `vercel.json` are pre-configured for your backend

**".env values not loading"**
→ Vercel only reads env vars from its Dashboard, not from `.env` files
→ Make sure all required vars are set in Vercel Dashboard → Environment Variables

---

**Token in `.dndev.secrets` + IDs in `.env` → `dndev deploy` → done.**
