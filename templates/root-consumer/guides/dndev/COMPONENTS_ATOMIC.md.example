# Component Reference

**Check JSDoc in your IDE** - Hover over any component import to see props, types, and examples.

**Import from:** `@donotdev/components` (atomic UI)

**This is your GOTO  Semantic React package**

---

## Layout Components

These are the only ways one should handle layout to get to quick results functionality wide.
- **Section** - Layout section with title, grid, tone system, and `bleed` prop for full-viewport-width content (images, maps, galleries).
- **Grid** - CSS Grid layout primitive with responsive column control.
- **Stack** - Flexbox layout for arranging items in rows or columns.
- **HeroSection** - Hero banner with title, subtitle, gradient backgrounds, `bleed` for full-width, and `backgroundImage` for cover images with overlay.
- **CallToAction** - Conversion-focused section with actions, `bleed` for full-width, and `backgroundImage` for cover images with overlay.

---

## Content Components

- **Card** - Premium card component with title, content, footer, and elevation variants.
  - **Navigation with middle-click support:** Wrap Card in Link component for navigation that supports middle-click (opens in new tab). See navigation section below.
- **DualCard** - Side-by-side card layout for comparison or feature showcases.
- **Text** - Typography component with semantic text variants.
- **Blockquote** - Styled blockquote for citations and testimonials.
- **List** - Bullet points, numbered lists, and feature lists with zero CSS. Use `icon` prop for custom icons, `icon={null}` for plain bullets.
- **DescriptionList** - Key-value pairs and metadata using semantic HTML (dl, dt, dd).
- **Separator** - Visual separator with semantic styling variants.

---

## Action Components

- **Button** - Accessible button with variants, icons, tooltips, and render prop composition.
- **ActionButton** - Button with async action handling and loading states.
- **FileButton** - Button that triggers file input selection.
- **PortalButton** - Button that opens content in a portal overlay.
- **ButtonGroup** - Visual grouping of buttons with joined borders. Supports horizontal/vertical orientation, variant propagation, and items-based API.

---

## Form Components

- **Input** - Accessible input with mobile-friendly touch targets and key state styling.
- **PasswordInput** - Password field with show/hide toggle functionality.
- **Textarea** - Multi-line text input component.
- **Label** - Accessible label with icon support and various positions.
- **Checkbox** - Accessible checkbox with custom styling.
- **RadioGroup** - Accessible radio group with multiple visual variants.
- **Select** - Accessible select dropdown with search and multi-select support.
- **Combobox** - Searchable combobox with autocomplete functionality.
- **Switch** - Toggle switch component.
- **Slider** - Range slider for numeric input.
- **ColorPicker** - Color selection with preset swatch grid, native color input, and ARIA radiogroup pattern. Built-in palettes: basic, material, pastel.

---

## Feedback Components

- **Alert** - Attention-grabbing alert with semantic variants and icons.
- **AlertDialog** - Modal dialog that interrupts with important content expecting a response.
- **Dialog** - Accessible modal dialog with custom content sizes and actions.
- **Toast** - Toast notifications via Toaster component with ToastProvider.
- **Skeleton** - Loading state skeleton with multiple animation variants.
- **Spinner** - Loading spinner with multiple sizes and theme-aware colors.
- **Progress** - Progress bar component for task completion.

---

## Navigation Components

- **Tabs** - Tabbed interface with props-based API and full keyboard navigation.
- **Accordion** - Vertically stacked headings that reveal content sections.
- **NavigationMenu** - Props-based navigation menu with nested menus and rich content.
- **Pagination** - Accessible pagination with page number generation and ellipsis.
- **Command** - Command palette component for keyboard navigation and search.
- **CommandDialog** - Command palette dialog optimized for Cmd+K navigation.
- **TreeView** - Hierarchical tree component with WAI-ARIA TreeView pattern. Supports expand/collapse, single/multi selection, keyboard navigation, type-ahead search, and connector lines.

---

## Overlay Components

- **Popover** - Accessible popover displaying rich content in a portal.
- **Tooltip** - Tooltip component with positioning and delay controls.
- **HoverCard** - Card that appears on hover with rich content.
- **Sheet** - Slide-out panel for sidebars, mobile navigation, or editing panels.
- **ContextMenu** - Right-click context menu with nested submenus.
- **DropdownMenu** - Professional dropdown menu with props-based API.

---

## Data Display Components

- **Table** - Accessible table component with sorting and selection.
- **DataTable** - High-level table with built-in sorting, filtering, search, and pagination.
- **Avatar** - Accessible avatar with image and fallback support.
- **Badge** - Status indicator with semantic variants (polymorphic: div, span, mark).
- **Tag** - Tag component for labels and categories.
- **Calendar** - Accessible date picker built on react-day-picker.

---

## Utility Components

- **Collapsible** - Collapsible content component.
- **Toggle** - Toggle button component.
- **ToggleGroup** - Group of toggle buttons.
- **ScrollArea** - Scrollable area with custom scrollbars.
- **Portal** - Portal component for rendering outside DOM hierarchy.
- **VisuallyHidden** - Screen reader-only content component.
- **Slot** - Slot component for composition patterns.
- **SkipLink** - Accessibility skip-to-content links, visible only on keyboard focus. Supports multiple targets with smooth scroll and focus management.

---

## Advanced Components

- **InfiniteScroll** - Infinite scroll component with load more functionality.
- **Stepper** - Step-by-step workflow component with navigation controls.
- **CopyToClipboard** - Copy to clipboard with visual feedback.
- **VideoPlayer** - Video player component with controls.
- **FeatureFallback** - Fallback UI when features are unavailable.

---

## Icons

- **Icons** - Icon components from lucide-react and custom partner icons.

---

**See also:** [COMPONENTS_UI.md](./COMPONENTS_UI.md) for layout/composition components | [COMPONENTS_CRUD.md](./COMPONENTS_CRUD.md) for CRUD operations and entity forms

---

## Navigation with Card Component

**For clickable cards with navigation support (including middle-click):**

Wrap Card in Link component from `@donotdev/ui`:

```tsx
import { Card } from '@donotdev/components';
import { Link } from '@donotdev/ui';

// Card with navigation (supports middle-click)
<Link
  path="/about"
  style={{ display: 'block', textDecoration: 'none', height: '100%' }}
  aria-label="Learn more about About"
>
  <Card
    title="About"
    subtitle="Learn more about us"
    content="Click to navigate"
  />
</Link>

// Card with onClick only (no middle-click support)
<Card
  title="Action Card"
  onClick={() => handleAction()}
/>
```

**Why wrap in Link?**
- Card component is standalone and not routing-aware
- Link wrapper provides framework navigation (SPA routing, keeps outlet context)
- Native browser middle-click support (opens in new tab)
- CSR/SSR safe

**Alternative:** Use FeatureCard from `@donotdev/ui` which handles this automatically when `href` prop is provided.

---

**All props documented in JSDoc** - Hover in IDE for complete reference.
