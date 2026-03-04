---
description: Extract requirements and generate complete HLD through conversation (BMAD EXTRACTOR)
---

# Brainstorm Command - Requirements Extraction

**⚠️ MODE CHECK:** This command is for **Consumer App Development** only.

**If you're in the framework monorepo (this repo):**
- ❌ **DO NOT use `/brainstorm`** - framework dev doesn't need requirements extraction
- ✅ See [Modes Guide](https://github.com/donotdev/framework/blob/main/docs/development/MODES.md) for framework dev workflow

**If you're in a consumer repo:**
- ✅ Use `/brainstorm` to extract requirements and generate HLD
- ✅ Use `/design` after HLD is validated
- ✅ Use `/build` after LLD is validated
- ✅ Use `/polish` after app is functional

**WORKFLOW ORDER:**
1. `/brainstorm` → Extract requirements, generate HLD (THIS COMMAND)
2. `/design` → Create technical plan (LLD)
3. `/build` → Implement code using framework defaults
4. `/polish` → Add styling, customization, i18n

---

## Usage

```
/brainstorm [app idea or requirement]
```

**Examples:**
```
/brainstorm I want to build a car dealership management app
/brainstorm Create a task management app for teams
/brainstorm Build a portfolio website for a photographer
```

---

## Process

### Step 0: Start Phase (MANDATORY — DO THIS FIRST)

**BEFORE asking any questions or doing any work**, call:
```
start_phase(0)
```
This activates Phase 0: BRAINSTORM and loads the blueprint, persona, context, and lessons learned from previous sessions. **Do NOT proceed without this call.**

### Step 1: Activate EXTRACTOR Agent

**Deploy:** `/agents extractor` (BMAD EXTRACTOR persona)

**Input:** User's app idea (any level of clarity)

**Actions:**
1. EXTRACTOR asks probing questions (one at a time)
2. EXTRACTOR uses MCP to discover framework capabilities
3. EXTRACTOR identifies native vs custom components
4. EXTRACTOR tracks progress and identifies gaps
5. EXTRACTOR generates complete HLD when all targets extracted

**Output:** Complete HLD document (`HLD.md`)

---

## What EXTRACTOR Extracts

| Category | What EXTRACTOR Asks |
|----------|---------------------|
| **Vision** | What is this app? Who uses it? |
| **Users** | What roles exist? What can each role do? |
| **Entities** | What "things" exist? What fields? How do they relate? |
| **Features** | What can users DO? MVP vs V2? |
| **Pages** | What screens exist? Routes? Access levels? |
| **Constraints** | Platform? Languages? Auth? Integrations? |
| **Native vs Custom** | What uses framework defaults? What needs custom? |

---

## Output Format

EXTRACTOR generates `HLD.md` with:

- **Vision** - One sentence description
- **Users** - Roles and permissions table
- **Entities** - All entities with fields, types, visibility, validation
- **Features** - MVP vs V2 categorization
- **Pages** - Routes, access levels, components
- **Constraints** - Platform, languages, auth, integrations
- **Native vs Custom** - Framework-native vs custom components
- **Open Questions** - Unresolved items

---

## Validation Gate & Phase Completion (MANDATORY)

**Before proceeding to `/design`:**
- [ ] HLD is complete (no empty sections or TBDs)
- [ ] All user journeys mapped (numbered steps)
- [ ] All entities have fields, states, permissions
- [ ] All business rules documented
- [ ] Native vs custom analysis complete
- [ ] User has validated HLD

**When HLD is complete**, write the filled-out spec to `docs/HLD.md` (the template at `guides/wai-way/spec_template.md` stays untouched as reference). Then call:
```
complete_phase({ files: ["docs/HLD.md"], summary: "HLD complete — N entities, N pages, N features" })
```
Then wait for the user to call `approve_phase()` before moving to `/design`.

**Quality Over Speed:** Take as long as needed. A complete HLD that takes 4 hours is better than an incomplete one that takes 20 minutes.

---

## Rules

- **EXTRACTOR asks one question at a time** - Wait for answer before next question
- **EXTRACTOR probes vague answers** - "What does 'manage' mean?"
- **EXTRACTOR challenges scope** - "What's the minimum to launch?"
- **EXTRACTOR summarizes progress** - Every 3-4 exchanges
- **EXTRACTOR asks when uncertain** - Never guesses
- **EXTRACTOR stops when complete** - Generates HLD only when all targets extracted

---

## Integration with WAI-WAY

- Uses **BMAD EXTRACTOR** persona (proven, battle-tested)
- Follows WAI-WAY Phase 0 (BRAINSTORM → SPEC)
- Output feeds into `/design` command (BMAD PRINTER/Architect)

---

## Requirements

- MCP server configured (`.mcp.json` or `.cursor/mcp.json`) - for framework discovery
- User available for conversation (requirements extraction is interactive)

---

## Next Step

Once HLD is validated:
→ Use `/design` to create technical plan (LLD)
