# WAI-WAY: The "With AI Way" Protocol

> **CREDIT:** WAI-WAY is adapted from the **BMAD Method**, optimized for DoNotDev.

---

## The Golden Rule

> **THE SCAFFOLDED FILES ARE YOUR DOCUMENTATION.**
>
> Every scaffolded file contains working examples and inline comments.
> **READ the file. FOLLOW the pattern. EXTEND.**
>
> Do NOT guess. Do NOT invent. Copy patterns from scaffolded files.

---

## The Intelligence Engine (MCP Server)

Your project is pre-configured with a **Knowledge Engine** (MCP Server) in `.mcp.json`.

1. **Phase Tracking:** `start_phase(N)` returns the blueprint, agent persona, and files to read for each phase.
2. **Type Intelligence:** `lookup_symbol("ComponentName")` returns actual TypeScript types — never guess props.
3. **Knowledge Retrieval:** `get_guide("CRUD")`, `get_guideline("styling")`, `search_framework("keyword")`.
4. **Implementation Tracking:** `init_implementation()` creates a persistent checklist. `update_progress()` ticks items. `get_progress()` reads status. Survives across sessions. Versioned per project version.
5. **Captain's Log:** Session history auto-recorded on `approve_phase()`. `get_project_history()` for metrics and post-mortem. Never deleted — carries across all project versions.
6. **Lessons:** `record_lesson("gotcha", { tags: ["stripe", "billing"] })` saves tagged gotchas to `.dndev/LESSONS.md`. Filtered by phase + module on next `start_phase`. Never deleted — carries across all project versions.

The IDE (Cursor, Claude Code, etc.) handles file write approval natively. No MCP-level gating.

---

## Document Chain

Phase 0 (BRAINSTORM) produces three specification documents from a conversation guided by `spec_template.md`:

```
spec_template.md (FORMAT — empty shell for conversation)
  ↓ P0: Extractor fills through questions
  ↓ User validates
  ↓ Agent splits into:
  ├── docs/PRD.md    (Product Requirements — journeys, rules, permissions)
  ├── docs/HLD.md    (High-Level Design — preset, auth, pages, features)
  └── docs/LLD.md    (Low-Level Design — per-entity specs, state machines, access)

init_implementation({ from_spec: true })
  └── .dndev/implementation.md  (active macro plan — checklist per phase)
```

| Document | Purpose | Audience |
|----------|---------|----------|
| **`PRD.md`** | The WHAT — user journeys, business rules, permissions, edge cases | Product owner, stakeholders, agents |
| **`HLD.md`** | The HOW (big picture) — preset, auth, pages, features, architecture | Architect, senior dev, agents |
| **`LLD.md`** | The HOW (detailed) — per-entity fields, state machines, access matrices | Builder agent, dev |

All three live in `docs/` and are versioned via git history.

---

## The Flow

```
BRAINSTORM (→ PRD + HLD + LLD) → SCAFFOLD → ENTITIES → COMPOSE → CONFIGURE
```

**Critical:** `spec_template.md` is the FORMAT, not an output. P0 uses it to guide conversation, then produces three separate documents.

---

## Phase 0: BRAINSTORM → PRD + HLD + LLD

**Goal:** Through conversation, gather requirements and produce validated specification documents.

**The flow:**
```
User provides idea → Agent asks questions → User validates → Agent produces PRD + HLD + LLD
```

### Step 1: User Provides Initial Idea

User describes the app informally:
- "I want a car dealership management app"
- "We need a SaaS for team project management"
- "Build me a portfolio website"

### Step 2: Agent Asks Clarifying Questions

**Identity:** What's it called? Who's it for? Value proposition?

**Scope:** What can users DO? What data exists? Main flows?

**Auth:** Login required? Roles? Providers?

**Access:** Who can create/read/update/delete each entity?

**Features:** Billing? i18n? PWA? OAuth?

### Step 3: Agent Fills Spec Template (internally)

Using answers, agent follows `guides/wai-way/spec_template.md` format:

**READ these to make decisions:**
- `guides/wai-way/presets_guide.md` - Choose preset
- `guides/wai-way/entity_patterns.md` - Common entity schemas
- `guides/wai-way/page_patterns.md` - Common page structures

### Step 4: User Validates Summary

Agent presents completed specification summary. User confirms or iterates.

### Step 5: Agent Produces Documents

**User confirms → Agent splits into three documents:**

**`docs/PRD.md`** (from `prd_template.md`):
- Identity, user journeys, business rules, permissions, edge cases, overrides

**`docs/HLD.md`** (from `hld_template.md`):
- Preset, auth model, billing, aesthetic essence, page map, entity relationships, features, architecture decisions

**`docs/LLD.md`** (from `lld_template.md`):
- Per-entity field definitions, state machines, relationships, access matrices, cross-entity rules

**Then:** `init_implementation({ from_spec: true })` → `.dndev/implementation.md`

**Documents validated? Move to Phase 1.**
**User has changes? Iterate until validated.**

---

## Phase 1: SCAFFOLD

**Goal:** Running app skeleton with all routes as interactive prototype stubs.

**READ:**
- `docs/HLD.md` - Page map (routes, purpose, journeys)
- `docs/PRD.md` - User journeys (for navigation flow)
- `guides/wai-way/page_patterns.md` - Page structure patterns

**`dndev` is an installed CLI — run directly, never via `bunx` or `npx`.**

```bash
# Create new app (interactive wizard — no --preset flag, it prompts you)
dndev create-app

# Start emulators (if Firebase backend was selected)
dndev emu start

# Start the dev server
dndev dev
```

### Step 1.1: Create Page Files

For each page from HLD page map, create `src/pages/[Name]Page.tsx`.

### Step 1.2: Add PageMeta + Interactive Stubs

**READ:** `src/pages/HomePage.tsx` - Copy the PageMeta pattern.

Each page gets:
- `PageMeta` with namespace, icon, auth (set `auth: false` for prototype validation)
- Navigation buttons to related pages (from user journeys)
- Role description placeholder

**Output:** All routes exist as clickable prototype stubs. User can click through the North Star path.

---

## Phase 2: ENTITIES

**Goal:** Define all data models from LLD.

**READ:**
- `docs/LLD.md` - Per-entity field specs, state machines, access matrices
- `entities/ExampleEntity.ts` - Entity definition pattern
- `guides/wai-way/entity_patterns.md` - Common entity schemas

### Step 2.1: Create Entity Files

For each entity from LLD:

1. Copy matching pattern from `entity_patterns.md`
2. Create `entities/[Entity].ts`
3. Customize fields from LLD field definitions
4. Set access rules from LLD access matrix

### Step 2.2: Export Entities

```typescript
// entities/index.ts
export { productEntity } from './Product';
export { customerEntity } from './Customer';
export { orderEntity } from './Order';
```

**Output:** All entities defined and exported.

---

## Phase 3: COMPOSE

**Goal:** Build pages with components. HARDCODE ALL STRINGS.

**READ:**
- `docs/PRD.md` - User journeys (what each page does)
- `docs/HLD.md` - Page map (routes, layout decisions)
- `src/pages/ListPageExample.tsx` - CRUD list pattern
- `src/pages/FormPageExample.tsx` - CRUD form pattern
- `guides/wai-way/page_patterns.md` - All page patterns

**HARDCODE all strings:**
```tsx
// GOOD
<HeroSection title="Welcome to My App" subtitle="The best app ever built" />

// BAD — Don't start with i18n
<HeroSection title={t('hero.title')} subtitle={t('hero.subtitle')} />
```

**Output:** All pages functional with hardcoded content.

---

## Phase 4: CONFIGURE + TEST

**Goal:** Generate tests, firestore rules, CI/CD, and finalize config.

**READ:**
- `docs/PRD.md` - Permissions matrix, business rules (your test plan)
- `docs/LLD.md` - Per-entity access matrices
- `entities/index.ts` - All entity definitions
- `src/config/app.ts` - App configuration
- `guides/dndev/SETUP_TESTING.md` - Testing patterns

### Tests
- Entity tests: required fields, types, access rules match LLD
- Page tests: renders, PageMeta, route protection matches HLD
- Access control tests: admin/owner/guest permissions match PRD

### Config
- `app.ts`: APP_NAME from PRD, preset from HLD
- `legal.ts`: Company, contacts, hosting, jurisdiction
- `.env`: Firebase, license key, optional Stripe/Sentry
- `firestore.rules`: Generated from entity access definitions
- `.github/workflows/ci.yml`: Quality + deploy pipeline

### Mobile Check
DevTools → 375px width → navigation, forms, text, buttons (44px), no horizontal scroll.

### i18n (Optional)
**Only after tests pass.** Extract hardcoded strings to `src/locales/[namespace]_en.json`.

**Output:** Test files, firestore.rules, CI/CD pipeline, configured app.

---

## Implementation Tracking (Multi-Session Progress)

`.dndev/implementation.md` tracks what's done and what's pending across sessions.

### Setup (after Phase 0)

```
# Auto-generate from spec documents
init_implementation({ from_spec: true })

# Or manual sections
init_implementation({ sections: [
  { title: "Auth Module", items: ["Login page", "Registration", "Password reset"] },
  { title: "Dashboard", items: ["Stats cards", "Activity feed", "Charts"] }
] })
```

### During Work

```
# Tick items as you complete them
update_progress({ item: "Login page", done: true })
update_progress({ item: "Stats cards", done: true, note: "Used Card component with level h3" })

# Check progress
get_progress()                              # full overview
get_progress({ section: "Auth Module" })    # filtered to section
```

### Cross-Session Continuity

When you start a new session:
1. `start_phase(N)` automatically includes implementation progress
2. The agent sees what's done and picks up where it left off
3. No repeated work, no drift

### Versioning (V1 → V2 → V3)

When starting a new project version:
1. Archive current: `.dndev/implementation.md` → `.dndev/archive/implementation-v{N}.md`
2. Update spec documents: modify `docs/PRD.md`, `docs/HLD.md`, `docs/LLD.md` (git tracks history)
3. Create fresh plan: `init_implementation()` with V(N+1) sections
4. **Lessons carry forward** — `.dndev/LESSONS.md` accumulates across all versions
5. **Captain's log carries forward** — `.dndev/captain-log.json` is the full project history

---

## Captain's Log (Project History)

Every `approve_phase()` auto-records a session entry to `.dndev/captain-log.json`. No manual action needed. **Never deleted — carries across all project versions.**

### What's Recorded Automatically

- Date + timestamps (started/completed)
- Phase number and name
- Module (if scoped)
- Files touched + symbols used
- Outcome summary (from `complete_phase({ summary: "..." })`)

### Viewing History

```
get_project_history()
```

Returns computed metrics + timeline:
- Total sessions, phases completed
- Files and symbols totals
- Per-session timeline with outcomes

---

## Lessons (Decisions & Gotchas)

`.dndev/LESSONS.md` — persistent operational knowledge. **Never deleted — carries across all project versions.**

### Recording

```
record_lesson("gotcha about Zustand store actions", { tags: ["zustand", "state"] })
```

### How They Work

- Tagged with inline markers for filtering
- `start_phase` filters by current phase + module — agents see only relevant lessons
- Confidence scoring: `score_lesson("lesson text", "helpful")` or `"harmful"`
- 90-day half-life decay — old lessons fade unless scored as helpful
- **Critical for V(N+1):** When starting a new version, agents read lessons to avoid repeating mistakes

---

## Quick Reference

### Key Files

| File | Purpose | When |
|------|---------|------|
| `guides/wai-way/spec_template.md` | Conversation FORMAT (empty shell) | Phase 0 |
| `guides/wai-way/prd_template.md` | Output FORMAT for PRD | Phase 0 |
| `guides/wai-way/hld_template.md` | Output FORMAT for HLD | Phase 0 |
| `guides/wai-way/lld_template.md` | Output FORMAT for LLD | Phase 0 |
| `docs/PRD.md` | Product Requirements (produced by P0) | Phase 0-4 |
| `docs/HLD.md` | High-Level Design (produced by P0) | Phase 0-4 |
| `docs/LLD.md` | Low-Level Design (produced by P0) | Phase 2-4 |
| `guides/wai-way/presets_guide.md` | Preset decision | Phase 0 |
| `guides/wai-way/entity_patterns.md` | Entity schemas | Phase 2 |
| `guides/wai-way/page_patterns.md` | Page structures | Phase 1, 3 |
| `src/pages/HomePage.tsx` | PageMeta pattern | Phase 1 |
| `entities/ExampleEntity.ts` | Entity pattern | Phase 2 |
| `src/config/app.ts` | App config | Phase 4 |

### Agents

| Agent | Phase | Focus |
|-------|-------|-------|
| **Extractor** | 0-1 | Requirements → PRD + HLD + LLD, routes, prototype |
| **Architect** | 2 | Entities from LLD |
| **Builder** | 3 | Page composition from PRD + HLD |
| **Polisher** | 4 | Config, testing, polish, i18n |

### Operational Files

| File | Lives in | Versioned | Purpose |
|------|----------|-----------|---------|
| `PRD.md` | `docs/` | Git history | Requirements |
| `HLD.md` | `docs/` | Git history | Architecture |
| `LLD.md` | `docs/` | Git history | Detailed design |
| `implementation.md` | `.dndev/` | Archived per version | Active macro plan |
| `captain-log.json` | `.dndev/` | Never archived | Full project history |
| `LESSONS.md` | `.dndev/` | Never archived | Decisions + gotchas |

---

## Summary

```
Phase 0: BRAINSTORM → User idea → Questions → PRD.md + HLD.md + LLD.md + implementation.md
Phase 1: SCAFFOLD   → Create all *Page.tsx with PageMeta, clickable prototype (from HLD page map)
Phase 2: ENTITIES   → Define all entities with fields/access (from LLD)
Phase 3: COMPOSE    → Build pages with components, HARDCODE strings (from PRD journeys + HLD pages)
Phase 4: CONFIGURE  → Config, Firebase, test, mobile, optional i18n
```

**Remember:** `spec_template.md` is the FORMAT. Phase 0 produces PRD + HLD + LLD. Validated documents = mechanical build.
