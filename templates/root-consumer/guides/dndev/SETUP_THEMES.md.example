# Setup: Themes

**Single source of truth:** `src/themes.css`. Import it from `globals.css`; do not set font/color overrides in globals. Framework handles theme switching.

**Default essence = SaaS** (Inter, neutral). Optional essences (Brutalist, Luxury) are in the scaffold; they do **not** apply until you set the class on `<html>` (e.g. `class="brutalist"`) or use the theme switcher.

**Reference:** Copy Brutalist/Luxury blocks from `guides/dndev/essences_reference.css` into your `src/themes.css` if you need them. Default-essence fonts (Inter, Space Grotesk, Playfair, Roboto) are bundled via `@donotdev/ui`; no Google Fonts, no `public/fonts/` required.

---

## Standard Use

**File:** `src/themes.css` (scaffolded with light, dark, and optional Brutalist/Luxury)

**Override colors:**
```css
:root {
  /* Brand colors */
  --primary: #2563eb;
  --secondary: #9333ea;
  --accent: #ec4899;
  
  /* Base colors */
  --background: #ffffff;
  --foreground: #000000;
}
```

**Add custom theme:**
```css
.ocean {
  --theme-icon: 'Waves';
  --theme-label: 'Ocean';
  --primary: #0ea5e9;
  --background: #001a33;
  --foreground: #e0f2fe;
}
```

**Framework auto-computes:** Surfaces (card, popover), muted colors, borders, text on brand colors.

---

## Advanced: All CSS Variables

**Brand colors:**
```css
--primary, --secondary, --accent
--primary-foreground, --secondary-foreground, --accent-foreground
```

**Base colors:**
```css
--background, --foreground
```

**Status colors:**
```css
--success, --warning, --destructive
--success-foreground, --warning-foreground, --destructive-foreground
```

**Surfaces:**
```css
--card, --card-foreground
--popover, --popover-foreground
--muted, --muted-foreground
--border, --input, --ring
```

**Theme metadata:**
```css
--theme-icon: 'Sun';      /* Lucide icon name */
--theme-label: 'Light';    /* Display name */
--theme-is-dark: 0;        /* 0 = light, 1 = dark */
```

---

## Advanced: Styling Overrides

**Utility classes:**
```tsx
<Card className="dndev-gap-sm" />  // Gap utilities
<div className="dndev-flex dndev-gap-md" />  // Layout utilities
```

**Data attributes:**
```tsx
<HeroSection data-text-align="center" title="Centered" />
<div data-gap="medium" data-radius="md" />
```

**Inline styles:**
```tsx
<Button style={{ minWidth: '200px' }} />
```

**Global CSS rules:**
```css
/* src/themes.css */
.dndev-button {
  border-radius: 8px;  /* Override default */
}
```

**Framework respects your overrides.** All components use CSS variables, so color changes propagate automatically.

---

**Override variables, get themes. Framework handles the rest.**
