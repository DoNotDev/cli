# Advanced Components (@donotdev/components)

High-level, opinionated, and marketing-focused UI components from `@donotdev/components`.

All advanced components are included in `@donotdev/components` — no additional package needed.
Styles are automatically included via `@donotdev/components/styles`.

## Components

### Crawl

Cinematic 3D text crawl component with lazy loading.

```tsx
import { Crawl } from '@donotdev/components';

<Crawl
  intro?: ReactNode | string
  title?: ReactNode | string
  content: ReactNode | string | string[]
  duration?: number // @default 26
  contentHeight?: string // @default "150vh"
  tiltAngle?: number
  className?: string
  style?: CSSProperties
  aria-label?: string
/>
```

### Marquee

Production-grade marquee with accessibility, reduced motion support, and smart behavior detection.

```tsx
import { Marquee } from '@donotdev/components';

<Marquee<T>
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  className?: string
  itemClassName?: string
  gap?: 'none' | 'tight' | 'medium' | 'large' // @default 'medium'
  speed?: number // px per second
  direction?: 'left' | 'right' | 'up' | 'down' | 'auto' // @default 'auto'
  pauseOnHover?: boolean
  ariaLabel?: string
  reducedMotion?: 'respect' | 'ignore'
  behavior?: 'bounce' | 'infinite' | 'auto'
  pauseOnFocusWithin?: boolean
  easing?: 'linear' | 'ease-in-out' | 'ease-out'
/>
```

### Roadmap

Timeline component with horizontal (desktop) / vertical (mobile) layout. Features animated progress line, glowing nodes, and lift-on-hover cards.

```tsx
import { Roadmap } from '@donotdev/components';
import type { RoadmapStep } from '@donotdev/components';

<Roadmap
  steps: RoadmapStep[]
  className?: string
  variant?: CardVariant // @default 'default'
/>

// RoadmapStep interface:
interface RoadmapStep {
  phase: string // e.g., "Week 1", "Days 1-2"
  icon: LucideIcon
  title: string
  subtitle: string
  description?: string
  content?: CardContent // Optional content shown in popover on click
}
```

### StackedCards

Simple scroll-reveal stacked cards. Active card shows full content, stacked cards show only bottom edge with number.

```tsx
import { StackedCards } from '@donotdev/components';
import type { StackedCardData } from '@donotdev/components';

<StackedCards
  items: StackedCardData[]
  variant?: SurfaceVariantProps['variant']
  ariaLabel?: string
  threshold?: number // Intersection threshold (0.0 - 1.0) @default 0.3
  className?: string
  style?: CSSProperties
/>

// StackedCardData extends ComponentData with:
interface StackedCardData extends ComponentData {
  number?: string | number // Custom number/label (e.g. "01", "Week 1"). Defaults to index.
}
```

### Reveal

Reveal component for staggered animations. Features viewport-based visibility detection, directional animations, and customizable stagger delays.

```tsx
import { Reveal } from '@donotdev/components';

<Reveal
  items: string[] | ReactNode[]
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'fade-in' | 'alternate-h' | 'alternate-v'
  stagger?: number // milliseconds between items
  threshold?: number
  distance?: number // animation distance in pixels
  duration?: number // animation duration in milliseconds
  once?: boolean // if true, only animate once
  viewport?: boolean // if true, only animate items in viewport
  overrides?: Array<{
    index: number
    direction: 'left' | 'right' | 'top' | 'bottom' | 'fade-in'
  }>
  className?: string
  children?: ReactNode
/>
```

### Carousel

Premium carousel component with lazy loading built-in. Features true infinite circular loop, hardware-accelerated animations, swipe/touch gestures, and autoplay with pause-on-hover.

```tsx
import { Carousel } from '@donotdev/components';
import type { CarouselProps, CarouselRef } from '@donotdev/components';

<Carousel<T>
  items: T[]
  renderItem: (item: T, index: number, isActive: boolean) => ReactNode
  className?: string
  slideClassName?: string
  showArrows?: boolean
  showDots?: boolean
  showProgress?: boolean
  autoplay?: boolean
  autoplayInterval?: number // milliseconds
  transitionDuration?: number // milliseconds
  loop?: boolean
  // ... and more props
/>
```

### SplitReveal

Split reveal component for displaying content in two columns. Features left column content and right column stat cards or custom content with reveal animations.

```tsx
import { SplitReveal } from '@donotdev/components';
import type { StatCardData } from '@donotdev/components';

<SplitReveal
  left: ReactNode
  right: ReactNode | StatCardData[]
  leftDirection?: 'left' | 'right' | 'top' | 'bottom' | 'fade-in' // @default 'left'
  rightDirection?: 'left' | 'right' | 'top' | 'bottom' | 'fade-in' // @default 'right'
  threshold?: number // @default 0.3
  className?: string
/>

// StatCardData interface:
interface StatCardData {
  title: string
  description: string
}
```

## Notes

- All components are lazy-loaded by default for optimal performance
- Components use framework theme variables for consistent styling
- Most components support reduced motion preferences
- All components are SSR-safe and work with both Vite and Next.js

## FAQSection (from @donotdev/core)

FAQ section component for displaying frequently asked questions using accordion. Reads FAQ items from i18n JSON files.

**Note:** This component is from `@donotdev/core`, not `@donotdev/components`. It requires i18n setup with translation files.

```tsx
import { FAQSection, useTranslation } from '@donotdev/core';
import { Section } from '@donotdev/components';

function FAQPage() {
  const { t } = useTranslation(['faq']);

  return (
    <Section>
      <FAQSection t={t} keyPrefix="faqs.items" maxIndex={50} />
    </Section>
  );
}
```

**Props:**
- `t: TFunction` - Translation function from `useTranslation` hook
- `keyPrefix: string` - Base key prefix for FAQ items (e.g., `'faqs.items'`)
- `maxIndex?: number` - Maximum number of FAQ items to check (default: 50)
- `className?: string` - CSS class for container
- `itemClassName?: string` - CSS class for each accordion item
- `aria-label?: string` - ARIA label for accessibility (default: 'Frequently Asked Questions')

**JSON Structure:**

FAQ items must be in your i18n JSON files with this structure:

```json
{
  "faqs": {
    "items": [
      {
        "q": "Question text",
        "a": "Answer text"
      },
      {
        "q": "Another question",
        "a": "Another answer"
      }
    ]
  }
}
```

The component uses `translateObjectArray` to automatically load all items from `keyPrefix` (e.g., `faqs.items[0]`, `faqs.items[1]`, etc.) up to `maxIndex`.

**Example:**

```tsx
// src/pages/FAQPage.tsx
import { FAQSection, useTranslation } from '@donotdev/core';
import { HeroSection, Section } from '@donotdev/components';
import { PageContainer } from '@donotdev/ui';

export const NAMESPACE = 'faq';

function FAQPage() {
  const { t } = useTranslation([NAMESPACE]);

  return (
    <PageContainer variant="docs">
      <HeroSection title={t('title')} subtitle={t('subtitle')} />
      <Section>
        <FAQSection t={t} keyPrefix="faqs.items" maxIndex={50} />
      </Section>
    </PageContainer>
  );
}
```

```json
// src/pages/locales/faq_en.json
{
  "title": "Frequently Asked Questions",
  "subtitle": "Everything you need to know.",
  "faqs": {
    "items": [
      {
        "q": "How long does the free trial last?",
        "a": "There is no limit. You can use the framework packages indefinitely for development and local testing."
      },
      {
        "q": "What is the watermark?",
        "a": "The watermark is a floating button that appears when running applications without a valid license."
      }
    ]
  }
}
```