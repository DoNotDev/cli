# Low-Level Design (LLD)

> **Version:** V1
> **Status:** Draft | Validated
> **Last Updated:** [date]
>
> This document is the HOW (detailed) — per-entity field specs, state machines, validation rules, access matrices.
> Produced by Phase 0 (BRAINSTORM) from `spec_template.md` conversation.
> This is the Builder's blueprint — Phase 2 (ENTITIES) consumes this directly.

---

## Entity: [Name]

### Fields

| Field | Type | Required | Validation | Visibility |
|-------|------|----------|------------|------------|
| id | string | yes | auto-generated | guest |
| | | | | |
| createdAt | timestamp | yes | auto | admin |
| updatedAt | timestamp | yes | auto | admin |

### State Machine

**States:** `[state1]` → `[state2]` → `[state3]`

| From | To | Trigger | Who Can | Side Effects |
|------|----|---------|---------|-------------|
| state1 | state2 | [action] | [role] | [what happens] |
| state2 | state3 | [action] | [role] | [what happens] |
| state2 | cancelled | [action] | [role] | [what happens] |

### Relationships

| Type | Target Entity | Via Field | Cascade Rule |
|------|---------------|-----------|-------------|
| belongs-to | [Entity] | [fieldName] | [on delete: cascade/nullify/restrict] |
| has-many | [Entity] | [foreignKey] | [on delete: cascade/orphan] |

### Access Matrix

| Action | guest | user | owner | admin | Conditions |
|--------|-------|------|-------|-------|------------|
| Create | | | | | |
| Read | | | | | |
| Update | | | | | |
| Delete | | | | | |

---

## Entity: [Name]

### Fields

| Field | Type | Required | Validation | Visibility |
|-------|------|----------|------------|------------|
| | | | | |

### State Machine

_(if applicable)_

### Relationships

| Type | Target Entity | Via Field | Cascade Rule |
|------|---------------|-----------|-------------|
| | | | |

### Access Matrix

| Action | guest | user | owner | admin | Conditions |
|--------|-------|------|-------|-------|------------|
| Create | | | | | |
| Read | | | | | |
| Update | | | | | |
| Delete | | | | | |

---

_(Copy entity block for each entity)_

---

## Cross-Entity Validation Rules

> Rules that span multiple entities.

| Rule | Entities Involved | Logic |
|------|-------------------|-------|
| | | |

---

## Validation Checklist

- [ ] Every entity has complete field definitions (type, required, validation)
- [ ] Every entity with states has a full state machine (from/to/trigger/who/side-effects)
- [ ] Every entity has relationships defined with cascade rules
- [ ] Every entity has CRUD access matrix for every role
- [ ] Cross-entity validation rules documented
- [ ] No "TBD", "TODO", or empty fields
- [ ] User has reviewed and confirmed this document
