---
description: End-of-session tech debt sweep — surfaces cleanup items, does NOT fix
---

**Phase gate: only use after Phase 3 (COMPOSE) is complete.**

Scan files modified in this session for tech debt.

Check for:
- Duplicate logic (same pattern implemented 2+ places)
- Dead exports (exported symbols with no consumers)
- Missing JSDoc on public API functions/types
- Broken or missing imports (type-only imports used as values, etc.)
- Unused dependencies in package.json vs actual imports
- Hardcoded strings that should be in config or i18n

Output: prioritized list, grouped by area. Format:
```
## <area>
- [HIGH]  <description> — <file>:<line>
- [MED]   <description> — <file>:<line>
- [LOW]   <description> — <file>:<line>
```

Rules:
- DO NOT fix anything. Report only.
- Skip node_modules, dist, .d.ts files.
- Skip items already in .dndev/implementation.md as known TODOs.
