# BLUEPRINT: 1_SCAFFOLD + SITEMAP

**Goal:** Running app with all routes defined.

**MCP:** `start_phase(1)` to begin. `complete_phase()` when done.
**Done when:** All routes listed, all *Page.tsx files created with correct PageMeta.

**Prerequisite:** Phase 0 complete — `docs/PRD.md`, `docs/HLD.md`, `docs/LLD.md` validated.

---

## Step 1: Create App

**`dndev` is an installed CLI — run directly, never via `bunx` or `npx`.**

```bash
# Interactive wizard — prompts for builder, backend, features (no --preset flag)
dndev create-app

# Start emulators (if Firebase backend was selected)
dndev emu start

# Start the dev server
dndev dev
```

---

## Step 2: Apply Aesthetic Essence

**READ:** `guides/dndev/essences_reference.css`

Apply the chosen essence (SaaS, Luxury, Brutalist) to your `src/themes.css`. 
- If **SaaS**: Keep defaults.
- If **Luxury/Brutalist**: Copy the variables from the reference file into `src/themes.css`.
- If **Custom**: Adjust primary/secondary colors in `:root`.

---

## Reference: Demo App

**Before creating pages, study the demo app:** `packages/cli/templates/app-demo/src/pages/`

It shows the canonical pattern:
- Thin page wrappers (~5 lines) that import templates
- `PageMeta.preset` for per-route layout switching (landing → admin → docs)
- Component showcase with filterable grid
- Entity definition with `defineEntity()`

**Copy from the demo app, customize for your spec.**

---

## Step 3: Review Pages from HLD

From `docs/HLD.md` section 5 (Page Map), you have the list of pages. Now create them.

**READ:** `docs/HLD.md` for the page map and `docs/PRD.md` for the user journeys they serve.
**READ:** `guides/wai-way/page_patterns.md` for page structure patterns.

---

## Step 4: Create Page Files

For each page in HLD page map:

```bash
touch src/pages/AboutPage.tsx
touch src/pages/DashboardPage.tsx
touch src/pages/ProductsListPage.tsx
touch src/pages/ProductPage.tsx
```

---

## Step 4: Create Interactive Prototype Stubs

**READ:** `src/pages/HomePage.tsx` for PageMeta pattern.

For **each page**, create a functional stub that allows the user to validate the flow.

```tsx
import type { PageMeta } from '@donotdev/core';
import { PageContainer, Link } from '@donotdev/ui';
import { Section, Stack, Text, Card, Button } from '@donotdev/components';
import { Info } from 'lucide-react';

export const NAMESPACE = 'about';

export const meta: PageMeta = {
  namespace: NAMESPACE,
  icon: <Info />,
  // From spec: Set auth: false for the prototype phase so user can click through
  auth: false, 
};

export default function AboutPage() {
  return (
    <PageContainer>
      <Section title="About Page (Prototype Stub)">
        <Stack gap="large">
          <Text><strong>Role:</strong> [Describe the purpose of this page from the spec]</Text>
          
          <Text level="h3">Navigate Flow:</Text>
          <Stack direction="row" gap="medium">
            <Link path="/dashboard">
              <Button variant="outline">Go to Dashboard</Button>
            </Link>
            <Link path="/contact">
              <Button variant="outline">Go to Contact</Button>
            </Link>
          </Stack>

          {/* Placeholder for flow validation */}
          <Card variant="outline" content={[`[Placeholder for ${NAMESPACE} core components]`]} />
        </Stack>
      </Section>
    </PageContainer>
  );
}
```

**Goal:** The user should be able to `bun dev` and click through the entire app flow (the "North Star" path) to validate the architecture before you build any logic.

---

## Output

- [ ] App runs with `bun dev`
- [ ] All route files created as **Interactive Stubs**
- [ ] PageMeta set (auth: false for prototype validation)
- [ ] Navigation links included on each stub to related pages
- [ ] User has "clicked through" the flow and validated sitemap/friction
