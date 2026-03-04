# BLUEPRINT: 0_BRAINSTORM → PRD + HLD + LLD

**Goal:** Deeply understand the app and produce THREE validated specification documents.

**MCP:** `start_phase(0)` to begin. `complete_phase()` when done.
**Done when:** `docs/PRD.md`, `docs/HLD.md`, `docs/LLD.md` are COMPLETE and user has validated them.

---

## First: Call list_features()

**Before probing the user or designing anything**, call `list_features()`.

It returns a one-line summary from each framework package README (core, ui, templates, auth, billing, etc.). Use it to avoid designing custom solutions when the framework already provides them (e.g. blog, CRUD, billing pages). If you skip this, you may propose work that already exists in `@donotdev/templates` or other packages.

---

## CRITICAL: Do NOT Rush This Phase

**The #1 cause of wasted work is incomplete requirements.**

Before producing documents, you MUST have:
- [ ] Complete understanding of what users DO (not just what data exists)
- [ ] All user journeys mapped step-by-step
- [ ] Business rules and validations documented
- [ ] Entity relationships and state machines defined
- [ ] Edge cases and error scenarios considered

**If ANY of these are unclear, keep asking questions.**

---

## The Conversation Flow

```
User provides idea
    ↓
Agent calls list_features() → matches needs to existing framework capabilities
    ↓
Agent asks IDENTITY questions (who, what, why, and **Aesthetic Essence**)
    ↓
Agent asks USER JOURNEY questions (what do users DO step by step?)
    ↓
Agent asks DATA questions (what entities, relationships, states?)
    ↓
Agent asks BUSINESS RULES questions (validations, permissions, constraints)
    ↓
Agent asks EDGE CASE questions (what if X fails? what about Y?)
    ↓
Agent fills spec_template.md FORMAT through conversation
    ↓
Agent presents summary for user validation
    ↓
User confirms → Agent SPLITS into PRD.md + HLD.md + LLD.md
    ↓
Agent calls init_implementation({ from_spec: true }) → creates implementation.md
```

---

## Question Categories (In Order)

### 1. IDENTITY (The "What")

Start broad, then narrow down:

- "Describe your app in one paragraph. What problem does it solve?"
- "Who is the primary user? Secondary users?"
- "What's the one thing a user MUST be able to do?"
- "What makes this different from [similar apps]?"
- **Aesthetic Essence:** "Which visual 'vibe' fits the brand? SaaS (Clean/Modern), Luxury (Gold/Serif), or Brutalist (Orange/High-Contrast)?"

**Don't proceed until you can explain the app to someone else.**

---

### 2. USER JOURNEYS (The "How")

**This is the most important section.** Map what users actually DO.

For EACH user type, ask:
- "Walk me through a new user's first session. Step by step."
- "What's the most common task? Walk me through it."
- "What's the most complex task? Walk me through it."
- "What brings users back daily/weekly?"

**Document as numbered steps:**
```
## User Journey: Create a New Order

1. User clicks "New Order" button
2. User selects customer from dropdown (or creates new)
3. User adds products (search, quantity, notes)
4. User sees running total (auto-calculated)
5. User selects payment method
6. User clicks "Submit Order"
7. System validates stock availability
8. System creates order with status "pending"
9. User sees confirmation with order number
10. Customer receives email notification
```

**If you can't write this level of detail, you don't understand the app yet.**

---

### 3. DATA & ENTITIES (The "What Data")

For EACH entity, understand:

**Basic:**
- "What fields does [Entity] have?"
- "What's required vs optional?"
- "What are the valid values for [field]?"

**Relationships:**
- "How does [Entity A] relate to [Entity B]?"
- "Can [Entity] exist without [Related Entity]?"
- "When [Entity] is deleted, what happens to related data?"

**States:**
- "What statuses can [Entity] have?"
- "What triggers status changes?"
- "Can you go back from [status A] to [status B]?"

**Example state machine:**
```
Order States:
  draft → pending → confirmed → shipped → delivered
                  → cancelled (from pending or confirmed only)
                  → refunded (from delivered only)
```

---

### 4. BUSINESS RULES (The "Constraints")

Ask about validations and constraints:

- "What makes a [Entity] valid/invalid?"
- "What are the limits? (max items, max size, date ranges)"
- "What can't happen? What should be prevented?"
- "What triggers notifications/emails?"
- "What calculations happen automatically?"

**Document as rules:**
```
## Business Rules: Orders

- Order total = sum(item.price x item.quantity) + shipping - discount
- Discount cannot exceed 50% of subtotal
- Order cannot be cancelled after shipping
- Stock is reserved when order is confirmed, released if cancelled
- Customer email is sent on: order confirmed, order shipped, order delivered
```

---

### 5. PERMISSIONS (The "Who Can")

For EACH entity AND action:

- "Who can CREATE [Entity]?"
- "Who can VIEW [Entity]? All of them or only their own?"
- "Who can EDIT [Entity]? When?"
- "Who can DELETE [Entity]? Is it soft or hard delete?"

**Document as matrix:**
```
| Entity  | Create | Read      | Update    | Delete    |
|---------|--------|-----------|-----------|-----------|
| Product | admin  | everyone  | admin     | admin     |
| Order   | user   | owner     | owner*    | admin     |
| Review  | user   | everyone  | owner     | owner+admin|

* Order update only when status = draft
```

---

### 6. EDGE CASES (The "What If")

**Don't skip this.** Ask about failure scenarios:

- "What if [external service] is down?"
- "What if user submits invalid data?"
- "What if two users edit the same thing?"
- "What if user loses connection mid-action?"
- "What if [required field] is missing?"
- "What happens to old data when [schema changes]?"

---

### 7. UX INTENT (The "Where + Flow")

- "Where should the shortcut for the North Star action live? (Goal: < 2 clicks)"
- "Which features are 'Delighters' (Marketing/Heroes) vs 'Must-Haves' (CRUD)?"

---

## Producing the Documents

Only after ALL questions are answered, use `spec_template.md` as the FORMAT to organize gathered information, then SPLIT into three documents:

### What Goes Where

**`docs/PRD.md`** (from `prd_template.md`):
- Identity (name, users, value prop, North Star)
- User journeys (numbered steps, success/failure criteria)
- Business rules (validations, calculations, triggers)
- Permissions matrix (who can CRUD what)
- Edge cases and error handling
- Design decision overrides

**`docs/HLD.md`** (from `hld_template.md`):
- Preset selection and rationale
- Auth model (providers, roles, self-registration)
- Billing model (if applicable)
- Aesthetic essence
- Page map (routes, purpose, which journey they serve)
- Entity relationship diagram (text-based overview)
- Feature flags (i18n, PWA, real-time, uploads, etc.)
- Architecture decisions and trade-offs

**`docs/LLD.md`** (from `lld_template.md`):
- Per-entity detailed spec:
  - Field definitions (name, type, required, validation, visibility)
  - State machine (from/to/trigger/who/side-effects)
  - Relationships (type, target, via field, cascade rule)
  - Access matrix (CRUD per role per condition)
- Cross-entity validation rules

---

## Validation: The Completeness Test

Before producing the three documents, verify:

### Can You Answer These?

- [ ] "What does a new user do first?" → Have step-by-step answer
- [ ] "What's the main thing users do daily?" → Have step-by-step answer
- [ ] "What happens when [entity] status changes?" → Know all transitions
- [ ] "What validations exist on [entity]?" → Can list them
- [ ] "Who can [action] on [entity]?" → Know for every combination
- [ ] "What if [failure scenario]?" → Have answer for common failures

### Is Everything Complete?

- [ ] Every user journey has 5+ numbered steps
- [ ] Every entity has fields, states, and state transitions
- [ ] Every entity has CRUD permissions for every role
- [ ] Every business rule is documented explicitly
- [ ] Every page traces back to a user journey
- [ ] No "TBD", "TODO", or empty fields
- [ ] User has said "yes, that's complete"

---

## Presenting for Validation

When ready, present a summary:

```markdown
## Specification Summary

### Identity
**Name:** [App Name]
**Purpose:** [One sentence]
**Users:** [Primary], [Secondary]

### Core User Journey
1. [First step]
2. [Second step]
...

### Entities
| Entity | States | Key Rules |
|--------|--------|-----------|
| [Name] | [States] | [Main validation] |

### Pages (derived from journeys)
- `/` - [Purpose]
- `/[route]` - [Purpose]

### Key Business Rules
1. [Rule 1]
2. [Rule 2]

### Open Questions (if any)
- [Question needing user input]

---
Does this capture your requirements completely?
What's missing or incorrect?
```

---

## Output

User validates → produce three documents in `docs/`:

1. **`docs/PRD.md`** — requirements, journeys, rules, permissions
2. **`docs/HLD.md`** — architecture, preset, auth, pages, features
3. **`docs/LLD.md`** — detailed entity specs, state machines, access matrices

Then generate the implementation tracker:
```
init_implementation({ from_spec: true })
```
This creates `.dndev/implementation.md` with checklist items for all phases.

**Documents validated AND complete? Move to Phase 1: SCAFFOLD.**
**Anything unclear? Keep asking questions.**
