---
description: Design workflow: Architect → Design Document (BEFORE /build)
---

# Design Command - Architecture & Design Workflow

**⚠️ MODE CHECK:** This command is for **Consumer App Development** only.

**If you're in the framework monorepo (this repo):**
- ❌ **DO NOT use `/design`** - design directly, then code in `packages/*/src/`
- ✅ Use Architecture Hub + Development Hub for framework design patterns
- ✅ See [Modes Guide](https://github.com/donotdev/framework/blob/main/docs/development/MODES.md) for framework dev workflow

**If you're in a consumer repo:**
- ✅ Use `/design` for architecture decisions
- ✅ Use `/build` to implement the design

**WORKFLOW ORDER:**
1. `/design` → Architect designs solution (THIS COMMAND)
2. `/build` → Prompt Engineer + Coder implement design

**Design comes BEFORE build. Design the solution, then build it.**

## Usage

```
/design [requirement or question]
```

**Examples:**
```
/design How should we handle documentation updates in dndev bump?
/design Add documentation update step to bump command
/design Status translation fallback chain architecture
```

## Process

### Step 0: Start Phase (MANDATORY — DO THIS FIRST)

**BEFORE doing any design work**, call the appropriate phase:
```
start_phase(1)   # for SCAFFOLD (routes, page stubs)
start_phase(2)   # for ENTITIES (data models, fields, access)
```
This loads the blueprint, persona, context, and lessons. **Do NOT proceed without this call.**

When design work is complete, call:
```
complete_phase({ files: ["...affected files..."], summary: "Description of what was designed" })
```
Wait for user to call `approve_phase()` before moving on.

### Step 1: Architect Phase

**Deploy:** `/agents architect` (WAI-WAY architect role)

**Input:** User requirement or design question

**Actions:**
1. Analyze requirement/question
2. Read constraints from:
   - `CLAUDE.md` (project rules)
   - Framework architecture docs (`docs/architecture/`)
   - Existing patterns in codebase
   - WAI-WAY entity patterns (if applicable)
3. Research similar solutions (codebase search, online if needed)
4. Design solution with:
   - Architecture overview
   - Trade-offs analysis
   - Implementation approach
   - File locations and changes needed
   - Dependencies and impacts
   - Validation criteria

**Output:** Complete design document ready for `/build`

## Output Format

```
DESIGN DOCUMENT:

REQUIREMENT:
[Clear statement of what needs to be designed]

ANALYSIS:
- Current state: [what exists]
- Problem: [what needs solving]
- Constraints: [framework rules, patterns, etc.]

DESIGN:
[Architecture/solution design]

TRADE-OFFS:
- Option A: [pros/cons]
- Option B: [pros/cons]
- Recommendation: [which and why]

IMPLEMENTATION PLAN:
- Files to create/modify: [list]
- Changes needed: [detailed breakdown]
- Dependencies: [what depends on this]
- Testing: [how to validate]

READY FOR /build:
[Summary of what will be built]

UNRESOLVED:
- [Any open questions]
```

## Rules

- **NEVER write code** - only design and plan
- **ALWAYS analyze existing patterns** - don't reinvent
- **ALWAYS consider trade-offs** - no solution is perfect
- **ALWAYS reference framework architecture** - stay aligned
- **ALWAYS identify impacts** - what breaks if we change this?
- **ALWAYS prepare for /build** - design should be actionable
- **ALWAYS use `lookup_symbol`** when referencing @donotdev components in your design — verify the API exists before putting it in the plan
- **Import convention:** Always `@donotdev/<package>` top-level, never sub-paths. The only exceptions are `@donotdev/core/server`, `@donotdev/core/vite`, `@donotdev/core/next`, `@donotdev/core/functions`

## Integration with WAI-WAY & BMAD

- Uses **BMAD PRINTER** persona (proven, battle-tested)
- Follows WAI-WAY Phase 2 (ENTITIES) + Architecture
- Output feeds into `/build` command (BMAD FORGER/Builder)

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
- STOP and inform user: "`/design` is for consumer apps. In framework dev, design directly using Architecture Hub patterns, then code in `packages/*/src/`"

**If consumer app detected:**
- Use ONLY published `@donotdev/*` packages
- Cannot reference internal framework patterns

## Requirements

- MCP server configured (`.mcp.json` or `.cursor/mcp.json`) - for component/package lookups
- Architecture docs available (for framework context)
