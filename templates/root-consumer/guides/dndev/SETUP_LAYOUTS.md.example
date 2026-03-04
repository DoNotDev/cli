# Setup: Layouts

**Most is pre-configured.** Choose preset in `config/app.ts`. Framework handles header, sidebar, footer, auth, themes, languages.

---

## Standard Use

**Choose preset:**
```typescript
// config/app.ts
export const appConfig: AppConfig = {
  preset: 'landing', // landing | admin | moolti | docs | blog | game | plain
};
```

**7 presets:** `landing` (marketing), `admin` (dashboards), `moolti` (SaaS), `docs` (documentation), `blog` (content), `game` (mobile), `plain` (minimal).

---

## Preset Capabilities

**The `docs` preset AUTOMATICALLY generates sidebar navigation from your `src/pages` files. You do not need to configure a sidebar manually.**

All presets automatically include these components when applicable:

*   **LanguageSelector** - Automatically shown if more than 1 language is configured
*   **ThemeToggle** - Automatically shown if more than 1 theme is available
*   **AuthMenu** - Automatically shown if auth is configured in `.env` (Firebase keys present)
*   **Navigation Menu** - Automatically generated from `src/pages/*Page.tsx` files for sidebars
*   **GoTo Component** - Command palette (Cmd+K) for quick navigation - always available
*   **Footer** - Automatic footer with copyright and legal links
*   **LegalLinks + Copyright** - Automatically included in footer from `config/legal.ts`

**You don't need to add these manually - the framework handles them based on your configuration.**

---

## Per-Route Layout Switching

**Override the app preset on a per-page basis via `PageMeta.preset`:**

```tsx
// src/pages/DashboardPage.tsx
import type { PageMeta } from '@donotdev/core';

export const meta: PageMeta = {
  preset: 'admin',  // This route uses admin layout (sidebar, compact density)
  auth: true,
};
```

- If `preset` is set → that route uses the specified layout
- If `preset` is absent → the app's `appConfig.preset` is used
- The override is **transient** — navigating away restores the next route's preset or the app default
- No localStorage pollution — route presets are not persisted

**Common pattern (SaaS app):**
| Route | Preset | Purpose |
|-------|--------|---------|
| `/` | (app default: `landing`) | Marketing landing page |
| `/pricing` | (app default: `landing`) | Pricing page |
| `/dashboard` | `admin` | Dashboard with sidebar |
| `/products` | `admin` | CRUD with sidebar |
| `/changelog` | `docs` | Documentation layout |

**Reference implementation:** See `packages/cli/templates/app-demo/` for a working example of per-route switching.

---

## Advanced: Slot Overrides

**Customize zones:**
```tsx
<ViteAppProviders
  config={appConfig}
  layout={{
    header: {
      start: () => <CustomLogo />,    // Override start zone
      center: () => <SearchBar />,     // Override center zone
      end: () => <UserMenu />,         // Override end zone
    },
    sidebar: {
      top: () => <Branding />,         // Override top zone
      content: () => <CustomNav />,    // Override content zone
      bottom: () => <UserProfile />,    // Override bottom zone
    },
    footer: () => <CustomFooter />,    // Replace entire footer
  }}
/>
```

**Hide zones:**
```tsx
layout={{
  header: {
    center: () => null,  // Hide center zone
  },
  footer: () => null,    // Hide footer
}}
```

**Available slots:** `header.start/center/end`, `sidebar.top/content/bottom`, `footer`, `mergedbar` (mobile nav).

---

## Advanced: CSS Variable Overrides

**Override dimensions in `src/themes.css`:**
```css
:root {
  --header-height: 96px;
  --sidebar-width: 320px;
  --main-max-width: 1480px;
  --footer-height: 64px;
  --section-gap: 2rem;
}
```

**Framework auto-computes:** Spacing, typography, responsive breakpoints.

---

## Advanced: Density System

**Global density:**
```tsx
layout={{
  density: 'compact', // compact | standard | expressive
}}
```

**Per-page density:**
```tsx
<PageContainer density="expressive">
  <HeroSection title="Hero" />
</PageContainer>
```

**Three densities:** `compact` (1.2×), `standard` (1.25×), `expressive` (1.333×).

---

## Advanced: Runtime Preset Changes

**Change preset programmatically:**
```tsx
import { useLayout } from '@donotdev/core';

const setLayoutPreset = useLayout('setLayoutPreset');
setLayoutPreset('plain');  // Switch to plain layout
```

**Pre-configured:** All presets handle auth, themes, languages automatically.

---

**Choose preset, get layout. Framework handles the rest.**
