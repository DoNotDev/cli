# High-Level Design (HLD)

> **Version:** V1
> **Status:** Draft | Validated
> **Last Updated:** [date]
>
> This document is the HOW (big picture) — architecture, preset, auth, pages, features.
> Produced by Phase 0 (BRAINSTORM) from `spec_template.md` conversation.

---

## 1. Preset Selection

**Selected:** `_______________`

| Preset | When to Use |
|--------|-------------|
| `landing` | Marketing site, public pages, conversion focus |
| `admin` | Dashboard with sidebar, CRUD-heavy, internal tools |
| `moolti` | Multi-tenant SaaS, teams/workspaces, billing |
| `docs` | Documentation, auto-sidebar from pages |
| `blog` | Content-focused, articles, archive |
| `game` | Mobile-first, fullscreen, minimal chrome |
| `plain` | Custom everything, no framework layout |

**Rationale:** [Why this preset fits]

---

## 2. Auth Model

| Question | Answer |
|----------|--------|
| **Auth required?** | Yes / No |
| **Providers** | [ ] Email [ ] Google [ ] GitHub [ ] Apple |
| **Self-registration?** | Yes / No / Invite-only |

### Roles

| Role | Description | Can Do |
|------|-------------|--------|
| `guest` | Not logged in | |
| `user` | Logged in | |
| `admin` | Administrator | |

---

## 3. Billing Model (if applicable)

| Question | Answer |
|----------|--------|
| **Billing enabled?** | Yes / No |
| **Model** | Subscription / One-time / Usage-based |
| **Provider** | Stripe / Other |

### Plans

| Plan | Price | Features |
|------|-------|----------|
| | | |

---

## 4. Aesthetic Essence

**Selected:** SaaS (Default) / Luxury / Brutalist / Custom

**Application:** [How it affects colors, typography, spacing]

---

## 5. Page Map

> Every page traces back to a user journey in PRD.md.

### Public Pages

| Route | Page | Purpose | From Journey |
|-------|------|---------|--------------|
| `/` | HomePage | | |

### Protected Pages (login required)

| Route | Page | Purpose | From Journey |
|-------|------|---------|--------------|
| `/dashboard` | DashboardPage | | |

### Admin Pages

| Route | Page | Purpose | From Journey |
|-------|------|---------|--------------|
| `/admin` | AdminDashboard | | |

---

## 6. Entity Relationship Diagram

> Text-based overview. Detailed per-entity specs are in LLD.md.

```
[Entity A] 1──N [Entity B]
[Entity B] N──1 [Entity C]
[Entity A] 1──1 [Entity D]
```

---

## 7. Feature Flags

| Feature | Needed | Details |
|---------|--------|---------|
| **i18n** | Yes/No | Languages: |
| **PWA** | Yes/No | |
| **Real-time** | Yes/No | Which entities: |
| **File uploads** | Yes/No | Which entities: |
| **Email notifications** | Yes/No | Triggers: |
| **Search** | Yes/No | Which entities: |
| **Export (CSV/PDF)** | Yes/No | Which entities: |

---

## 8. Architecture Decisions

| Decision | Choice | Rationale | Alternatives Considered |
|----------|--------|-----------|------------------------|
| | | | |

---

## Validation Checklist

- [ ] Preset selected with rationale
- [ ] Auth model complete (providers, roles, registration)
- [ ] Every page traces back to a PRD journey
- [ ] Entity relationships mapped
- [ ] Feature flags decided (no "TBD")
- [ ] Architecture decisions documented
- [ ] User has reviewed and confirmed this document
