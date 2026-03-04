# Preset Selection Guide

> **One decision. Everything else follows.**

## How Presets Work

**Presets are NOT part of scaffolding.** When you run `dndev create-app`, it creates a base app with either Vite or Next.js.

**Preset is a single config change** in `config/app.ts` after the app is created:

```typescript
export const appConfig: AppConfig = {
  preset: 'admin', // Change this one line
};
```

The preset controls layout, navigation, and default behaviors - but the files are the same.

---

## Decision Matrix

| If your app is... | Use Preset | Why |
|-------------------|------------|-----|
| Marketing site with conversion goals | `landing` | Hero sections, CTAs, no sidebar, public-first |
| Internal dashboard / back-office tool | `admin` | Sidebar nav, CRUD tables, auth-required by default |
| Multi-tenant SaaS with teams | `moolti` | Workspace switcher, billing, team management |
| Documentation / knowledge base | `docs` | Auto-sidebar from pages, search, TOC |
| Blog / content publishing | `blog` | Article layout, archive, categories |
| Mobile-first / game / fullscreen | `game` | Minimal chrome, touch-optimized, no sidebar |
| Custom / minimal / embedded | `plain` | No layout, full control |

---

## Preset Details

### `landing`
**Best for:** Marketing sites, product pages, portfolios

**Layout:**
- Header with nav links
- Full-width content area
- Footer with legal links
- NO sidebar

**Default auth:** Public pages, optional protected sections

**Typical pages:**
- HomePage (hero + features + CTA)
- AboutPage
- PricingPage
- ContactPage
- LoginPage / SignupPage

---

### `admin`
**Best for:** Dashboards, CMS, internal tools, CRUD apps

**Layout:**
- Header with branding + user menu
- Collapsible sidebar with nav
- Main content area
- Optional footer

**Default auth:** Most pages require login

**Typical pages:**
- DashboardPage (stats, recent items)
- [Entity]ListPage (table with search/filter)
- [Entity]Page (create/edit form)
- SettingsPage

---

### `moolti`
**Best for:** SaaS with workspaces, team collaboration

**Layout:**
- Like `admin` but with workspace switcher
- Team/organization context
- Billing integration ready

**Default auth:** All pages require login + workspace

**Typical pages:**
- WorkspaceDashboardPage
- TeamSettingsPage
- BillingPage
- [Entity]ListPage per workspace

---

### `docs`
**Best for:** Documentation, guides, API reference

**Layout:**
- Header with search
- Auto-generated sidebar from `src/pages/docs/**`
- Wide content area for text
- Table of contents

**Default auth:** Public (or auth for premium docs)

**Typical structure:**
```
src/pages/docs/
  GettingStartedPage.tsx
  guides/
    SetupPage.tsx
    ConfigurationPage.tsx
  api/
    OverviewPage.tsx
    EndpointsPage.tsx
```

---

### `blog`
**Best for:** Articles, news, content marketing

**Layout:**
- Header with categories
- Article-focused content area
- Sidebar for related/recent posts
- Author profiles

**Default auth:** Public read, admin write

**Typical pages:**
- BlogHomePage (featured + recent)
- ArticlePage (single article)
- CategoryPage (filtered list)
- AuthorPage (author profile + posts)

---

### `game`
**Best for:** Mobile apps, games, fullscreen experiences

**Layout:**
- Minimal/no header
- Full viewport content
- Bottom navigation (mobile)
- Touch-optimized

**Default auth:** Varies

**Typical pages:**
- GamePage (main experience)
- LeaderboardPage
- ProfilePage
- SettingsPage

---

### `plain`
**Best for:** Embeds, custom layouts, special cases

**Layout:**
- No framework layout
- You control everything
- Just `<PageContainer>` wrapper

**Default auth:** None (you configure)

**Use when:**
- Embedding in another app
- Completely custom design
- Framework presets don't fit

---

## Quick Decision Flow

```
START
  |
  v
Is it content/docs focused?
  YES --> Is it articles/blog? --> YES --> blog
  |                          --> NO  --> docs
  NO
  |
  v
Is it a dashboard/tool?
  YES --> Multi-tenant/teams? --> YES --> moolti
  |                          --> NO  --> admin
  NO
  |
  v
Is it marketing/public?
  YES --> landing
  NO
  |
  v
Is it mobile-first/fullscreen?
  YES --> game
  NO  --> plain
```

---

## Changing Presets Later

Presets can be changed in `config/app.ts`:

```typescript
export const appConfig: AppConfig = {
  preset: 'admin', // Change this
};
```

**Low risk:** Switching between similar presets (admin <-> moolti)
**Higher risk:** Switching layout types (landing <-> admin) - may need page restructuring

**Recommendation:** Get the preset right in Phase 0. Changing later is possible but adds work.
