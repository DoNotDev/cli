# Configuration Setup

**For AI Agents:** Configure `src/config/app.ts` and `vite.config.ts`. Framework handles the rest.

---

## 1. App Configuration

```typescript
// src/config/app.ts
import type { AppConfig } from '@donotdev/core';

export const appConfig: AppConfig = {
  app: {
    name: 'My App',
    shortName: 'App',              // Required for PWA
    description: 'My app description', // Required for PWA
    url: 'https://myapp.com',
  },

  preset: 'landing', // landing | admin | moolti | docs | blog | game | plain

  features: {
    debug: false, // Enable debug tools
    requiredCookies: ['necessary'], // Cookie consent categories
  },

  auth: {
    authRoute: '/login',
    roleRoute: '/404',
    tierRoute: '/404',
    loginPath: '/login',
    profilePath: '/profile',
  },

  i18n: {
    defaultLanguage: 'en',
    fallbackLanguage: 'en',
  },

  theme: {
    defaultTheme: 'light',
  },
};
```

---

## 2. Vite Configuration

```typescript
// vite.config.ts
import { defineViteConfig } from '@donotdev/core/vite';
import { appConfig } from './src/config/app';

export default defineViteConfig({
  appConfig,  // Required
});
```

**Done.** Routes, themes, and translations are automatically detected from your `src/` directory.

---

## 3. Optional Vite Options

```typescript
export default defineViteConfig({
  appConfig,

  // Debug
  debug: true,
  verbose: true,

  // Debug options
  routes: { debug: true },
  themes: { debug: true },
  i18n: { debug: true },

  // Server
  server: {
    port: 3000,
    https: true,
  },

  // Build
  build: {
    sourcemap: false,
  },

  // SEO
  seo: {
    disabled: false,
    generateRobotsTxt: true,
    generateSitemap: true,
  },

  // PWA (see SETUP_PWA.md for full guide)
  pwa: {
    enabled: false,      // Enable PWA in production
    devEnabled: false,  // Enable PWA in development (optional)
  },
});
```

---

## 4. Environment Variables

**Vite loads `.env` from the app directory only.** Not the repo root.

Run `dndev coach` to see what to configure, then `dndev setup` to validate and automate. See [SETUP_FIREBASE.md](./SETUP_FIREBASE.md).

```bash
# apps/<your-app>/.env — client-side variables (exposed to browser)
VITE_APP_URL=http://localhost:5173
VITE_DONOTDEV_LICENSE_KEY=dndev_your_key_here
VITE_FIREBASE_API_KEY=...          # Written by dndev setup
VITE_FIREBASE_PROJECT_ID=...       # Written by dndev setup
VITE_AUTH_PARTNERS=github,google
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# functions/.env — server-side secrets (never exposed to browser)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Push server secrets to Firebase: `dndev sync-secrets`

---

**Zero config. Override when needed.**
