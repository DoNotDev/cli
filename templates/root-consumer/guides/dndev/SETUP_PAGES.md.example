# Setup: Pages & Routing

**Most is pre-configured.** Drop `*Page.tsx` files. Routes auto-discovered, navigation auto-generated, sitemap auto-built.

---

## File Routing Rule

**CRITICAL: Only files ending in `Page.tsx` inside `src/pages` become routes.**

Files must be named `*Page.tsx` (e.g., `HomePage.tsx`, `AboutPage.tsx`, `BlogPostPage.tsx`). Files without the `Page.tsx` suffix are ignored by the routing system.

---

## Standard Use

**Pattern:** `src/pages/**/*Page.tsx` → routes

**Basic page structure:**
```tsx
// src/pages/AboutPage.tsx
import { PageContainer } from '@donotdev/ui';

export const NAMESPACE = 'about';

export const meta: PageMeta = {
  namespace: NAMESPACE,
};

export default function AboutPage() {
  return <PageContainer><h1>About</h1></PageContainer>;
}
```

**Cookie-cutter pattern (Landing page):**
```tsx
import { PageContainer } from '@donotdev/ui';
import { HeroSection, Section, Card, CallToAction } from '@donotdev/components';

export default function HomePage() {
  return (
    <PageContainer>
      <HeroSection title="Welcome" subtitle="Build fast" variant="primary" />
      <Section title="Features" gridCols={3}>
        <Card title="Fast" />
        <Card title="Simple" />
        <Card title="Powerful" />
      </Section>
      <CallToAction title="Get Started" primaryAction={<Button>Sign Up</Button>} />
    </PageContainer>
  );
}
```

**Drop files, get routes. No config needed.**

**Component reference:** See [COMPONENTS_ATOMIC.md](./COMPONENTS_ATOMIC.md) for atomic components, [COMPONENTS_UI.md](./COMPONENTS_UI.md) for layout components.

---

## Advanced: All PageMeta Props

```tsx
export const meta: PageMeta = {
  // Translation/SEO namespace
  namespace: NAMESPACE,

  // Route configuration
  route: '/custom-url',                    // Override auto-generated path
  route: { params: ['slug'] },            // Dynamic: /blog/:slug

  // Page title (optional - auto-extracted from filename)
  title: 'Custom Title',

  // Navigation icon (lucide-react JSX only)
  icon: <Rocket />,                        // Menu icon (default: Link)

  // Hide from navigation menu
  hideFromMenu: false,                     // Default: false (shows in nav)

  // Layout preset override (per-route)
  preset: 'admin',                         // Override app default for this route

  // Authentication
  auth: true,                              // Simple: auth required
  auth: { required: true },                // Explicit: auth required
  auth: { required: true, role: 'admin' }, // Role-based access
  auth: { required: true, tier: 'pro' },   // Tier-based access
  auth: {
    required: true,
    validate: (role, tier) => role === 'admin' && tier === 'pro'
  },                                       // Custom validation
};
```

**Reference implementation:** The demo app (`packages/cli/templates/app-demo/`) shows all these patterns working together — landing, admin, docs presets, auth, showcase, CRUD, legal pages.

---

## Advanced: Dynamic Routes & Navigation

```tsx
// Dynamic route
export const meta: PageMeta = {
  namespace: 'blog',
  route: { params: ['slug'] },  // → /blog/:slug
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  return <PageContainer><h1>{slug}</h1></PageContainer>;
}

// Manual navigation
import { useNavigate, Link } from '@donotdev/ui';
const navigate = useNavigate();
navigate('/about');
<Link path="/about">About</Link>

// Card with navigation (supports middle-click)
import { Card } from '@donotdev/components';
import { Link } from '@donotdev/ui';

<Link
  path="/about"
  style={{ display: 'block', textDecoration: 'none', height: '100%' }}
  aria-label="Learn more about About"
>
  <Card title="About" subtitle="Learn more" />
</Link>
```

**Navigation patterns:**
- **Link component:** Use for text links, buttons, or wrapping other components
- **Card navigation:** Wrap Card in Link for clickable cards with middle-click support
- **onClick only:** Use `onClick={() => navigate()}` for actions that don't need middle-click

**Pre-configured:** Navigation menu auto-generated, sitemap auto-built (if `generateSitemap: true`).

---

---

## Import Convention

**Always import from `@donotdev/<package>` top-level.** Never use sub-paths.

```tsx
import { PageContainer, Link, useNavigate } from '@donotdev/ui';
import { Card, Button, Input } from '@donotdev/components';
import { useCrud } from '@donotdev/crud';
```

**Sub-path exceptions** (server, config, and provider-specific):
- **Server:** `@donotdev/core/server`, `@donotdev/firebase/server`, `@donotdev/security/server`
- **Config:** `@donotdev/core/vite`, `@donotdev/core/next`, `@donotdev/core/functions`
- **Functions:** `@donotdev/functions/firebase`, `@donotdev/functions/vercel`, `@donotdev/functions/supabase`

---

## SaaS App Pattern

For SaaS apps, the standard page structure is:

```
src/pages/
  HomePage.tsx        → /           → No auth. Login form OR landing page.
                                      Redirects to /dashboard when authenticated.
  DashboardPage.tsx   → /dashboard  → auth: true. Main landing for logged-in users.
  SettingsPage.tsx    → /settings   → auth: true.
  ...
```

**HomePage is never auth-guarded.** It's the entry point for unauthenticated users. Do NOT create a separate `LoginPage` — HomePage IS the login.

```tsx
// src/pages/HomePage.tsx — SaaS pattern
import { useAuthSafe, useNavigate, PageContainer } from '@donotdev/ui';
import { LoginForm } from '@donotdev/templates';

export const meta: PageMeta = {
  namespace: 'home',
  // No auth — this is the public entry point
};

export default function HomePage() {
  const user = useAuthSafe('user');
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  if (user) { navigate('/dashboard'); return null; }

  return (
    <PageContainer>
      <LoginForm onSuccess={() => navigate('/dashboard')} />
    </PageContainer>
  );
}
```

> **Why `useAuthSafe` instead of `useAuth`?** HomePage is public — it renders before auth is guaranteed to be initialized. `useAuthSafe` (from `@donotdev/ui`) gracefully degrades if `@donotdev/auth` isn't installed or still initializing. `useAuth` (from `@donotdev/auth`) throws if auth isn't available. Use `useAuthSafe` on any page without `auth: true` in its meta.

---

**Drop files, get routes. Framework handles the rest.**
