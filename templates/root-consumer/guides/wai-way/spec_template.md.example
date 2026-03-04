# App Specification

> **This is the contract.** Complete spec = deterministic build. Incomplete spec = wasted work.
> **Do NOT start coding until this document is complete and validated.**

---

## 1. Identity

| Field | Value |
|-------|-------|
| **App Name** | |
| **One-Line Description** | |
| **Primary User** | _(Who uses this daily?)_ |
| **Secondary Users** | _(Who else interacts?)_ |
| **Core Value** | _(What problem does it solve?)_ |
| **Aesthetic Essence** | SaaS (Default) / Luxury / Brutalist / Custom |

---

## 2. User Journeys

> **Most important section.** These drive everything else.

### Journey 1: [Name - e.g., "New User Onboarding"]

**Actor:** [User type]
**Goal:** [What they're trying to accomplish]
**Trigger:** [What starts this journey]

**Steps:**
1.
2.
3.
4.
5.

**Success:** [What indicates completion]
**Failure:** [What could go wrong, how to handle]

---

### Journey 2: [Name - e.g., "Daily Core Task"]

**Actor:** [User type]
**Goal:** [What they're trying to accomplish]
**Trigger:** [What starts this journey]

**Steps:**
1.
2.
3.
4.
5.

**Success:** [What indicates completion]
**Failure:** [What could go wrong, how to handle]

---

### Journey 3: [Name - e.g., "Admin Management"]

**Actor:** [User type]
**Goal:** [What they're trying to accomplish]

**Steps:**
1.
2.
3.

---

_(Add more journeys as needed)_

---

## 3. Preset Selection

**Selected:** `_______________`

| Preset | When to Use |
|--------|-------------|
| `landing` | Marketing site, public pages, conversion focus |
| `admin` | Dashboard with sidebar, CRUD-heavy, internal tools |
| `moolti` | Multi-tenant SaaS, teams/workspaces, billing |
| `docs` | Documentation, auto-sidebar from pages |
| `blog` | Content-focused, articles, archive |
| `game` | Mobile-first, fullscreen, minimal chrome |
| `plain` | Custom everything, no framework layout |

---

## 4. Auth & Roles

| Question | Answer |
|----------|--------|
| **Auth required?** | Yes / No |
| **Providers** | [ ] Email [ ] Google [ ] GitHub [ ] Apple |
| **Self-registration?** | Yes / No / Invite-only |

### Roles

| Role | Description | Can Do |
|------|-------------|--------|
| `guest` | Not logged in | |
| `user` | Logged in | |
| `admin` | Administrator | |
| | | |

---

## 5. Billing (if applicable)

| Question | Answer |
|----------|--------|
| **Billing enabled?** | Yes / No |
| **Model** | Subscription / One-time / Usage-based |
| **Provider** | Stripe / Other |

### Plans

| Plan | Price | Features |
|------|-------|----------|
| | | |
| | | |

---

## 6. Entities

> One entity = one collection. Define ALL data.

### Entity: [Name]

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| id | string | yes | auto-generated |
| | | | |
| | | | |
| createdAt | timestamp | yes | auto |
| updatedAt | timestamp | yes | auto |

**States:** `[state1]` → `[state2]` → `[state3]`

**State Transitions:**
- `state1` → `state2`: [What triggers this]
- `state2` → `state3`: [What triggers this]
- `state2` → `cancelled`: [What triggers this]

**Relationships:**
- Belongs to: [Entity] (via `fieldName`)
- Has many: [Entity]

**Permissions:**
| Action | Who | Conditions |
|--------|-----|------------|
| Create | | |
| Read | | |
| Update | | |
| Delete | | |

---

### Entity: [Name]

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| | | | |

**States:** (if applicable)

**Relationships:**

**Permissions:**
| Action | Who | Conditions |
|--------|-----|------------|
| Create | | |
| Read | | |
| Update | | |
| Delete | | |

---

_(Copy entity template for each entity)_

---

## 7. Business Rules

> Explicit rules that govern behavior. If it's not here, it doesn't exist.

### [Entity/Feature] Rules

1. **[Rule name]:** [Description]
   - Example: "Order total = sum(items) + shipping - discount"

2. **[Rule name]:** [Description]

3. **[Rule name]:** [Description]

### Validation Rules

| Entity | Field | Rule |
|--------|-------|------|
| | | |
| | | |

### Automatic Calculations

| When | Calculate | Formula/Logic |
|------|-----------|---------------|
| | | |

### Notifications/Triggers

| Event | Action | Recipients |
|-------|--------|------------|
| | | |
| | | |

---

## 8. Pages

> Derived from user journeys. Every page exists because a journey needs it.

### Public Pages

| Route | Page | Purpose | From Journey |
|-------|------|---------|--------------|
| `/` | HomePage | | |
| | | | |

### Protected Pages (login required)

| Route | Page | Purpose | From Journey |
|-------|------|---------|--------------|
| `/dashboard` | DashboardPage | | |
| | | | |

### Admin Pages

| Route | Page | Purpose | From Journey |
|-------|------|---------|--------------|
| `/admin` | AdminDashboard | | |
| | | | |

---

## 9. Features

| Feature | Needed | Details |
|---------|--------|---------|
| **i18n** | Yes/No | Languages: |
| **PWA** | Yes/No | |
| **Real-time** | Yes/No | Which entities: |
| **File uploads** | Yes/No | Which entities: |
| **Email notifications** | Yes/No | Triggers: |
| **Search** | Yes/No | Which entities: |
| **Export (CSV/PDF)** | Yes/No | Which entities: |

---

## 10. Edge Cases & Error Handling

> What happens when things go wrong?

| Scenario | Handling |
|----------|----------|
| User submits invalid data | |
| Network connection lost | |
| Concurrent edit conflict | |
| External service down | |
| User tries unauthorized action | |
| | |

---

## 11. Design Decisions & Overrides
> **CRITICAL:** These are intentional deviations from framework UX heuristics (e.g., 3-click rule, 70/30 hierarchy). 
> **FOR AGENTS:** If a layout choice is documented here, do NOT challenge or flag it during the Build or Polish phases.

| Target (Page/Feature) | Override Description | Rationale |
|-----------------------|----------------------|-----------|
| | | |

---

## Validation Checklist

Before starting Phase 1, ALL must be checked:

### Completeness
- [ ] Every user journey has numbered steps
- [ ] Every entity has fields, states, permissions defined
- [ ] Every business rule is explicit (not implied)
- [ ] Every page is linked to a journey
- [ ] No "TBD", "TODO", or empty fields

### Clarity
- [ ] Can explain app to someone unfamiliar in 2 minutes
- [ ] Can trace any page back to a user journey
- [ ] Can answer "who can do X to Y?" for any entity/action
- [ ] Can answer "what happens when Z fails?" for common scenarios

### User Validation
- [ ] User has reviewed this spec
- [ ] User has confirmed it's complete
- [ ] User has no outstanding questions

---

**All boxes checked? Proceed to Phase 1: SCAFFOLD.**
