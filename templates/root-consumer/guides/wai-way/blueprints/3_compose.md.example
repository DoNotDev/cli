# BLUEPRINT: 3_COMPOSE

**Goal:** Build pages with components. HARDCODE ALL STRINGS.

**MCP:** `start_phase(3)` to begin. Use `lookup_symbol(component_name)` for types. `complete_phase()` when done.
**Done when:** All pages functional with content. CRUD pages use EntityList/EntityFormRenderer. All strings hardcoded.

**Prerequisite:** Phase 0-2 complete. PRD + HLD + LLD validated, entities defined.

---

## Step 1: Apply UX Intent Rules

**Every page must follow the Designer Mandate:**
1. **70/30 Hierarchy:** Only ONE `primary` variant button/card per view. Use `outline` or `muted` for everything else to direct the user's eye to the North Star.
2. **Benefit-First Copy:** Do not use technical titles for Heros/Cards. 
   - ❌ "User Management" → ✅ "Empower Your Team"
   - ❌ "Car List" → ✅ "Explore the Fleet"
3. **Success Intent:** Ensure framework default toasts are working. Only add a custom celebratory view or Redirect for the **North Star** goal completion.

---

## Reference: Demo App

**Before composing pages, study the demo app:** `packages/cli/templates/app-demo/src/pages/`

It shows the canonical pattern:
- Thin page wrappers (~5 lines) that import templates
- `PageMeta.preset` for per-route layout switching (landing → admin → docs)
- CRUD with `ProductCardListTemplate` + `defineEntity()`
- Component showcase with filterable grid

**Copy from the demo app, customize for your spec.**

---

## Step 2: Read Page Patterns

**READ:** `guides/wai-way/page_patterns.md` for all patterns:
- Dashboard, List Page, Form Page
- Landing/Home, Pricing, Settings
- Profile, Detail Page, Analytics

---

## Step 3: CRUD Pages

For each entity in spec:

### List Page

**READ:** `src/pages/ListPageExample.tsx`

```tsx
import { EntityList } from '@donotdev/crud';
import { useAuth } from '@donotdev/auth';
import { PageContainer } from '@donotdev/ui';
import { productEntity } from 'entities';

export default function ProductsListPage() {
  const user = useAuth('user');
  return (
    <PageContainer>
      <EntityList entity={productEntity} userRole={user?.role} />
    </PageContainer>
  );
}
```

### Form Page

**READ:** `src/pages/FormPageExample.tsx`

```tsx
import { EntityFormRenderer, useCrud } from '@donotdev/crud';
import { productEntity } from 'entities';

export default function ProductPage() {
  const { id } = useParams();
  const { get, add, update } = useCrud(productEntity);
  const isNew = id === 'new';
  // ... see page_patterns.md for full pattern
}
```

---

## Step 4: Dashboard Page

Copy Dashboard pattern from `page_patterns.md`:
- Quick actions (cards with onClick)
- KPI cards in grid
- Alert/attention sections

---

## Step 5: Landing Pages

Copy Landing pattern from `page_patterns.md`:
- HeroSection with CTAs
- Feature grid with Cards
- Final CTA section

---

## Component Quick Reference

| Component | Use for |
|-----------|---------|
| `PageContainer` | Page wrapper (required) |
| `HeroSection` | Full-width hero banner |
| `Section` | Content block with title |
| `Card` | Content card |
| `Grid` | Responsive grid ([1,2,3,3] = mobile 1, tablet 2, desktop 3) |
| `Stack` | Flex container |
| `Button` | Buttons |
| `Text` | Typography |
| `Badge` | Status badges |
| `Alert` | Notifications |
| `Loader` | Loading spinner |

---

## CRITICAL: HARDCODE FIRST

```tsx
// ✅ GOOD - Start with hardcoded strings
<HeroSection
  title="Welcome to My App"
  subtitle="The best app ever"
/>

// ❌ BAD - Don't start with i18n
<HeroSection
  title={t('hero.title')}
  subtitle={t('hero.subtitle')}
/>
```

Validate UX in one language. Add i18n in Phase 4 (CONFIGURE) after validation.

---

## Output

- [ ] All CRUD pages use EntityList/EntityFormRenderer
- [ ] Dashboard uses pattern from page_patterns.md
- [ ] Landing pages use framework components
- [ ] All strings are HARDCODED (not i18n)
- [ ] App is fully functional
