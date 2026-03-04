# Entity Pattern Catalog

> **Don't invent schemas. Copy patterns, customize fields.**

---

## Pattern Index

| Pattern | Use For | Key Fields |
|---------|---------|------------|
| [UserProfile](#userprofile) | Extended user data | displayName, avatar, bio, preferences |
| [Post/Article](#postarticle) | Content with author | title, content, author, publishedAt |
| [Product](#product) | E-commerce items | name, price, images, category, stock |
| [Order](#order) | Purchases/transactions | userId, items, total, status |
| [Review](#review) | User feedback | entityId, userId, rating, comment |
| [Comment](#comment) | Threaded discussions | parentId, content, userId |
| [Category/Tag](#categorytag) | Classification | name, slug, parent |
| [Settings](#settings) | User preferences | userId, theme, notifications, locale |
| [Workspace/Team](#workspaceteam) | Multi-tenant | name, ownerId, members |
| [Invitation](#invitation) | Invite flows | email, role, expiresAt |
| [Media](#media) | File library | url, type, size, uploadedBy |
| [Log/Activity](#logactivity) | Audit trail | action, userId, entityId, timestamp |

---

## UserProfile

**Extends auth user with app-specific data.**

```typescript
export const userProfileEntity = defineEntity({
  name: 'UserProfile',
  collection: 'userProfiles',
  fields: {
    // Link to auth user (same ID)
    userId: {
      name: 'userId',
      label: 'userId',
      type: 'text',
      visibility: 'hidden',
    },
    displayName: {
      name: 'displayName',
      label: 'displayName',
      type: 'text',
      visibility: 'guest',
      validation: { required: true, maxLength: 50 },
    },
    avatar: {
      name: 'avatar',
      label: 'avatar',
      type: 'avatar',
      visibility: 'guest',
    },
    bio: {
      name: 'bio',
      label: 'bio',
      type: 'textarea',
      visibility: 'guest',
      validation: { maxLength: 500 },
    },
    // Private fields
    email: {
      name: 'email',
      label: 'email',
      type: 'email',
      visibility: 'owner',
      editable: 'never',
    },
    role: {
      name: 'role',
      label: 'role',
      type: 'select',
      visibility: 'admin',
      editable: 'admin',
      validation: {
        options: [
          { value: 'user', label: 'User' },
          { value: 'admin', label: 'Admin' },
        ],
      },
    },
  },
  access: {
    create: 'user',  // Created on signup
    read: 'guest',   // Public profiles
    update: 'owner', // Users edit own profile
    delete: 'admin',
  },
});
```

---

## Post/Article

**Content with author, dates, status.**

```typescript
export const postEntity = defineEntity({
  name: 'Post',
  collection: 'posts',
  fields: {
    title: {
      name: 'title',
      label: 'title',
      type: 'text',
      visibility: 'guest',
      validation: { required: true, maxLength: 200 },
    },
    slug: {
      name: 'slug',
      label: 'slug',
      type: 'text',
      visibility: 'guest',
      validation: { required: true, pattern: /^[a-z0-9-]+$/ },
    },
    excerpt: {
      name: 'excerpt',
      label: 'excerpt',
      type: 'textarea',
      visibility: 'guest',
      validation: { maxLength: 300 },
    },
    content: {
      name: 'content',
      label: 'content',
      type: 'richtext',
      visibility: 'guest',
      validation: { required: true },
    },
    featuredImage: {
      name: 'featuredImage',
      label: 'featuredImage',
      type: 'image',
      visibility: 'guest',
    },
    authorId: {
      name: 'authorId',
      label: 'authorId',
      type: 'text',
      visibility: 'guest',
      editable: 'never',
    },
    category: {
      name: 'category',
      label: 'category',
      type: 'select',
      visibility: 'guest',
      validation: {
        options: [
          { value: 'news', label: 'News' },
          { value: 'tutorial', label: 'Tutorial' },
          { value: 'announcement', label: 'Announcement' },
        ],
      },
    },
    tags: {
      name: 'tags',
      label: 'tags',
      type: 'array',
      visibility: 'guest',
    },
    publishedAt: {
      name: 'publishedAt',
      label: 'publishedAt',
      type: 'timestamp',
      visibility: 'guest',
    },
  },
  access: {
    create: 'admin',
    read: 'guest',
    update: 'admin',
    delete: 'admin',
  },
});
```

---

## Product

**E-commerce item with pricing and inventory.**

```typescript
export const productEntity = defineEntity({
  name: 'Product',
  collection: 'products',
  fields: {
    name: {
      name: 'name',
      label: 'name',
      type: 'text',
      visibility: 'guest',
      validation: { required: true },
    },
    description: {
      name: 'description',
      label: 'description',
      type: 'richtext',
      visibility: 'guest',
    },
    price: {
      name: 'price',
      label: 'price',
      type: 'number',
      visibility: 'guest',
      validation: { required: true, min: 0 },
    },
    compareAtPrice: {
      name: 'compareAtPrice',
      label: 'compareAtPrice',
      type: 'number',
      visibility: 'guest',
    },
    images: {
      name: 'images',
      label: 'images',
      type: 'images',
      visibility: 'guest',
    },
    category: {
      name: 'category',
      label: 'category',
      type: 'combobox',
      visibility: 'guest',
      validation: { required: true },
    },
    sku: {
      name: 'sku',
      label: 'sku',
      type: 'text',
      visibility: 'admin',
    },
    stock: {
      name: 'stock',
      label: 'stock',
      type: 'number',
      visibility: 'admin',
      validation: { min: 0 },
    },
    isActive: {
      name: 'isActive',
      label: 'isActive',
      type: 'switch',
      visibility: 'admin',
    },
  },
  access: {
    create: 'admin',
    read: 'guest',
    update: 'admin',
    delete: 'admin',
  },
});
```

---

## Order

**Purchase transaction with line items.**

```typescript
export const orderEntity = defineEntity({
  name: 'Order',
  collection: 'orders',
  fields: {
    userId: {
      name: 'userId',
      label: 'userId',
      type: 'text',
      visibility: 'admin',
      editable: 'never',
    },
    items: {
      name: 'items',
      label: 'items',
      type: 'text', // Schema override below
      visibility: 'owner',
      validation: {
        schema: v.array(v.object({
          productId: v.string(),
          name: v.string(),
          price: v.number(),
          quantity: v.number(),
        })),
      },
    },
    subtotal: {
      name: 'subtotal',
      label: 'subtotal',
      type: 'number',
      visibility: 'owner',
      editable: 'never',
    },
    tax: {
      name: 'tax',
      label: 'tax',
      type: 'number',
      visibility: 'owner',
      editable: 'never',
    },
    total: {
      name: 'total',
      label: 'total',
      type: 'number',
      visibility: 'owner',
      editable: 'never',
    },
    // status is auto-added with type/visibility/editable locked.
    // Only define validation.options — framework auto-adds [draft, available, deleted].
    status: {
      validation: {
        options: [
          { value: 'pending', label: 'Pending' },
          { value: 'paid', label: 'Paid' },
          { value: 'shipped', label: 'Shipped' },
          { value: 'delivered', label: 'Delivered' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      },
    },
    shippingAddress: {
      name: 'shippingAddress',
      label: 'shippingAddress',
      type: 'address',
      visibility: 'owner',
    },
  },
  access: {
    create: 'user',
    read: 'owner',   // Users see own orders
    update: 'admin', // Only admin updates status
    delete: 'super',
  },
});
```

> **Merged status options:** `[draft, available, deleted, pending, paid, shipped, delivered, cancelled]`. The three defaults are always first and cannot be removed.

---

## Review

**User feedback with rating.**

```typescript
export const reviewEntity = defineEntity({
  name: 'Review',
  collection: 'reviews',
  fields: {
    productId: {
      name: 'productId',
      label: 'productId',
      type: 'text',
      visibility: 'guest',
      editable: 'never',
    },
    userId: {
      name: 'userId',
      label: 'userId',
      type: 'text',
      visibility: 'guest',
      editable: 'never',
    },
    rating: {
      name: 'rating',
      label: 'rating',
      type: 'rating',
      visibility: 'guest',
      validation: { required: true, min: 1, max: 5 },
    },
    title: {
      name: 'title',
      label: 'title',
      type: 'text',
      visibility: 'guest',
      validation: { maxLength: 100 },
    },
    comment: {
      name: 'comment',
      label: 'comment',
      type: 'textarea',
      visibility: 'guest',
      validation: { required: true, maxLength: 1000 },
    },
    isVerifiedPurchase: {
      name: 'isVerifiedPurchase',
      label: 'isVerifiedPurchase',
      type: 'switch',
      visibility: 'guest',
      editable: 'never',
    },
  },
  access: {
    create: 'user',
    read: 'guest',
    update: 'owner',
    delete: 'admin',
  },
});
```

---

## Comment

**Threaded comments with parent reference.**

```typescript
export const commentEntity = defineEntity({
  name: 'Comment',
  collection: 'comments',
  fields: {
    postId: {
      name: 'postId',
      label: 'postId',
      type: 'text',
      visibility: 'guest',
      editable: 'never',
    },
    parentId: {
      name: 'parentId',
      label: 'parentId',
      type: 'text',
      visibility: 'guest',
      editable: 'never',
    },
    userId: {
      name: 'userId',
      label: 'userId',
      type: 'text',
      visibility: 'guest',
      editable: 'never',
    },
    content: {
      name: 'content',
      label: 'content',
      type: 'textarea',
      visibility: 'guest',
      validation: { required: true, maxLength: 2000 },
    },
  },
  access: {
    create: 'user',
    read: 'guest',
    update: 'owner',
    delete: 'admin',
  },
});
```

---

## Category/Tag

**Hierarchical classification.**

```typescript
export const categoryEntity = defineEntity({
  name: 'Category',
  collection: 'categories',
  fields: {
    name: {
      name: 'name',
      label: 'name',
      type: 'text',
      visibility: 'guest',
      validation: { required: true },
    },
    slug: {
      name: 'slug',
      label: 'slug',
      type: 'text',
      visibility: 'guest',
      validation: { required: true },
    },
    parentId: {
      name: 'parentId',
      label: 'parentId',
      type: 'text',
      visibility: 'guest',
    },
    order: {
      name: 'order',
      label: 'order',
      type: 'number',
      visibility: 'admin',
    },
  },
  access: {
    create: 'admin',
    read: 'guest',
    update: 'admin',
    delete: 'admin',
  },
});
```

---

## Settings

**User preferences.**

```typescript
export const settingsEntity = defineEntity({
  name: 'Settings',
  collection: 'settings',
  fields: {
    userId: {
      name: 'userId',
      label: 'userId',
      type: 'text',
      visibility: 'hidden',
      editable: 'never',
    },
    theme: {
      name: 'theme',
      label: 'theme',
      type: 'select',
      visibility: 'owner',
      validation: {
        options: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'system', label: 'System' },
        ],
      },
    },
    locale: {
      name: 'locale',
      label: 'locale',
      type: 'select',
      visibility: 'owner',
      validation: {
        options: [
          { value: 'en', label: 'English' },
          { value: 'fr', label: 'French' },
        ],
      },
    },
    emailNotifications: {
      name: 'emailNotifications',
      label: 'emailNotifications',
      type: 'switch',
      visibility: 'owner',
    },
    pushNotifications: {
      name: 'pushNotifications',
      label: 'pushNotifications',
      type: 'switch',
      visibility: 'owner',
    },
  },
  access: {
    create: 'user',
    read: 'owner',
    update: 'owner',
    delete: 'never',
  },
});
```

---

## Workspace/Team

**Multi-tenant organization.**

```typescript
export const workspaceEntity = defineEntity({
  name: 'Workspace',
  collection: 'workspaces',
  fields: {
    name: {
      name: 'name',
      label: 'name',
      type: 'text',
      visibility: 'user',
      validation: { required: true },
    },
    slug: {
      name: 'slug',
      label: 'slug',
      type: 'text',
      visibility: 'user',
      validation: { required: true },
    },
    ownerId: {
      name: 'ownerId',
      label: 'ownerId',
      type: 'text',
      visibility: 'admin',
      editable: 'never',
    },
    members: {
      name: 'members',
      label: 'members',
      type: 'text',
      visibility: 'user',
      validation: {
        schema: v.array(v.object({
          userId: v.string(),
          role: v.picklist(['owner', 'admin', 'member', 'viewer']),
          joinedAt: v.string(),
        })),
      },
    },
    plan: {
      name: 'plan',
      label: 'plan',
      type: 'select',
      visibility: 'admin',
      validation: {
        options: [
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise' },
        ],
      },
    },
  },
  access: {
    create: 'user',
    read: 'user',    // Workspace-level access control
    update: 'admin', // Workspace admin
    delete: 'super',
  },
});
```

---

## Invitation

**Invite flow with expiry.**

```typescript
export const invitationEntity = defineEntity({
  name: 'Invitation',
  collection: 'invitations',
  fields: {
    email: {
      name: 'email',
      label: 'email',
      type: 'email',
      visibility: 'admin',
      validation: { required: true },
    },
    workspaceId: {
      name: 'workspaceId',
      label: 'workspaceId',
      type: 'text',
      visibility: 'admin',
      editable: 'never',
    },
    role: {
      name: 'role',
      label: 'role',
      type: 'select',
      visibility: 'admin',
      validation: {
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'member', label: 'Member' },
          { value: 'viewer', label: 'Viewer' },
        ],
      },
    },
    invitedBy: {
      name: 'invitedBy',
      label: 'invitedBy',
      type: 'text',
      visibility: 'admin',
      editable: 'never',
    },
    expiresAt: {
      name: 'expiresAt',
      label: 'expiresAt',
      type: 'timestamp',
      visibility: 'admin',
    },
    acceptedAt: {
      name: 'acceptedAt',
      label: 'acceptedAt',
      type: 'timestamp',
      visibility: 'admin',
      editable: 'never',
    },
  },
  access: {
    create: 'admin',
    read: 'admin',
    update: 'never',
    delete: 'admin',
  },
});
```

---

## Media

**File/asset library.**

```typescript
export const mediaEntity = defineEntity({
  name: 'Media',
  collection: 'media',
  fields: {
    name: {
      name: 'name',
      label: 'name',
      type: 'text',
      visibility: 'user',
    },
    url: {
      name: 'url',
      label: 'url',
      type: 'url',
      visibility: 'user',
      editable: 'never',
    },
    type: {
      name: 'type',
      label: 'type',
      type: 'select',
      visibility: 'user',
      editable: 'never',
      validation: {
        options: [
          { value: 'image', label: 'Image' },
          { value: 'video', label: 'Video' },
          { value: 'document', label: 'Document' },
          { value: 'other', label: 'Other' },
        ],
      },
    },
    size: {
      name: 'size',
      label: 'size',
      type: 'number',
      visibility: 'user',
      editable: 'never',
    },
    uploadedBy: {
      name: 'uploadedBy',
      label: 'uploadedBy',
      type: 'text',
      visibility: 'admin',
      editable: 'never',
    },
  },
  access: {
    create: 'user',
    read: 'user',
    update: 'owner',
    delete: 'owner',
  },
});
```

---

## Log/Activity

**Audit trail.**

```typescript
export const activityLogEntity = defineEntity({
  name: 'ActivityLog',
  collection: 'activityLogs',
  fields: {
    action: {
      name: 'action',
      label: 'action',
      type: 'text',
      visibility: 'admin',
      editable: 'never',
    },
    entityType: {
      name: 'entityType',
      label: 'entityType',
      type: 'text',
      visibility: 'admin',
      editable: 'never',
    },
    entityId: {
      name: 'entityId',
      label: 'entityId',
      type: 'text',
      visibility: 'admin',
      editable: 'never',
    },
    userId: {
      name: 'userId',
      label: 'userId',
      type: 'text',
      visibility: 'admin',
      editable: 'never',
    },
    changes: {
      name: 'changes',
      label: 'changes',
      type: 'text',
      visibility: 'admin',
      editable: 'never',
    },
    ip: {
      name: 'ip',
      label: 'ip',
      type: 'text',
      visibility: 'super',
      editable: 'never',
    },
  },
  access: {
    create: 'never', // System-generated only
    read: 'admin',
    update: 'never',
    delete: 'super',
  },
});
```

---

## Usage

1. **Find pattern** that matches your need
2. **Copy** the entity definition
3. **Customize** field names, labels, options
4. **Adjust** access rules for your use case
5. **Export** from `entities/index.ts`

**Do NOT invent new patterns unless none fit.**
