# Framework Gotchas

**Common mistakes. Read before coding. Phase tags show when each matters most.**

---

## Imports [Phase 1, 2, 3]

**Server code MUST use `/server` imports — client imports crash on deploy.**

```typescript
// ✅ CORRECT
import { getFirebaseAdminFirestore } from '@donotdev/firebase/server';
import { handleError } from '@donotdev/core/server';

// ❌ WRONG - crashes on deploy
import { getFirestore } from '@donotdev/firebase';
import { handleError } from '@donotdev/core';
```

**Rule:** Always use `/server` suffix for `@donotdev/core/server`, `@donotdev/firebase/server`, `@donotdev/security/server`.

**ESM only — never use `require()`.**

```typescript
// ❌ WRONG
const { something } = require('@donotdev/package');

// ✅ CORRECT
import { something } from '@donotdev/package';
```

**Import ordering is mandatory:**
1. React (values, then types)
2. Other vendors (values, then types)
3. `@donotdev/*` packages (values, then types)
4. Relative imports (values, then types)

One line for values, one line for types. Blank line between categories.

---

## Routing [Phase 1, 3]

**Never import from `react-router-dom` — use framework routing.**

```tsx
// ❌ WRONG - breaks framework features
import { Link, useNavigate, useParams } from 'react-router-dom';

// ✅ CORRECT
import { Link, useNavigate, useParams } from '@donotdev/ui';
```

**Routes are auto-discovered** from `src/pages/*Page.tsx` with `pageMeta`. Don't use `<Routes>`, `<Route>`, or manual `<Outlet />`.

**Use `useRouteParam('id')` for typed route params** — not `useParams()` from react-router-dom.

**Navigation is auto-built.** Use `<DnDevNavigationMenu>` or `useNavigationItems()`. Don't build nav manually — you lose auth filtering and route discovery.

---

## Styling [Phase 3, 4]

**No inline `fontSize` or `font-size` — use `Text` level prop.**

```tsx
// ❌ WRONG
<Text style={{ fontSize: '18px' }}>Title</Text>

// ✅ CORRECT
<Text level="h2">Title</Text>
```

Levels: `h1`, `h2`, `h3`, `h4`, `body`, `small`, `caption`. Limit to 2–3 levels per page.

**RTL: Always use `start`/`end` — never `left`/`right`.**

```css
/* ❌ WRONG - breaks RTL */
text-align: left;

/* ✅ CORRECT - works in both LTR and RTL */
text-align: start;
```

Same for inline styles: `textAlign: 'start'` not `textAlign: 'left'`. Same for data attributes: `data-text-align="start|center|end"`.

---

## Components [Phase 3]

**Always `lookup_symbol` before using any `@donotdev` component.** Never guess props.

Common wrong props:
- `Button`: no `size`, `tone`, `gap` — use `variant`, `display`
- `Text`: no `size`, `tone`, `color` — use `level`, `variant`
- `Stack`: no `spacing`, `size` — use `gap`
- `Card`: no `padding`, `margin`, `size` — use `title`, `subtitle`, `content`, `footer`
- `Grid`: no `columns` — use `cols`

**If you can't do it with framework components:** Stop. Tell the user what's missing. Don't invent custom workarounds.

---

## CRUD [Phase 2, 3]

**Hidden fields are auto-added by `defineEntity()` — don't define them manually:**
- `id`, `createdAt`, `updatedAt`, `createdById`, `updatedById`

**Status field — extend, don't redefine.**
The `status` field is auto-added with locked `visibility: 'admin'`, `editable: 'admin'`, `type: 'select'`. Only `validation.options` can be extended.

```typescript
// ❌ WRONG - these properties are silently ignored
status: { type: 'select', visibility: 'owner', editable: 'admin', validation: { options: [...] } }

// ✅ CORRECT - only extend options (merged after defaults: draft, available, deleted)
status: { validation: { options: [{ value: 'shipped', label: 'Shipped' }] } }
```

**Scope field is auto-added** when `scope` is configured. Don't manually define the scope field (e.g., `companyId`).

**Custom form fields MUST use framework's `useController`:**

```typescript
// ❌ WRONG
import { useController } from 'react-hook-form';

// ✅ CORRECT
import { useController } from '@donotdev/crud';
```

**Form components receive `control` prop, not `field` prop.**

**Price field is structured:** `{ amount, currency, vatIncluded, discountPercent }`. Don't store computed discount amounts.

**File uploads are deferred** — files upload on form submit, not on selection. Images show optimistic blob URLs.

**Entity namespace defaults to `entity-{name}`** (lowercase). Translation files must match: `locales/entity-product_en.json`.

---

## Functions [Phase 3, 4]

**Use `createFunction` for custom functions — 3 params, everything included:**

```typescript
import { createFunction } from '@donotdev/functions/firebase';

export const myFunction = createFunction(schema, 'operation_name', async (data, { uid }) => {
  // Your logic
});
```

**Use `createBaseFunction` only when you need custom config** (memory, timeout, region override).

**Deploy with `dndev deploy`** — not `firebase deploy`. Manual deploy causes CORS 403 on preflight because Cloud Run blocks unauthenticated OPTIONS by default.

**Naming:** Export in camelCase (`getDashboardMetrics`), operation ID in snake_case (`get_dashboard_metrics`).

**CRUD functions are one-liner:** `export const crud = createCrudFunctions(entities);` — generates all CRUD endpoints per entity. Access controlled via `entity.access`.

---

## i18n [Phase 3, 4]

**Phase 3: hardcode strings. Phase 4: add translations.** Don't i18n too early.

**Two loading strategies:**
- **Eager** (always loaded): `src/locales/common_en.json` — navigation, buttons, common UI
- **Lazy** (loaded per page): `src/pages/locales/home_en.json` — page-specific content

**Status field translations** fall back: `entity-{name}` namespace → `crud` namespace.

**Rich text uses `<Trans>` component** with supported tags only: `<accent>`, `<primary>`, `<muted>`, `<success>`, `<warning>`, `<error>`, `<bold>`, `<code>`.

**Array translations use `tList`:**
```tsx
import { tList } from '@donotdev/ui';
<Card content={tList(t, 'features.items', 4)} />
```

---

## Dependencies [Phase 1]

**Apps don't declare bundled deps.** Framework packages (`@donotdev/*`) provide everything. Don't add `react-router-dom`, `react-hook-form`, `valibot`, etc. to app's `package.json` — they come through framework deps.

**Environment variables:**
- Client: `apps/my-app/.env` (prefix with `VITE_*`)
- Server: `functions/.env` (secrets: `STRIPE_*`, OAuth tokens)
- Local overrides: `.env.local` (gitignored)

---

**When in doubt: search the codebase first, ask the user second, never guess.**
