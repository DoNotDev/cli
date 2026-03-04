# Setup: Blog

**Convention-based markdown blog.** Drop `slug_lang.md` files in `src/content/blog/`, get a fully functional blog with i18n, reading time, tags, RSS, and sitemap.

---

## Quick Start

### 1. Create the content directory

```
src/content/blog/
├── my-first-post_en.md
├── my-first-post_fr.md
└── another-post_en.md
```

### 2. Write a post with frontmatter

```markdown
---
title: My First Post
description: A short summary for listings and SEO
date: 2025-06-01
tags: tutorial, getting-started
image: /blog/my-first-post.png
---

Your markdown content here. Supports:
- **Bold**, *italic*, ~~strikethrough~~
- [Internal links](/faq) and [external links](https://example.com)
- Images: ![alt text](/blog/my-image.png)
- Code blocks with syntax highlighting
```

### 3. Create the data loader

```typescript
// src/data/blog/index.ts
import { createBlogLoader } from '@donotdev/templates';
import type { BlogLoader } from '@donotdev/templates';

const markdownFiles = import.meta.glob('../../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function getBlogLoader(lang: string = 'en'): BlogLoader {
  return createBlogLoader(markdownFiles as Record<string, string>, lang);
}
```

### 4. Create the listing page

```typescript
// src/pages/BlogPage.tsx
import { BookOpen } from 'lucide-react';
import { HeroSection } from '@donotdev/components';
import { useTranslation, type PageMeta } from '@donotdev/core';
import { BlogList } from '@donotdev/templates';
import { PageContainer } from '@donotdev/ui';
import { getBlogLoader } from '../data/blog';

export const NAMESPACE = 'blog';
export const meta: PageMeta = { namespace: NAMESPACE, icon: <BookOpen /> };

export default function BlogPage() {
  const { t, i18n } = useTranslation([NAMESPACE]);
  const posts = getBlogLoader(i18n?.language).getAllPosts();

  return (
    <PageContainer variant="docs">
      <HeroSection title={t('title')} subtitle={t('subtitle')} />
      <BlogList posts={posts} />
    </PageContainer>
  );
}
```

### 5. Create the post page (dynamic route)

```typescript
// src/pages/BlogPostPage.tsx
import { BookOpen } from 'lucide-react';
import { useTranslation, type PageMeta } from '@donotdev/core';
import { BlogPostView } from '@donotdev/templates';
import { PageContainer, useRouteParam } from '@donotdev/ui';
import { getBlogLoader } from '../data/blog';

export const NAMESPACE = 'blog';
export const meta: PageMeta = {
  namespace: NAMESPACE,
  icon: <BookOpen />,
  route: '/blog/:slug',
  hideFromMenu: true,
};

export default function BlogPostPage() {
  const { i18n } = useTranslation([NAMESPACE]);
  const slug = useRouteParam('slug');
  const post = slug ? getBlogLoader(i18n?.language).getPostBySlug(slug) : null;

  return (
    <PageContainer variant="docs">
      <BlogPostView post={post} />
    </PageContainer>
  );
}
```

### 6. Add locale files

Blog UI labels (`readMore`, `backToBlog`, `publishedOn`, etc.) are provided by the framework via `blog_*.json` in `@donotdev/core`. Override any key by creating the same file in your app.

Page-specific strings (title, subtitle) go in your app locale:

```json
// src/pages/locales/blog_en.json
{
  "title": "Blog",
  "subtitle": "Your subtitle here"
}
```

---

## File Convention

**Pattern:** `slug_lang.md`

| File | Slug | Language |
|------|------|----------|
| `my-post_en.md` | `my-post` | English |
| `my-post_fr.md` | `my-post` | French |
| `my-post_de.md` | `my-post` | German |
| `solo-post_en.md` | `solo-post` | English (no FR = falls back to EN) |

**Rules:**
- Slug = everything before the last `_xx` suffix
- Language suffix must be 2-5 characters (ISO codes)
- English (`_en`) is the fallback language
- If a post only exists in `_en`, it's shown for all languages

---

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `description` | Yes | Summary for listings and SEO |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `tags` | No | Comma-separated tags |
| `image` | No | Hero image path — must be in `public/blog/` (see Images section) |

Custom fields are preserved in `meta[key]`.

---

## Images

### Hero Images (frontmatter `image` field)

One image per post. Used in blog listing cards, article page, RSS feed, and OG/social sharing.

**Convention:**
- **Location:** `public/blog/[slug].png` (matches the post slug)
- **Size:** 1200×630px minimum (standard OG ratio, sharp on retina)
- **Format:** PNG or JPG
- **Reference:** `image: /blog/my-post.png` in frontmatter

```
public/
└── blog/
    ├── my-first-post.png        ← matches my-first-post_en.md
    ├── another-post.png         ← matches another-post_en.md
    └── inline-diagram.svg       ← used in markdown body
```

**Where it shows:**
| Context | Sizing |
|---------|--------|
| Blog listing (featured card) | `width: 100%`, `max-height: 360px`, `object-fit: cover` |
| Blog listing (grid cards) | `width: 100%`, `max-height: 180px`, `object-fit: cover` |
| Article page | `width: 100%`, `max-height: 480px`, `object-fit: cover` |
| RSS feed | `<enclosure>` with full URL |

### Inline Images (in markdown body)

Images referenced in markdown content also go in `public/blog/`:

```markdown
![Architecture diagram](/blog/inline-diagram.svg)
```

Rendered with `loading="lazy"` and `decoding="async"`.

**Co-located images (next to .md files) do NOT work** — `?raw` imports treat markdown as text strings, not processed modules.

---

## Tags & Filtering

```typescript
const blog = getBlogLoader('en');
const allTags = blog.getAllTags();           // ['react', 'typescript', ...]
const filtered = blog.getPostsByTag('react'); // Posts tagged 'react'
```

---

## RSS & Sitemap

**Fully automatic — zero configuration.** The framework handles everything:

### Build-time generation

The SEO pipeline (Vite `SEOPlugin` / Next.js `SEOHandler`) automatically:

1. Discovers `src/content/blog/*_en.md` files
2. Appends blog post URLs to `sitemap.xml`
3. Generates `rss.xml` (RSS 2.0 with Atom self-link) with all posts

No manual scripts needed. Just drop `.md` files and build.

### RSS auto-discovery

A `<link rel="alternate" type="application/rss+xml">` tag is automatically injected in the `<head>` by `AutoMetaTags`. This lets browsers and feed readers detect the feed without users needing to know the URL.

**Requires:** `VITE_APP_URL` (or `NEXT_PUBLIC_APP_URL`) set in `.env` — the RSS link uses the base URL to construct `https://yourdomain.com/rss.xml`.

### RSS feed contents

Each blog post entry includes:
- `<title>`, `<description>`, `<link>`, `<guid>`, `<pubDate>`
- `<category>` (from frontmatter `tags`)
- `<enclosure>` (from frontmatter `image`, if set)

---

## Scaling (50+ Posts)

Default uses `eager: true` (all posts bundled into JS). For large blogs, switch to lazy loading:

```typescript
// Lazy: posts loaded on demand, not bundled
const markdownFiles = import.meta.glob('../../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: false,  // ← Change this
});

// Now each value is () => Promise<string> instead of string
// You'll need to await them before passing to createBlogLoader
```

For most apps (< 50 posts), eager loading is optimal.

---

## Auto-Deploy

Push a new `.md` file → CI builds → `import.meta.glob` picks it up at build time → deployed. No CMS, no API.

---

## API Reference

From `@donotdev/templates`:

| Export | Type | Description |
|--------|------|-------------|
| `createBlogLoader` | Function | Create loader from glob results + language |
| `parseFrontmatter` | Function | Parse `---` frontmatter from raw markdown |
| `BlogList` | Component | Renders post listing with cards |
| `BlogPostView` | Component | Renders single post with MarkdownViewer |
| `BlogPost` | Type | Post with slug, meta, content, readingTime, tags |
| `BlogMeta` | Type | Frontmatter metadata |
| `BlogLoader` | Type | Loader interface |
