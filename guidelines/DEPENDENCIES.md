# Dependencies

How packages are organized in a DoNotDev consumer project — what goes where, what's global, what's conditional, what's deprecated.

---

## Source of Truth

**`packages/cli/dependencies-matrix.json`** controls every version and placement. Never hardcode versions — the matrix resolves them via `dndev init` and `dndev bump`.

---

## Global Installs

| Package | Install | Notes |
|---------|---------|-------|
| `@donotdev/cli` | `npm i -g @donotdev/cli` | **Never in package.json.** Global binary only. |
| `bun` | System install | Runtime + package manager. Pinned in `packageManager` field. |

---

## Root vs App

### Root `package.json` (workspace root)

| Category | Packages |
|----------|----------|
| **dependencies** | `@donotdev/*` (core, auth, billing, components, crud, oauth, templates, ui), `react`, `react-dom`, `zustand`, `valibot`, `lucide-react` |
| **devDependencies** | Root tooling group (ESLint, TypeScript, Prettier) |
| **workspaces** | `["apps/*", "entities"]` |

**Rules:**
- All `@donotdev/*` packages live at root — hoisted, shared across apps
- React and its runtime peers (`zustand`, `valibot`, `lucide-react`) at root — one version for the monorepo
- No bundler at root. Vite, PostCSS, Rollup plugins belong in apps

### App `package.json` (e.g., `apps/my-app/`)

| Category | Packages | Why |
|----------|----------|-----|
| **dependencies** | App-specific runtime deps not hoisted to root | Rare — most come from root |
| **devDependencies** | `vite`, `@vitejs/plugin-react`, `postcss`, `core-vite-config` group, `typescript`, `i18n` tooling, `react-query` | Externalized by the Vite config — not bundled, provided by the dev environment |

**Rule:** If the Vite config externalizes it, it's a devDependency in the app.

---

## Dependency Categories

### Always at root (runtime)

These are imported in bundled code. Consumers need them at runtime.

```
react, react-dom, zustand, valibot, lucide-react
@donotdev/core, @donotdev/ui, @donotdev/components, @donotdev/auth
@donotdev/crud, @donotdev/billing, @donotdev/oauth, @donotdev/templates
```

### Always in app devDependencies (build tooling)

Externalized by `defineViteConfig`. Not shipped in the bundle.

```
vite, @vitejs/plugin-react, @vitejs/plugin-basic-ssl
@rollup/plugin-strip, rollup-plugin-visualizer
vite-plugin-pwa, vite-tsconfig-paths
postcss, autoprefixer
typescript, @types/react, @types/react-dom
i18next, react-i18next, i18next-browser-languagedetector
@tanstack/react-query
```

---

## Platform Conditionals

Added only when the matching platform is selected during `dndev init`.

| Platform | Root dependencies | Root devDependencies |
|----------|------------------|---------------------|
| **Firebase** | `firebase` (client SDK) | — |
| **Supabase** | `@supabase/supabase-js`, `@supabase/ssr` | `supabase` (CLI) |

**Rule:** Never add both. One platform per project.

---

## Opt-In Packages

**Not installed by default.** Only add when the feature is actively used.

| Package | When to add | Where |
|---------|------------|-------|
| `shiki` | Code syntax highlighting (CodeBlock component) | Root dependencies |
| `@tiptap/*` | Rich text editor | Root dependencies |
| `@sentry/*` | Error monitoring | App dependencies |
| `stripe` | Server-side Stripe (Edge Functions) | Functions package |

These are declared as optional peers (`peerDependenciesMeta: { optional: true }`) in the framework — no warnings if absent.

---

## Deprecated / Removed

| Package | Status | Replacement |
|---------|--------|-------------|
| `puppeteer` | **Removed** | Use Playwright or headless browser tooling outside the framework |

---

## Functions Packages

Backend functions (`functions-firebase`, `functions-supabase`, `functions-vercel`) have their own dependency set, isolated from the frontend workspace.

**Rule:** Server-only packages (Stripe server SDK, admin SDKs, server utilities) go in the functions package, never at root.

---

## Overrides

Consumer projects get an `overrides` field in root `package.json` to pin transitive dependency versions. Managed automatically by `dndev bump` — never edit manually.

```json
{
  "overrides": {
    "@donotdev/core": "0.1.1",
    "path-to-regexp": "^0.1.7"
  }
}
```

---

## Upgrading

```bash
dndev bump --check    # See available updates
dndev bump --dry-run  # Preview changes
dndev bump            # Apply safe updates (minor/patch)
```

See the **Version Control** guideline for the full upgrade process.

---

## Anti-Patterns

- **`@donotdev/cli` in package.json** — global only, never a project dependency
- **Bundler at root** — Vite/Rollup/PostCSS belong in app devDependencies
- **Both Firebase and Supabase** — pick one platform
- **Opt-in packages installed by default** — shiki, tiptap, sentry add weight; only when needed
- **Manual version edits** — use `dndev bump`, not hand-editing
- **`bun install` for @donotdev packages** — use `dndev bump` to stay in sync with the matrix
- **Custom workspace entries** — workspaces must be `["apps/*", "entities"]` only. Adding local path entries (e.g., `../some-path/packages/*`) will resolve packages from disk instead of npm, breaking your install
