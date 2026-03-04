# Routing Guide

**For AI Agents:** Use framework routing components/hooks. NEVER import from `react-router-dom` directly. Framework handles SPA navigation, Outlet, and overlay closing automatically.

---

## 🚨 Critical Rule: Never Use react-router-dom Directly

**❌ WRONG:**
```tsx
import { Link, useNavigate, useParams } from 'react-router-dom'; // ❌ BREAKS FRAMEWORK
```

**✅ CORRECT:**
```tsx
import { Link, useNavigate, useParams } from '@donotdev/ui'; // ✅ Framework routing
```

**Why?** The framework's routing components:
- Automatically close overlays on navigation
- Handle SPA navigation correctly with Outlet
- Work with both Vite and Next.js
- Integrate with auth and route discovery
- Provide proper TypeScript types

---

## Framework Routing API

### Components

```tsx
import { Link, DnDevNavigationMenu } from '@donotdev/ui';
```

**Link Component:**
```tsx
<Link path="/products" label="Products" icon="Package" />
<Link path="/users/:id" replace prefetch={false}>User Details</Link>
```

**DnDevNavigationMenu (Sidebar/Header):**
```tsx
// Auto-fetches routes, handles auth filtering
<DnDevNavigationMenu vertical display={DISPLAY.AUTO} />
```

### Hooks

```tsx
import {
  useNavigate,
  useLocation,
  useParams,
  useRouteParam,
  useSearchParams,
  useNavigationItems,
} from '@donotdev/ui';
```

---

## Navigation Patterns

### 1. Basic Navigation

**✅ Use framework Link:**
```tsx
import { Link } from '@donotdev/ui';

function ProductCard({ product }) {
  return (
    <Link path={`/products/${product.id}`} label={product.name} />
  );
}
```

**✅ Use framework useNavigate:**
```tsx
import { useNavigate } from '@donotdev/ui';

function ProductForm() {
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    await saveProduct();
    navigate('/products'); // ✅ Closes overlays automatically
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

**❌ DON'T use react-router-dom:**
```tsx
import { useNavigate } from 'react-router-dom'; // ❌ BREAKS FRAMEWORK

function ProductForm() {
  const navigate = useNavigate(); // ❌ Doesn't close overlays, breaks SPA
  // ...
}
```

---

### 2. Route Parameters

**✅ Use framework useRouteParam:**
```tsx
import { useRouteParam } from '@donotdev/ui';

function ProductPage() {
  const id = useRouteParam('id'); // ✅ Returns string | undefined
  // Safe: handles string | string[] | undefined automatically
}
```

**✅ Or use framework useParams:**
```tsx
import { useParams } from '@donotdev/ui';

function ProductPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : undefined;
}
```

**❌ DON'T use react-router-dom:**
```tsx
import { useParams } from 'react-router-dom'; // ❌ Type issues, breaks framework
```

---

### 3. Sidebar Navigation

**✅ Use DnDevNavigationMenu (auto-fetches routes):**
```tsx
import { DnDevNavigationMenu, DISPLAY } from '@donotdev/ui';

function Sidebar() {
  return (
    <DnDevNavigationMenu
      vertical
      display={DISPLAY.AUTO} // CSS-driven collapse
      showIcons={true}
    />
  );
}
```

**✅ Or use useNavigationItems for custom sidebar:**
```tsx
import { Link, useNavigationItems } from '@donotdev/ui';

function CustomSidebar() {
  const menuItems = useNavigationItems(); // ✅ Auth-filtered routes
  
  return (
    <nav>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          path={item.path}
          label={item.label}
          icon={item.icon}
          className={item.isActive ? 'active' : ''}
        />
      ))}
    </nav>
  );
}
```

**❌ DON'T manually build navigation:**
```tsx
import { Link } from 'react-router-dom'; // ❌ BREAKS FRAMEWORK

function Sidebar() {
  // ❌ Doesn't integrate with route discovery
  // ❌ Doesn't handle auth filtering
  // ❌ Doesn't work with Outlet
  return (
    <nav>
      <Link to="/products">Products</Link>
    </nav>
  );
}
```

---

### 4. Programmatic Navigation

**✅ Use framework useNavigate:**
```tsx
import { useNavigate } from '@donotdev/ui';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    await signIn();
    navigate('/dashboard', { replace: true }); // ✅ Closes overlays
  };
  
  return <form onSubmit={handleLogin}>...</form>;
}
```

**✅ Navigate back:**
```tsx
const navigate = useNavigate();
navigate('back'); // ✅ Framework handles browser history
```

**✅ With options:**
```tsx
navigate('/products', {
  replace: true,        // Replace history entry
  preserveScroll: true, // Preserve scroll position
});
```

---

### 5. Query Parameters

**✅ Use framework useSearchParams (read-only, returns URLSearchParams directly):**
```tsx
import { useSearchParams } from '@donotdev/ui';

function ProductList() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  return <div>Page: {page}</div>;
}
```

**✅ Or use useQueryParams helper:**
```tsx
import { useQueryParams } from '@donotdev/ui';

function ProductList() {
  const { page, sort } = useQueryParams({ page: '1', sort: 'name' });
  // Returns { page: string, sort: string } with defaults
}
```

---

### 6. Route Matching

**✅ Use framework useMatch:**
```tsx
import { useMatch } from '@donotdev/ui';

function NavigationItem({ path }) {
  const isActive = useMatch(path);
  return <Link path={path} className={isActive ? 'active' : ''} />;
}
```

---

## Outlet and Nested Routes

**Framework handles Outlet automatically.** You don't need to manually use `<Outlet />` in most cases.

### How It Works

1. **RootLayout** wraps all routes and includes `<Outlet />`
2. **DnDevLayout** receives `<Outlet />` and renders it in the main content area
3. **Routes are discovered** from `src/pages/*Page.tsx` files automatically

**✅ Your pages just render content:**
```tsx
// src/pages/ProductsPage.tsx
export function ProductsPage() {
  return <div>Products List</div>; // ✅ Rendered via Outlet automatically
}
```

**❌ DON'T manually use Outlet:**
```tsx
import { Outlet } from 'react-router-dom'; // ❌ BREAKS FRAMEWORK

export function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <Outlet /> {/* ❌ Framework already handles this */}
    </div>
  );
}
```

### Nested Routes (Advanced)

If you need nested routes, use the framework's route discovery:

```tsx
// src/pages/products/ProductsPage.tsx
export const pageMeta = {
  route: '/products',
  // ...
};

// src/pages/products/ProductDetailPage.tsx
export const pageMeta = {
  route: '/products/:id',
  // ...
};
```

Framework automatically creates nested route structure.

---

## Route Discovery

**Routes are auto-discovered from `src/pages/*Page.tsx` files.**

**✅ Define routes with PageMeta:**
```tsx
// src/pages/ProductsPage.tsx
import type { PageMeta } from '@donotdev/core';

export const pageMeta: PageMeta = {
  title: 'Products',
  route: '/products',
  icon: 'Package',
  auth: { required: true, roles: ['user', 'admin'] },
};

export function ProductsPage() {
  return <div>Products</div>;
}
```

**Framework automatically:**
- Discovers routes from filesystem
- Generates navigation menus
- Filters by auth permissions
- Handles lazy loading
- Creates route structure

---

## Common Mistakes

### ❌ Mistake 1: Importing from react-router-dom

```tsx
// ❌ WRONG
import { Link, useNavigate } from 'react-router-dom';
```

**Fix:**
```tsx
// ✅ CORRECT
import { Link, useNavigate } from '@donotdev/ui';
```

---

### ❌ Mistake 2: Manual Outlet Usage

```tsx
// ❌ WRONG
import { Outlet } from 'react-router-dom';

export function Layout() {
  return <Outlet />; // Framework already handles this
}
```

**Fix:** Don't use Outlet manually. Framework handles it.

---

### ❌ Mistake 3: Manual Route Configuration

```tsx
// ❌ WRONG
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  );
}
```

**Fix:** Use route discovery. Create `src/pages/ProductsPage.tsx` with `pageMeta`.

---

### ❌ Mistake 4: Manual Navigation Menu

```tsx
// ❌ WRONG
function Sidebar() {
  return (
    <nav>
      <Link to="/products">Products</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
}
```

**Fix:**
```tsx
// ✅ CORRECT
import { DnDevNavigationMenu } from '@donotdev/ui';

function Sidebar() {
  return <DnDevNavigationMenu vertical />; // Auto-fetches routes
}
```

---

### ❌ Mistake 5: Not Using Framework Link

```tsx
// ❌ WRONG
import { Link } from 'react-router-dom';

<Link to="/products">Products</Link>
```

**Fix:**
```tsx
// ✅ CORRECT
import { Link } from '@donotdev/ui';

<Link path="/products" label="Products" />
```

---

## Quick Reference

### Import Paths

```tsx
// ✅ Framework routing (platform-agnostic)
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useRouteParam,
  useSearchParams,
  useNavigationItems,
  DnDevNavigationMenu,
} from '@donotdev/ui';
```

### Common Patterns

```tsx
// Navigation
const navigate = useNavigate();
navigate('/products');
navigate('back');
navigate('/products', { replace: true });

// Route params
const id = useRouteParam('id');

// Query params (read-only, returns URLSearchParams directly)
const searchParams = useSearchParams();
const page = searchParams.get('page');

// Navigation menu
const menuItems = useNavigationItems(); // Auth-filtered routes

// Link component
<Link path="/products" label="Products" icon="Package" />
```

---

## Summary

1. **Always import from `@donotdev/ui`** — never `react-router-dom`
2. **Use `DnDevNavigationMenu`** for sidebars/headers
3. **Use `useNavigationItems()`** for custom navigation
4. **Don't use `<Outlet />` manually** - framework handles it
5. **Routes are auto-discovered** from `src/pages/*Page.tsx`
6. **Framework closes overlays** on navigation automatically

**Framework handles SPA navigation, Outlet, and route discovery. Use framework components/hooks only.**
