# Setup: Internationalization

**Most is pre-configured.** Drop translation files. Framework auto-discovers languages.

---

## Translation File Locations (CRITICAL)

**Two paths - choose based on when translations are needed:**

1. **Eager (`src/locales/`)**: Always loaded - use for common UI, navigation, app-wide content
2. **Lazy (`src/pages/locales/`)**: Loaded when page loads - use for page-specific content

**✅ RULE OF THUMB:**
- **Eager**: Navigation, buttons, common messages (used everywhere)
- **Lazy**: Page content, feature content, large text blocks (used on specific pages)

**Framework auto-discovers both paths. No configuration needed.**

---

## Standard Use

**CRITICAL: Two Translation Paths - Choose Based on When Translations Are Needed**

### Eager Translations (Always Loaded)
**Path:** `src/locales/<namespace>_<2-char-ISO>.json`

**Use for:**
- Common UI elements (buttons, labels, navigation)
- Critical app-wide translations (app name, common messages)
- Translations needed on every page

**Example:**
```
src/
  locales/
    common_en.json      # ✅ Eager - always available
    common_fr.json
    navigation_en.json  # ✅ Eager - used in header/sidebar
    navigation_fr.json
```

### Lazy Translations (Loaded When Page Loads)
**Path:** `src/pages/locales/<namespace>_<2-char-ISO>.json`

**Use for:**
- Page-specific content (page titles, descriptions, page content)
- Feature-specific translations (dashboard, blog, admin)
- Translations only needed when that page/feature is accessed

**Example:**
```
src/
  pages/
    HomePage.tsx
    locales/
      home_en.json      # ✅ Lazy - loaded when HomePage loads
      home_fr.json
    dashboard/
      DashboardPage.tsx
      locales/
        dashboard_en.json  # ✅ Lazy - loaded when DashboardPage loads
        dashboard_fr.json
```

**✅ DECISION GUIDE:**
- **Eager (`src/locales/`)**: Navigation, common buttons, app-wide messages
- **Lazy (`src/pages/locales/`)**: Page content, feature-specific content, large text blocks

**Usage:**
```tsx
import { useTranslation } from '@donotdev/core';

// Eager namespace (common, navigation, etc.)
const { t } = useTranslation('common');
t('app.title');

// Lazy namespace (page-specific)
const { t } = useTranslation('home');
t('hero.title');
```

**LanguageSelector:** Included in layout presets. Import from `@donotdev/core` if needed elsewhere.

---

## Advanced: Array Translations

### Low-level: translateArray

```tsx
import { translateArray, translateObjectArray, maybeTranslate } from '@donotdev/core';

// Get array of strings (filters missing translations automatically)
const benefits = translateArray(t, 'benefits', 10); // Up to 10 items (benefits.0-9), safe if only 4 exist
const features = translateArray(t, 'features.list', 5); // Nested keys work

// Get array of objects
const cases = translateObjectArray(t, 'cases', 10, ['useCase', 'bestFit']);

// Auto-detect if value is a translation key or literal string
maybeTranslate(t, 'products.earlyBird.name');
```

### High-level: tList (Recommended for Cards)

`tList` wraps `translateArray` and returns a `List` component ready for `Card` content:

```tsx
import { tList } from '@donotdev/ui';

// With default icon (CheckCircle)
<Card content={tList(t, 'features.items', 4)} />

// With custom icon
<Card content={tList(t, 'features.items', 4, Star)} />

// Without icon (for emoji-prefixed labels like "🚀 Kick-off")
<Card content={tList(t, 'features.items', 4, null)} />
```

**JSON structure:**
```json
{
  "features": {
    "items": [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ]
  }
}
```

---

## Advanced: Rich Text (Trans)

For inline styling in translations, use `Trans` instead of `t()`. Use when translations contain HTML-like tags for styling.

```tsx
import { Trans } from '@donotdev/core';

// Translation: "<accent>MVP</accent> in 2 weeks"
<HeroSection title={<Trans ns={NAMESPACE} i18nKey="hero.title" />} />

// Translation: "I need <accent>Clarity</accent>"
<Card title={<Trans ns={NAMESPACE} i18nKey="products.transformation.title" />} />
```

**JSON with tags:**
```json
{
  "hero": {
    "title": "Idea to <accent>MVP</accent> in 2 weeks"
  },
  "products": {
    "transformation": {
      "title": "I need <accent>Clarity</accent>",
      "subtitle": "...for a <accent>critical</accent> application"
    }
  }
}
```

**Supported tags:** `<accent>` `<primary>` `<muted>` `<success>` `<warning>` `<error>` `<bold>` `<code>`

**Note:** `Trans` accepts `ns` prop (string) for namespace. Use `t()` for plain strings, `Trans` for rich text with styling tags.

---

## Advanced: I18N Components

```tsx
import { LanguageSelector, LanguageFAB, FAQSection, TranslatedText, useLanguageSelector } from '@donotdev/core';

<LanguageSelector display="auto" />           // Already in presets
<LanguageFAB />                               // Floating action button
<FAQSection items={faqItems} namespace="faq" />
<TranslatedText keyPath="welcome.message" namespace="home" />
const { languages, currentLanguage } = useLanguageSelector();
```

---

## Advanced: Shared Entity Translations (Monorepos)

**Auto-detected:** The framework automatically scans `../../entities/locales/*_*.json` for shared entity translations. If the path exists, translations are loaded; if not, nothing happens.

**File naming:** `entity-car_en.json`, `entity-car_fr.json`

**Merge behavior:** Base translations from shared package, app can override any key. Deep merge, app wins.

**Example structure:**
```
monorepo/
  entities/
    locales/
      entity-car_en.json    # ✅ Auto-detected - no config needed
      entity-car_fr.json
  apps/
    admin/                  # ✅ Just works - framework auto-detects
    public/                 # ✅ Just works - framework auto-detects
```

**Custom paths:** If your shared translations are in a different location, use `additionalPaths`:

**Vite:**
```ts
// vite.config.ts
export default defineViteConfig({
  appConfig,
  i18n: {
    additionalPaths: ['../../packages/shared/locales']  // Custom path
  }
})
```

**Next.js:**
```ts
// next.config.ts
export default defineNextConfig({
  appConfig,
  i18n: {
    additionalPaths: ['../../packages/shared/locales']  // Custom path
  }
})
```

---

**Drop files, get languages. Framework handles the rest.**
