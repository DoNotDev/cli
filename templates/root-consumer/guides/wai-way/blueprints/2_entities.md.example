# BLUEPRINT: 2_ENTITIES

**Goal:** Define all data models from `docs/LLD.md` (Single Source of Truth).

**MCP:** `start_phase(2)` to begin. Use `lookup_symbol('defineEntity')` for types. `complete_phase()` when done.
**Done when:** All entities defined with fields, access rules, visibility. Exported from index.ts.

**Prerequisite:** Phase 0 (PRD + HLD + LLD) and Phase 1 (scaffold) complete.

---

## Step 1: Review LLD Entities

From `docs/LLD.md`, you have the per-entity specs: fields, state machines, relationships, access matrices.

**READ:** `guides/wai-way/entity_patterns.md` for common schemas:
- UserProfile, Post, Product, Order, Review, Comment
- Category, Settings, Workspace, Invitation, Media, ActivityLog

---

## Step 2: Create Entity Files

For each entity in `docs/LLD.md`:

1. Find matching pattern in `entity_patterns.md`
2. Copy pattern → `entities/[Entity].ts`
3. Customize fields from LLD field definitions
4. Set access rules from LLD access matrix

**READ:** `entities/ExampleEntity.ts` for the base pattern.

```typescript
// entities/Product.ts
import { defineEntity } from '@donotdev/core';

export const productEntity = defineEntity({
  name: 'Product',
  collection: 'products',
  fields: {
    // Fields from spec...
  },
  access: {
    // Access rules from spec...
  },
});
```

> **Status field:** Auto-added with locked `type`, `visibility`, `editable`. Don't redefine those. To add custom options:
> ```typescript
> status: { validation: { options: [{ value: 'shipped', label: 'Shipped' }] } }
> // Merged result: [draft, available, deleted, shipped]
> ```

---

## Step 3: Export Entities

```typescript
// entities/index.ts
export { productEntity } from './Product';
export { customerEntity } from './Customer';
export { orderEntity } from './Order';
```

---

## Field Type Quick Reference

| Type | Use for |
|------|---------|
| `text` | Single-line text |
| `textarea` | Multi-line text |
| `richtext` | Rich text editor |
| `number` | Numbers |
| `email` | Email addresses |
| `tel` | Phone numbers |
| `url` | URLs |
| `select` | Dropdown with options |
| `combobox` | Searchable dropdown |
| `multiselect` | Multiple selection |
| `switch` | On/off toggle |
| `date` | Date picker |
| `timestamp` | Date + time |
| `image` | Single image |
| `images` | Multiple images |
| `file` | Single file |
| `files` | Multiple files |
| `address` | Address autocomplete |

---

## Access Levels

| Level | Who |
|-------|-----|
| `guest` | Anyone |
| `user` | Authenticated |
| `owner` | Creator only |
| `admin` | Admins |
| `super` | Super admins |
| `never` | No one |

---

## Output

- [ ] All entities from spec defined in `entities/`
- [ ] Fields match LLD
- [ ] Access rules match LLD
- [ ] Exported from `entities/index.ts`
