# Setup: Authentication

**Most is pre-configured.** Works with Firebase Auth or Supabase Auth. Add env vars and config. Framework handles providers, callbacks, sessions.

---

## Standard Use

**Environment:**
```bash
# .env
VITE_AUTH_PARTNERS=password,emailLink,google,github,facebook
```

**Config:**
```typescript
// src/config/app.ts
export const appConfig: AppConfig = {
  auth: {
    authRoute: '/login',
    loginPath: '/login',     // Optional: undefined = header providers
    profilePath: '/profile',
  },
};
```

**Firebase:** Enable providers in Firebase Console → Authentication → Sign-in method
**Supabase:** Enable providers in Supabase Dashboard → Authentication → Providers

### Redirect URLs (Supabase only)

After OAuth (Google, GitHub, etc.), Supabase redirects the user back to your app. You must tell Supabase which URLs are allowed.

**Supabase Dashboard → Authentication → URL Configuration:**

| Setting | Value |
|---------|-------|
| **Site URL** | Your **production** URL (e.g., `https://myapp.vercel.app`) |
| **Redirect URLs** | All URLs where auth should work (see below) |

**Add to Redirect URLs:**
- `http://localhost:5173` — local Vite dev
- `http://localhost:3000` — local Next.js dev
- `https://myapp.vercel.app` — production
- `https://*-yourteam.vercel.app` — Vercel preview deploys

> **Site URL must be production.** It's the fallback when no redirect URL matches. If it's `localhost:3000`, your deployed app redirects to localhost after OAuth.

---

## Advanced: Protected Routes

```tsx
// Basic protection
export const meta: PageMeta = {
  namespace: NAMESPACE,
  auth: { required: true },
};

// Role-based access
export const meta: PageMeta = {
  namespace: NAMESPACE,
  auth: { required: true, role: 'admin' },
};

// Tier-based access
export const meta: PageMeta = {
  namespace: NAMESPACE,
  auth: { required: true, tier: 'pro' },
};
```

---

## Advanced: Components & Hooks

```tsx
import { useAuth } from '@donotdev/auth';
import { MultipleAuthProviders, AuthPartnerButton } from '@donotdev/auth';
import { AuthHeader, AuthMenu } from '@donotdev/ui';
import { LoginTemplate } from '@donotdev/templates';

// Hook
const user = useAuth('user');
const signIn = useAuth('signInWithEmail');
const signOut = useAuth('signOut');

// Components
<MultipleAuthProviders layout="vertical" emailMode="signin" />
<AuthPartnerButton partnerId="google" method="popup" />
```

**Pre-configured:** `AuthHeader` in layout (null if auth disabled), OAuth callbacks, session management, account linking.

---

## User Roles

**Role hierarchy:** `guest (0) < user (1) < admin (2) < super (3)`

**Default:** All authenticated users are `'user'` role.

**Setting admin/super roles:**

**Firebase** — Set customClaims:
```typescript
import { getFirebaseAdminAuth } from '@donotdev/firebase/server';

const auth = getFirebaseAdminAuth();
await auth.setCustomUserClaims(userId, {
  role: 'admin',  // or 'super'
  isAdmin: true   // legacy support
});
```

**Supabase** — Set user metadata:
```sql
-- In Supabase Dashboard → SQL Editor
UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}' WHERE id = '<user-id>';
```

**Using CLI:**
```bash
dndev make-admin <userId>
```

**Note:** User must sign out and sign in again for role changes to take effect.

**Used by:** CRUD access control, protected routes, field visibility filtering.

---

**Add env vars, get auth. Framework handles the rest.**
