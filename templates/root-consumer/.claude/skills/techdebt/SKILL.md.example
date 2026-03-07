---
name: techdebt
description: End-of-session tech debt sweep. Scans modified files for duplicates, dead exports, missing JSDoc, broken imports, unused deps. Reports only, does NOT fix.
disable-model-invocation: true
argument-hint: [files/areas or blank for session diff]
---

**Phase gate: only use after Phase 3 (COMPOSE) is complete.**

Scan for tech debt — the slow rot that `/grill` doesn't catch.

## What to scan

**If `$ARGUMENTS` provided** — scan those files/areas.
**If empty** — check git diff for files modified in this session, group by area.

## What to check

- Duplicate logic (same pattern in 2+ places)
- Dead exports (exported symbols with no consumers)
- Missing JSDoc on public API functions/types
- Broken imports (type-only used as values, circular deps)
- Unused dependencies in package.json vs actual imports
- Hardcoded strings that should be in config or i18n

## What NOT to check

- Security (that's `/grill`)
- Style / formatting
- node_modules, dist, .d.ts
- Items in `.dndev/implementation.md` as known TODOs

## Output

```
## <area>
- [HIGH]  <description> — <file>:<line>
- [MED]   <description> — <file>:<line>
- [LOW]   <description> — <file>:<line>
```

Summary: `N items across M areas (H high, M med, L low)`

Rules:
- DO NOT fix anything. Report only.
- Quality > quantity. 10 real items >>> 40 noise.
