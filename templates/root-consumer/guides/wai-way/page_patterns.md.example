# Page Pattern Catalog

> **Don't invent page structures. Copy patterns, customize content.**

---

## Pattern Index

| Pattern | Use For | Key Components |
|---------|---------|----------------|
| [Dashboard](#dashboard) | Main logged-in view, stats, quick actions | Section, Grid, Card, ActionCard |
| [List Page](#list-page) | Entity CRUD table | EntityList |
| [Form Page](#form-page) | Entity create/edit | EntityFormRenderer |
| [Landing/Home](#landinghome) | Marketing, conversion | HeroSection, Section, Card, CTA |
| [Pricing](#pricing) | Plan comparison | PricingTable, Section |
| [Settings](#settings) | User preferences | Section, form components |
| [Profile](#profile) | User profile display/edit | Section, Card, Avatar |
| [Detail Page](#detail-page) | Single item display (non-edit) | Section (bleed), ImageGallery, Card, Grid |
| [Analytics](#analytics) | Charts and metrics | Section, Grid, Card, charts |

---

## Dashboard

**Main logged-in view with KPIs, quick actions, alerts.**

```tsx
import { useEffect, useState } from 'react';
import { Spinner } from '@donotdev/components';
import { PageContainer, useNavigate } from '@donotdev/ui';
import { Section, Card, Grid, Stack, Button, Text, Badge } from '@donotdev/components';
import type { PageMeta } from '@donotdev/core';
import { ChartBar, Plus, ArrowRight } from 'lucide-react';

export const NAMESPACE = 'dashboard';

export const meta: PageMeta = {
    namespace: NAMESPACE,
    icon: <ChartBar />,
    auth: { required: true },
};

export default function DashboardPage() {
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch dashboard metrics from API/function
        fetchMetrics().then(setMetrics).finally(() => setLoading(false));
    }, []);

    return (
        <PageContainer>
            {/* Quick Actions */}
            <Section title="Quick Actions" gridCols={[2, 2, 4, 4]}>
                <Card
                    clickable
                    onClick={() => navigate('/items/new')}
                    icon={Plus}
                    title="Add New Item"
                />
                {/* More action cards... */}
            </Section>

            {/* KPI Cards */}
            <Section title="Overview" gridCols={[1, 2, 3, 3]}>
                <Card variant="glass" title="Total Items">
                    {loading ? <Spinner overlay /> : (
                        <Text level="h2">{metrics?.totalItems ?? 0}</Text>
                    )}
                </Card>
                {/* More KPI cards... */}
            </Section>

            {/* Alerts/Actions Needed */}
            {metrics?.needsAttention > 0 && (
                <Section title="Needs Attention">
                    <Card variant="secondary">
                        <Stack direction="row" justify="between" align="center">
                            <Text>{metrics.needsAttention} items need review</Text>
                            <Button variant="outline" onClick={() => navigate('/items?filter=attention')}>
                                View <ArrowRight size={16} />
                            </Button>
                        </Stack>
                    </Card>
                </Section>
            )}
        </PageContainer>
    );
}
```

**Key patterns:**
- Quick actions at top (cards with onClick)
- KPI cards in grid
- Alert/attention sections with actions
- Loading states with `<Spinner overlay />`

---

## List Page

**Entity CRUD table with search, filter, pagination.**

```tsx
import { Car } from 'lucide-react';
import { EntityList } from '@donotdev/crud';
import { useAuth } from '@donotdev/auth';
import type { PageMeta } from '@donotdev/core';
import { PageContainer } from '@donotdev/ui';
import { carEntity } from 'entities/car';

export const NAMESPACE = 'cars';

export const meta: PageMeta = {
    namespace: NAMESPACE,
    auth: { required: true, role: 'admin' },
    route: '/cars',
    icon: <Car />,
};

export default function CarsListPage() {
    const user = useAuth('user');

    return (
        <PageContainer>
            <EntityList
                entity={carEntity}
                userRole={user?.role}
            />
        </PageContainer>
    );
}
```

**Key patterns:**
- Minimal code - `EntityList` handles everything
- Pass `userRole` for column filtering
- Route matches collection (e.g., `/cars` for `cars` collection)

---

## Form Page

**Entity create/edit form.**

```tsx
import { useEffect, useState } from 'react';
import { PageContainer, Link, useNavigate } from '@donotdev/ui';
import { Section, Button, Alert } from '@donotdev/components';
import { EntityFormRenderer, useCrud } from '@donotdev/crud';
import { carEntity } from 'entities/car';
import { useTranslation } from '@donotdev/core';
import type { PageMeta } from '@donotdev/core';
import { useParams } from '@donotdev/ui';

export const NAMESPACE = 'car';

export const meta: PageMeta = {
    namespace: NAMESPACE,
    route: '/cars/:id',
    auth: { required: true, role: 'admin' },
    hideFromMenu: true,  // Don't show in nav
};

export default function CarPage() {
    const { t } = useTranslation(NAMESPACE);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const { get, add, update, error } = useCrud(carEntity);
    const [data, setData] = useState<any>(null);

    // Fetch existing data for edit mode
    useEffect(() => {
        if (!isNew && id) {
            get(id).then(setData);
        }
    }, [id, isNew, get]);

    const handleSubmit = async (formData: any) => {
        if (isNew) {
            add(formData);
        } else if (id) {
            update(id, formData);
        }
        navigate('/cars');
    };

    // Error state
    if (!isNew && error) {
        return (
            <PageContainer>
                <Section title="Error">
                    <Alert variant="error" description="Failed to load data" />
                    <Link path="/cars">
                        <Button variant="outline">Back to list</Button>
                    </Link>
                </Section>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Section title={isNew ? 'Create Car' : 'Edit Car'}>
                {isNew ? (
                    <EntityFormRenderer
                        entity={carEntity}
                        operation="create"
                        onSubmit={handleSubmit}
                        defaultValues={{ status: 'draft' }}
                        submitText="Create"
                    />
                ) : (
                    <EntityFormRenderer
                        entity={carEntity}
                        operation="edit"
                        onSubmit={handleSubmit}
                        defaultValues={data}
                        submitText="Update"
                    />
                )}
            </Section>
        </PageContainer>
    );
}
```

**Key patterns:**
- Route: `/[collection]/:id` where `id` can be "new"
- `hideFromMenu: true` - form pages don't show in nav
- Check `isNew` to determine create vs edit
- Don't mount form until data loaded (edit mode)
- Optimistic: navigate immediately, don't await

---

## Landing/Home

**Marketing page with hero, features, CTA.**

```tsx
import { PageContainer, useNavigate } from '@donotdev/ui';
import { HeroSection, Section, CallToAction, Card, Grid, Button } from '@donotdev/components';
import type { PageMeta } from '@donotdev/core';
import { Home } from 'lucide-react';

export const NAMESPACE = 'home';

export const meta: PageMeta = {
    namespace: NAMESPACE,
    icon: <Home />,
    // No auth - public page
};

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <PageContainer>
            {/* Hero with background image — bleed for full-viewport-width */}
            <HeroSection
                bleed
                backgroundImage="/images/hero.jpg"
                title="Your App Name"
                subtitle="One-line value proposition"
                fullHeight
            >
                <Button onClick={() => navigate('/signup')}>Get Started</Button>
                <Button variant="outline" onClick={() => navigate('/about')}>Learn More</Button>
            </HeroSection>

            <Section title="Features">
                <Grid cols={[1, 2, 3, 3]} gap="large">
                    <Card
                        title="Feature One"
                        content="Brief description of the feature and its benefit."
                    />
                    <Card
                        title="Feature Two"
                        content="Brief description of the feature and its benefit."
                    />
                    <Card
                        title="Feature Three"
                        content="Brief description of the feature and its benefit."
                    />
                </Grid>
            </Section>

            <Section title="How It Works">
                <Grid cols={[1, 1, 3, 3]}>
                    <Card title="1. Sign Up" content="Create your account in seconds." />
                    <Card title="2. Configure" content="Set up your preferences." />
                    <Card title="3. Launch" content="Start using immediately." />
                </Grid>
            </Section>

            {/* Full-width CTA with background image */}
            <CallToAction
                bleed
                backgroundImage="/images/cta-bg.jpg"
                title="Ready to get started?"
                subtitle="Start your free trial today"
                primaryAction={<Button onClick={() => navigate('/signup')}>Start Free Trial</Button>}
            />
        </PageContainer>
    );
}
```

**Key patterns:**
- `HeroSection bleed backgroundImage` at top for immersive hero banner
- Feature grid with `Card` components
- `CallToAction bleed backgroundImage` for full-width CTA with image
- `Section bleed` for any full-width content (galleries, maps, videos)
- HARDCODE strings first, i18n later

---

## Pricing

**Plan comparison page.**

```tsx
import { PageContainer, useNavigate } from '@donotdev/ui';
import { Section, PricingTable } from '@donotdev/components';
import type { PageMeta } from '@donotdev/core';
import { DollarSign } from 'lucide-react';

export const NAMESPACE = 'pricing';

export const meta: PageMeta = {
    namespace: NAMESPACE,
    icon: <DollarSign />,
};

export default function PricingPage() {
    const navigate = useNavigate();

    const plans = [
        {
            name: 'Free',
            price: 0,
            period: 'forever',
            features: ['5 projects', 'Basic support', 'Community access'],
            cta: { label: 'Get Started', onClick: () => navigate('/signup') },
        },
        {
            name: 'Pro',
            price: 29,
            period: 'month',
            features: ['Unlimited projects', 'Priority support', 'Advanced analytics'],
            cta: { label: 'Start Trial', onClick: () => navigate('/signup?plan=pro') },
            highlighted: true,
        },
        {
            name: 'Enterprise',
            price: 99,
            period: 'month',
            features: ['Everything in Pro', 'Dedicated support', 'Custom integrations'],
            cta: { label: 'Contact Sales', onClick: () => navigate('/contact') },
        },
    ];

    return (
        <PageContainer>
            <Section title="Choose Your Plan" textAlign="center">
                <PricingTable plans={plans} />
            </Section>
        </PageContainer>
    );
}
```

---

## Settings

**User preferences with grouped sections.**

```tsx
import { PageContainer } from '@donotdev/ui';
import { Section, Card, Stack, Switch, Select, Button } from '@donotdev/components';
import type { PageMeta } from '@donotdev/core';
import { Settings as SettingsIcon } from 'lucide-react';

export const NAMESPACE = 'settings';

export const meta: PageMeta = {
    namespace: NAMESPACE,
    icon: <SettingsIcon />,
    auth: { required: true },
};

export default function SettingsPage() {
    return (
        <PageContainer>
            <Section title="Appearance">
                <Card>
                    <Stack direction="row" justify="between" align="center">
                        <Text>Theme</Text>
                        <Select
                            options={[
                                { value: 'light', label: 'Light' },
                                { value: 'dark', label: 'Dark' },
                                { value: 'system', label: 'System' },
                            ]}
                            defaultValue="system"
                        />
                    </Stack>
                </Card>
            </Section>

            <Section title="Notifications">
                <Card>
                    <Stack direction="column">
                        <Stack direction="row" justify="between" align="center">
                            <Text>Email notifications</Text>
                            <Switch defaultChecked />
                        </Stack>
                        <Stack direction="row" justify="between" align="center">
                            <Text>Push notifications</Text>
                            <Switch />
                        </Stack>
                    </Stack>
                </Card>
            </Section>

            <Section title="Danger Zone">
                <Card variant="destructive">
                    <Stack direction="row" justify="between" align="center">
                        <Text>Delete account</Text>
                        <Button variant="destructive">Delete</Button>
                    </Stack>
                </Card>
            </Section>
        </PageContainer>
    );
}
```

---

## Profile

**User profile display with edit.**

```tsx
import { PageContainer } from '@donotdev/ui';
import { Section, Card, Stack, Text, Avatar, Button } from '@donotdev/components';
import { useAuth } from '@donotdev/auth';
import type { PageMeta } from '@donotdev/core';
import { User } from 'lucide-react';

export const NAMESPACE = 'profile';

export const meta: PageMeta = {
    namespace: NAMESPACE,
    icon: <User />,
    auth: { required: true },
};

export default function ProfilePage() {
    const user = useAuth('user');

    return (
        <PageContainer>
            <Section>
                <Card>
                    <Stack direction="row" gap="large" align="center">
                        <Avatar
                            src={user?.photoURL}
                            fallback={user?.displayName?.[0] || 'U'}
                            size="large"
                        />
                        <Stack direction="column" gap="tight">
                            <Text level="h2">{user?.displayName || 'User'}</Text>
                            <Text variant="muted">{user?.email}</Text>
                        </Stack>
                    </Stack>
                </Card>
            </Section>

            <Section title="Account Details">
                <Card>
                    <Stack direction="column">
                        <Stack direction="row" justify="between">
                            <Text variant="muted">Email</Text>
                            <Text>{user?.email}</Text>
                        </Stack>
                        <Stack direction="row" justify="between">
                            <Text variant="muted">Member since</Text>
                            <Text>{user?.createdAt?.toLocaleDateString()}</Text>
                        </Stack>
                        <Stack direction="row" justify="between">
                            <Text variant="muted">Role</Text>
                            <Text>{user?.role || 'user'}</Text>
                        </Stack>
                    </Stack>
                </Card>
            </Section>

            <Section>
                <Button variant="outline">Edit Profile</Button>
            </Section>
        </PageContainer>
    );
}
```

---

## Detail Page

**Single item display (read-only).**

```tsx
import { useEffect, useState } from 'react';
import { Spinner } from '@donotdev/components';
import { PageContainer, useNavigate } from '@donotdev/ui';
import { Section, Card, Grid, Stack, Text, Button, Badge } from '@donotdev/components';
import { ImageGallery } from '@donotdev/components';
import { useCrud } from '@donotdev/crud';
import { productEntity } from 'entities/product';
import type { PageMeta } from '@donotdev/core';
import { useParams } from '@donotdev/ui';

export const NAMESPACE = 'product-detail';

export const meta: PageMeta = {
    namespace: NAMESPACE,
    route: '/products/:id',
    hideFromMenu: true,
};

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { get } = useCrud(productEntity);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            get(id).then(setProduct).finally(() => setLoading(false));
        }
    }, [id, get]);

    if (loading) return <PageContainer><Spinner overlay /></PageContainer>;
    if (!product) return <PageContainer><Text>Product not found</Text></PageContainer>;

    return (
        <PageContainer>
            {/* Full-width image gallery — bleed breaks out of content constraints */}
            {product.images?.length > 0 && (
                <Section bleed>
                    <ImageGallery images={product.images} />
                </Section>
            )}

            <Section>
                <Grid cols={[1, 1, 2, 2]} gap="large">
                    {/* Details */}
                    <Stack direction="column">
                        <Text level="h1">{product.name}</Text>
                        <Badge>{product.category}</Badge>
                        <Text level="h2">${product.price}</Text>
                        <Text>{product.description}</Text>
                        <Button onClick={() => navigate(`/admin/products/${id}`)}>
                            Edit
                        </Button>
                    </Stack>
                </Grid>
            </Section>
        </PageContainer>
    );
}
```

---

## Analytics

**Charts and metrics display.**

```tsx
import { useEffect, useState } from 'react';
import { Spinner } from '@donotdev/components';
import { PageContainer } from '@donotdev/ui';
import { Section, Card, Grid, Stack, Text } from '@donotdev/components';
import type { PageMeta } from '@donotdev/core';
import { TrendingUp } from 'lucide-react';

export const NAMESPACE = 'analytics';

export const meta: PageMeta = {
    namespace: NAMESPACE,
    icon: <TrendingUp />,
    auth: { required: true, role: 'admin' },
};

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics().then(setData).finally(() => setLoading(false));
    }, []);

    if (loading) return <PageContainer><Spinner overlay /></PageContainer>;

    return (
        <PageContainer>
            {/* Summary Cards */}
            <Section gridCols={[2, 4, 4, 4]}>
                <Card variant="glass">
                    <Stack direction="column" gap="tight">
                        <Text variant="muted">Total Revenue</Text>
                        <Text level="h2">${data?.revenue?.toLocaleString()}</Text>
                    </Stack>
                </Card>
                <Card variant="glass">
                    <Stack direction="column" gap="tight">
                        <Text variant="muted">Orders</Text>
                        <Text level="h2">{data?.orders}</Text>
                    </Stack>
                </Card>
                {/* More cards... */}
            </Section>

            {/* Charts */}
            <Section title="Revenue Over Time">
                <Card>
                    {/* Your chart component here */}
                    <div style={{ height: 300 }}>Chart placeholder</div>
                </Card>
            </Section>

            <Section title="Top Products" gridCols={[1, 2, 2, 2]}>
                {data?.topProducts?.map((product: any) => (
                    <Card key={product.id}>
                        <Stack direction="row" justify="between">
                            <Text>{product.name}</Text>
                            <Text level="h4">{product.sales} sales</Text>
                        </Stack>
                    </Card>
                ))}
            </Section>
        </PageContainer>
    );
}
```

---

## PageMeta Reference

Every page exports `meta: PageMeta`:

```tsx
export const meta: PageMeta = {
    namespace: 'page-name',        // i18n namespace, required
    icon: <IconComponent />,       // lucide-react icon, shown in nav

    // Auth options
    auth: true,                    // Requires login
    auth: { required: true },      // Same as above
    auth: { required: true, role: 'admin' },  // Requires specific role

    // Route options
    route: '/custom-path',         // Override auto-generated route
    route: '/items/:id',           // Dynamic route

    // Navigation options
    hideFromMenu: true,            // Don't show in sidebar/nav
};
```

---

## Full-Width Bleed (Breakthrough)

**When content needs to span the full viewport width**, use the `bleed` prop on Section, HeroSection, or CallToAction. This breaks out of `PageContainer` content constraints — no manual CSS needed.

```tsx
// Image gallery spanning full width (real estate, car listings, etc.)
<Section bleed>
  <ImageGallery images={listing.images} />
</Section>

// Hero banner with background image
<HeroSection bleed backgroundImage="/hero.jpg" title="Welcome" fullHeight>
  <Button>Get Started</Button>
</HeroSection>

// CTA with background image
<CallToAction bleed backgroundImage="/cta.jpg" title="Join Us" primaryAction={<Button>Sign Up</Button>} />

// Any content — map, video, testimonial wall
<Section bleed>
  <MyMapComponent />
</Section>
```

**How it works:** CSS `width: 100vw; margin-inline: calc(50% - 50vw)` — works at any nesting depth.

**`backgroundImage` prop** (HeroSection, CallToAction only): Adds a cover image with a dark gradient overlay (`::before` pseudo-element) so text remains readable. Text automatically turns white.

---

## Usage

1. **Find pattern** that matches your page type
2. **Copy** the page component
3. **Customize** content, entity, routes
4. **Update** PageMeta for auth/nav requirements
5. **HARDCODE** strings first, i18n later

**Do NOT invent new page structures unless none fit.**
