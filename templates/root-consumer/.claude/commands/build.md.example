---
description: Two-agent workflow: Prompt Engineer → Coder (AFTER /design)
---

# Build Command - Two-Agent Workflow

**⚠️ MODE CHECK:** This command is for **Consumer App Development** only.

**If you're in the framework monorepo (this repo):**
- ❌ **DO NOT use `/build`** - code directly in `packages/*/src/`
- ✅ Use direct coding following Architecture Hub patterns
- ✅ See [Modes Guide](https://github.com/donotdev/framework/blob/main/docs/development/MODES.md) for framework dev workflow

**If you're in a consumer repo:**
- ✅ Use `/build` to implement features
- ✅ Use `/design` first for architecture decisions

**WORKFLOW ORDER:**
1. `/brainstorm` → Extract requirements, generate HLD
2. `/design` → Create technical plan (LLD)
3. `/build` → Implement code using framework defaults (THIS COMMAND)
4. `/polish` → Add styling, customization, i18n

**If no LLD exists, Builder will create on-the-fly, but `/design` first is recommended.**

## Usage

```
/build [requirement]
```

**Example:**
```
/build Create customer detail page with inquiry list
```

## Process

### Step 0: Start Phase (MANDATORY — DO THIS FIRST)

**BEFORE writing any code**, call:
```
start_phase(3)
```
This activates Phase 3: COMPOSE and loads the blueprint, persona, context, and lessons. **Do NOT write code without this call.**

### Step 1: Activate FORGER Agent

**Deploy:** `/agents builder` (BMAD FORGER persona)

**Input:** LLD from `/design` command OR user requirement

**Actions:**
1. Read LLD (or create on-the-fly if no LLD exists)
2. Use MCP `lookup_symbol` for ALL components used
3. Build in phases:
   - Phase 1: Entities (create entity files)
   - Phase 2: Routes (create route config)
   - Phase 3: Auth (if needed)
   - Phase 4: Native Pages (using framework defaults)
   - Phase 5: Custom Components (if any)
   - Phase 6: Integration (wire everything together)
4. Use framework defaults ONLY (no styling, no customization)
5. Hardcode all strings (no i18n yet)
6. Run `dndev tc` after every file change — type errors must be fixed immediately
7. Validate each phase before proceeding

**Output:** Working app (functional MVP, no styling)

### Phase Completion (MANDATORY)

When all pages are built and `dndev tc` passes, call:
```
complete_phase({ files: ["src/pages/...all page files..."], summary: "N pages composed, all type-checking" })
```
Wait for user to call `approve_phase()` before moving to `/polish`.

---

## Alternative: Two-Agent Workflow

For complex builds, you can use:

**Step 1: Prompt Engineer**
- Deploy `/agents prompt-engineer`
- Prepares detailed prompt with all constraints

**Step 2: Coder**
- Deploy `/agents coder`
- Executes prompt following constraints

**Note:** BMAD FORGER (builder) is recommended for most cases as it's proven and battle-tested.

## Rules

- **Builder (FORGER):** Implements exactly what's in LLD, uses framework defaults only
- **Framework defaults ONLY:** No styling, no customization (deferred to /polish)
- **Hardcode strings:** No i18n yet (deferred to /polish)
- **Phase by phase:** Complete each phase before proceeding
- **User:** Reviews output, proceeds to /polish when functional

## STOP — lookup_symbol Before Every Component (Repeated Here On Purpose)

**STOP before writing ANY `@donotdev` import.** Call `lookup_symbol({ symbol: "Name" })` first. Do NOT guess props, hooks, or APIs. Do NOT proceed without verification. `complete_phase` will reject un-looked-up symbols.

**Import convention:** Always `@donotdev/<package>` — never sub-paths. No `@donotdev/ui/routing`, no `@donotdev/components/card`. The only exceptions are `@donotdev/core/server`, `@donotdev/core/vite`, `@donotdev/core/next`, `@donotdev/core/functions`.

## Mode Detection

**CRITICAL:** Check working mode first.

**Framework dev indicators:**
- `packages/` directory exists
- `CLAUDE.md` says "Framework Development Mode"
- Using `dn` CLI

**Consumer app indicators:**
- `apps/` or `src/` directory exists
- `CLAUDE.md` says "Consumer App Development Mode"
- Using `dndev` CLI

**If framework dev detected:**
- STOP and inform user: "`/build` is for consumer apps. In framework dev, code directly in `packages/*/src/`"

**If consumer app detected:**
- Use ONLY published `@donotdev/*` packages (no internals)

## Requirements

- MCP server configured (`.mcp.json` or `.cursor/mcp.json`)
- `@donotdev/mcp-server` available (via `bunx` or installed)
