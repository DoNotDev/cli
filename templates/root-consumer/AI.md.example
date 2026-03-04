# AI Agent Instructions

> **You are building a DoNotDev app.** Read this file completely before doing anything else.

## Welcome

We'll build your app together in **5 structured phases**: brainstorm requirements, scaffold pages, define data, wire everything up, and polish for production. Each phase has a clear deliverable and validation gate. This isn't freeform coding — there's a proven methodology that produces solid, production-ready apps.

## What To Do Right Now

1. **Verify MCP is working.** Call `list_features()`. If it fails, run `get_guide("AGENT_START_HERE")` for IDE-specific setup.
2. Call `start_phase(0)` — begin **Phase 0: BRAINSTORM**
3. Follow each phase in order. **Do not skip phases. Do not work outside a phase.**

## The 5 Phases — MANDATORY

**ALL work MUST happen inside an active phase.** Call `start_phase(N)` BEFORE writing any code or documents. Call `complete_phase({ files })` BEFORE moving to the next phase. Working outside a phase is a violation — no exceptions.

| Phase | Name | Slash Command | What Happens |
|-------|------|---------------|-------------|
| 0 | **BRAINSTORM** | `/brainstorm` | Ask questions, understand requirements, produce validated spec |
| 1 | **SCAFFOLD** | `/design` | Create all routes and page stubs from spec |
| 2 | **ENTITIES** | `/design` | Define all data models (fields, access, visibility) |
| 3 | **COMPOSE** | `/build` | Build pages with framework components (hardcode strings) |
| 4 | **CONFIGURE** | `/polish` | Config, test, polish, i18n. Run `/grill` and `/techdebt` before shipping |

## Workflow Per Phase — NON-NEGOTIABLE

```
start_phase(N)          → get blueprint + persona + context + lessons
  ↓
work                    → follow blueprint, lookup_symbol for every component
  ↓
dndev tc                → type-check MUST pass before completing phase
  ↓
complete_phase(files)   → validate conventions + symbol usage → submit for review
  ↓
approve_phase()         → user approves, move to next phase
```

**You MUST call `start_phase(N)` before ANY work in that phase.**
**You MUST call `complete_phase({ files })` when the phase is done.**
**You MUST run `dndev tc` after every code change and before every `complete_phase`.**
Skipping these steps means the work is untracked, unvalidated, and unacceptable.

## STOP — lookup_symbol Before ANY @donotdev Code

**STOP. Before writing ANY `@donotdev` import, call `lookup_symbol({ symbol: "Name" })`.** Do NOT guess. Do NOT proceed without it. `complete_phase` rejects un-looked-up symbols.

**Always import from `@donotdev/<package>` top-level** — never sub-paths. See `get_guide("SETUP_PAGES")` for conventions and patterns.

## CLI Commands

`dndev` is installed globally via `bun install -g` (no sudo needed) and also as a local devDependency. Run it directly — or use `bun run dev` / `bunx dndev` as fallback.

| Command | What it does |
|---------|-------------|
| `dndev dev` | Start the dev server (Vite/Next.js via Turbo) |
| `dndev dev:myapp` | Start dev server for a specific app |
| `dndev build` | Build for production |
| `dndev preview` | Preview production build |
| `dndev emu` | Start dev with Firebase emulators |
| `dndev tc` | **Type-check all packages — run after every code change** |
| `dndev tc:myapp` | Type-check a specific app |
| `dndev format` | Format code with Prettier |
| `dndev deploy` | Deploy to production |
| `dndev staging` | Deploy to staging/UAT |
| `dndev coach` | Show what to configure before running setup |
| `dndev setup` | Validate .env, automate provider setup, health check |
| `dndev doctor` | Check project health (providers, .env) |
| `dndev bump` | Update @donotdev packages to latest |
| `dndev cacheout` | Clear build caches |
| `dndev sync-secrets` | Sync env vars to Firebase/Vercel/GitHub |
| `dndev make-admin` | Set a user as admin |
| `dndev agent` | Configure MCP server for AI agents |
| `dndev wai` | Output WAI-WAY activation prompt |
| `dndev create-app` | Interactive wizard — creates a new app in the monorepo |

Most commands support `:<app>` syntax: `dndev dev:web`, `dndev tc:admin`, `dndev build:public`.

Run `dndev --help` for the full command list.

`dndev create-app` is **interactive** — it prompts for builder (Vite/Next.js/Expo), backend (Firebase/Supabase/none), and features. There is no `--preset` flag.

## Rules

- **ESM only** — never `require()`
- **RTL safe** — use `start`/`end`, never `left`/`right`
- **Import order** — React → vendors → @donotdev → relative
- **Import convention** — always `@donotdev/<pkg>` top-level, never sub-paths
- **NO native HTML elements** — never use `<div>`, `<span>`, `<p>`, `<h1-6>`, `<button>`, `<a>`, `<input>`, `<textarea>`, `<select>`, `<form>`, `<table>`, `<ul>`, `<ol>`, `<li>`, `<img>`, `<section>`, `<nav>`, `<header>`, `<footer>` in @donotdev files. Use framework components: Stack, Card, Text, Button, Link, TextInput, Select, Form, DataTable, List, Image, Section, Navigation, Header, Footer. See `get_guide("COMPONENTS_ATOMIC")`
- **NO custom CSS** — never create `.css`, `.module.css`, `.scss`, `.sass`, or `.less` files. All styling is done through framework component props, variant tokens, and theme configuration
- **NO custom components** — never create files in `components/`. Compose pages using framework components only. If a component is missing, say what you need and STOP
- **NO inventing props** — only use props returned by `lookup_symbol()`. Common hallucination traps that DO NOT exist: `size`, `tone`, `color`, `padding`, `margin`, `spacing`, `columns`, `background`, `fields`
- **Framework-first** — if something's missing, say what and stop
- **No .md file creation** — never create documentation/analysis/summary .md files unless explicitly asked. Session notes go in `.dndev/`
- **Follow existing patterns** — the scaffolded files ARE your documentation

## MCP Tools

Call `get_guide("AGENT_START_HERE")` for the full tool reference, IDE setup, env var guide, and fallback instructions.

Key tools: `start_phase` · `complete_phase` · `approve_phase` · `lookup_symbol` · `get_guide` · `get_guideline` · `search_framework` · `list_features` · `record_lesson` · `run_typecheck`

## Security Gate

Before production: run `dndev doctor` and `/grill`. See `get_guide("SOC2")` for details.
Golden path: `dndev coach` → fill .env → `dndev setup` → `dndev doctor`.
