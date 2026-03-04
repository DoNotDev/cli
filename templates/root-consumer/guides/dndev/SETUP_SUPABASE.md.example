# Setup: Supabase

**From zero to a working Supabase backend. Covers Auth, PostgreSQL, Storage, Edge Functions, and deployment.**

---

## Step 1: Run Coach + Fill .env

```bash
dndev coach
```

This prints a numbered checklist of what to configure. For Supabase, you'll need:
- **Project URL** and **public key** → paste into your app's `.env`
- **service_role key** → paste into `.dndev.secrets` at project root
- **Access token** → paste into `.dndev.secrets` (needed for DB migrations via Management API)

Where to get them:
- URL + public key + service_role key: [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Settings → API**
- Access token: [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens) (account-level, not project-level)

Then run setup to validate and automate:

```bash
dndev setup
```

Setup validates your credentials, generates SQL migrations from entities, and pushes them via the Supabase Management API (HTTPS — no CLI needed).

---

## Step 2: Generate Tables from Entities

The framework generates PostgreSQL migrations from your entity definitions. This runs automatically as part of `dndev setup`, or you can run it separately:

```bash
dndev setup
```

During setup, the wizard detects your entities and generates SQL migrations.

**What it does:**
- Discovers entities (e.g. in `entities/` or your configured entity directory)
- For each entity: `CREATE TABLE` with columns mapped from field types (text, number, boolean, timestamptz, uuid, jsonb, etc.)
- Adds technical columns: `id` (uuid, default `gen_random_uuid()`), `user_id`, `created_at`, `updated_at` (with `DEFAULT now()`), `created_by_id`, `updated_by_id`, `status`
- Enables **Row Level Security (RLS)** and creates policies so rows are scoped by `auth.uid() = user_id`
- Adds a trigger so `updated_at` is set automatically on every `UPDATE`

Output is written to `supabase/migrations/` as a timestamped `.sql` file.

---

## Step 3: Apply Migrations

`dndev setup` pushes migrations automatically via the Supabase Management API. No CLI needed.

If you prefer to apply manually:

**Dashboard SQL Editor** — Copy the generated `.sql` file contents from `supabase/migrations/` into the SQL Editor in the Supabase Dashboard and run it.

---

## Step 4: Enable Supabase Services

Go to the Supabase Dashboard and configure:

**Authentication** (enabled by default on new projects):
- Authentication → Providers → Verify Email is enabled
- Add OAuth providers if needed (Google, GitHub, etc.)

**Storage** (optional — only if your app uploads files):
- Storage → Create bucket (e.g. `uploads`)
- Configure public or RLS policies as needed

---

## Edge Functions

Supabase Edge Functions run on Deno at the edge. If you selected functions during scaffolding, they're in `supabase/functions/`.

### CRUD Functions (one line)

```typescript
// supabase/functions/crud/index.ts
import * as entities from '../_shared/entities.ts';
import { createSupabaseCrudFunctions } from '@donotdev/functions/supabase';

const { serve } = createSupabaseCrudFunctions(entities);
Deno.serve(serve);
```

**Result:** Auto-generates create, get, list, update, delete handlers for each entity. The dispatcher routes via `_functionName` in the request body.

### Custom Functions

```typescript
// supabase/functions/my-function/index.ts
import * as v from 'valibot';
import { createSupabaseHandler } from '@donotdev/functions/supabase';

const schema = v.object({ productId: v.string() });

export default createSupabaseHandler(
  'get_product_details',
  schema,
  async (data, ctx) => {
    const { data: product } = await ctx.supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', data.productId)
      .single();
    return product;
  },
  'user'  // requiredRole (default)
);
```

**Context available in handler:** `ctx.uid` (authenticated user ID), `ctx.userRole`, `ctx.supabaseAdmin` (admin client with full access).

Rate limiting, metrics, auth, schema validation — all included by default.

### Deploy Edge Functions

```bash
supabase functions deploy
```

Or deploy everything with:

```bash
dndev deploy
```

---

## Adapter Behavior (DB-Managed Timestamps)

Tables use **snake_case** column names and **timestamptz** for `created_at` / `updated_at`. The framework expects **camelCase** and **ISO date strings** in the app.

The **Supabase CRUD adapter** handles this automatically:

| Direction | Behavior |
|-----------|----------|
| **Read** (get, query, subscribe) | Rows from Supabase are normalized: snake_case → camelCase (e.g. `created_at` → `createdAt`), and timestamp columns are converted to ISO strings. Your UI receives the same shape as with Firebase. |
| **Write** (add, set, update) | The adapter does **not** send `createdAt` / `updatedAt` (or snake equivalents). The database sets them via `DEFAULT now()` and the `updated_at` trigger. |

You never set timestamps in app code — the DB owns them.

---

## Environment Variables

**Client (Vite):** in `apps/<app>/.env`

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Project URL (public) |
| `VITE_SUPABASE_PUBLIC_KEY` | Public key (safe in bundle) |

**Server (Edge Functions, API routes):** use the same URL and `SUPABASE_SECRET_KEY` for admin operations. Never expose the service_role key to the client. Put it in `.dndev.secrets` at project root (or your host's env for production).

See [ENV_SETUP.md](./ENV_SETUP.md) for the full secrets policy.

---

## Hosting the Frontend

Supabase provides **Auth, PostgreSQL, Storage, and Edge Functions**. It does **not** host your built frontend.

**We recommend Vercel** — see [SETUP_VERCEL.md](./SETUP_VERCEL.md).

```bash
dndev deploy
```

For Supabase projects, `dndev deploy` deploys frontend to Vercel (via scaffolded `vercel.json`) and Edge Functions to Supabase. Make sure you've set `VITE_SUPABASE_*` in Vercel Dashboard → Environment Variables.

---

## Local Development

**Against hosted Supabase:**

```bash
dndev dev
```

The app talks to your Supabase project directly.

**Local emulation:**

```bash
dndev emu start
```

Or install the [Supabase CLI](https://supabase.com/docs/guides/cli) and run `supabase start` for a local Postgres + Auth + Storage stack. Point `VITE_SUPABASE_URL` and keys to the local instance.

---

## Troubleshooting

**"Table not found" / "relation does not exist"**
→ Run `dndev setup` — it generates SQL and pushes via Management API. Or copy the SQL from `supabase/migrations/` into the Dashboard SQL Editor.

**"Permission denied" / RLS errors**
→ Check RLS policies in Supabase Dashboard → Database → Policies
→ Generated migrations include default policies — verify they were applied

**"Service role key" errors in functions**
→ Put `SUPABASE_SECRET_KEY` in `.dndev.secrets` at project root (never in `VITE_*` vars)
→ Get it from Supabase Dashboard → Settings → API

---

**`dndev coach` → fill `.env` + `.dndev.secrets` → `dndev setup` → `dndev dev`. The adapter normalizes everything automatically.**
