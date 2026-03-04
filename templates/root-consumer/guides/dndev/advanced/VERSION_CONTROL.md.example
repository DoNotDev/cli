# Version Control Guide

**How to upgrade DoNotDev framework packages in your project**

---

## Quick Start

```bash
# Check for available updates
dndev bump --check

# Apply safe updates (minor/patch versions)
dndev bump

# Preview changes without applying
dndev bump --dry-run
```

---

## How It Works

### Automatic Updates

**Patch versions (0.0.x):**
- Handled automatically by `bun install`
- No action needed - `^` ranges allow automatic patch updates
- Example: `^0.0.2` → `0.0.3`, `0.0.4`, etc.

**Minor versions (0.x.y):**
- Handled automatically by `dndev bump`
- **RISK FREE:** All changes are backward compatible via deprecation
- No breaking changes in 0.x.y range
- Example: `^0.0.2` → `^0.1.0` (auto-updated, safe)

### Manual Validation Required

**Major versions (0.*.* → 1.x.y):**
- `dndev bump` detects major version changes
- Shows migration guide with breaking changes
- **You must validate manually** before updating
- **Only place where breaking changes occur**
- Example: `^0.1.0` → `^1.0.0` (requires validation)

---

## Upgrade Process

### Step 1: Check for Updates

```bash
dndev bump --check
```

This shows:
- Available updates for `@donotdev/*` packages (from npm)
- Available updates for external peer dependencies (from matrix)
- Major version changes (with migration guides)

### Step 2: Review Migration Guides

If major version changes are detected:
- Read the migration guide shown in the output
- Check for breaking changes that affect your code
- Review the migration guide file (path shown in output)

### Step 3: Apply Updates

```bash
# Safe updates (minor/patch) - auto-applied
dndev bump

# Or preview first
dndev bump --dry-run
```

**What gets updated:**
- `@donotdev/*` packages: Updated to latest compatible version
- External peer dependencies: Updated to matrix versions
- All `package.json` files in your project

---

## Understanding Version Ranges

### `^` Range (Caret)

**What it means:**
- Allows updates to latest minor/patch version
- Same major version required
- Example: `^0.0.2` allows `0.0.2` through `0.0.9`, but not `0.1.0`

**Why we use it:**
- Automatic patch updates via `bun install`
- Safe minor updates via `dndev bump`
- Prevents accidental major version updates

### Version Format

```json
{
  "dependencies": {
    "@donotdev/core": "^0.0.2",
    "react": "^19.2.3"
  }
}
```

- `^0.0.2` = allows `0.0.2` to `0.0.x` (patch updates)
- `^0.1.0` = allows `0.1.0` to `0.x.x` (minor updates)
- `^1.0.0` = allows `1.0.0` to `1.x.x` (minor updates, not `2.0.0`)

---

## Migration Guides

When upgrading major versions, migration guides are provided:

**Location:** Shown in `dndev bump` output

**Contains:**
- List of breaking changes
- Step-by-step migration instructions
- Code examples for updated APIs

**Example:**
```
⚠️  Major version update detected: @donotdev/core 0.1.0 → 1.0.0

Migration guide: docs/migration/v0.1-to-v1.0.md

Breaking changes:
- Removed useAuth() - use useAuthentication() instead
- Theme API changed - see migration guide

Review the migration guide before updating.
```

---

## Troubleshooting

### "No updates available"

- All packages are up to date
- Or you're already on latest version

### "Major version change detected"

- Review migration guide
- Check breaking changes
- Update code if needed
- Run `dndev bump` again to apply

### "Package not found on npm"

- Package may not be published yet
- Check package name spelling
- Verify you're using correct registry

---

## Best Practices

1. **Regular updates:** Run `dndev bump --check` monthly
2. **Test after updates:** Run your test suite after applying updates
3. **Review major changes:** Always read migration guides for major versions
4. **Use `--dry-run`:** Preview changes before applying
5. **Commit changes:** Commit updated `package.json` files after successful updates

---

**Keep your dependencies up to date. Stay secure. Stay compatible.**
