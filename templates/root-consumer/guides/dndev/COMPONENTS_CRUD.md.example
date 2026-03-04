# CRUD Package Reference

**Import:** `@donotdev/crud`

---

## Hooks

### useCrud
Single document CRUD actions (add, update, delete, get, subscribe).

```tsx
const { add, update, delete: remove, get, data, loading, error } = useCrud(carEntity);
await add({ name: 'Tesla', year: 2024 });
await remove('doc-id');
```

### useCrudList
Paginated list with automatic loading. For data tables.

```tsx
const { items, loading, refresh } = useCrudList(productEntity);
```

### useCrudCardList  
Card-based list with infinite scroll.

```tsx
const { items, loading, refresh } = useCrudCardList(articleEntity);
```

---

## Form Components

### EntityFormRenderer
Auto-render full entity form from definition.

```tsx
<EntityFormRenderer
  entity={productEntity}
  operation="create"
  onSubmit={handleSubmit}
/>
```

### FormFieldRenderer
Render single field. Used inside custom forms.

```tsx
<FormFieldRenderer field={field} control={form.control} />
```

### EntityList
Data table for entity collection.

```tsx
<EntityList entity={userEntity} onRowClick={(user) => edit(user.id)} />
```

### EntityCardList
Card grid for entity collection.

```tsx
<EntityCardList entity={productEntity} renderCard={(item) => <ProductCard {...item} />} />
```

---

## Form Building Blocks

For custom forms, use these low-level utilities:

```tsx
import { useEntityForm, getFieldsForOperation, validateEntity } from '@donotdev/crud';

const { register, handleSubmit, fields, formState } = useEntityForm(productEntity, { 
  operation: 'create' 
});
```

| Export | Purpose |
|--------|---------|
| `useEntityForm` | React Hook Form wrapper for entities |
| `useEntityField` | Single field hook |
| `getFieldsForOperation` | Get editable fields for create/edit |
| `validateEntity` | Validate data against entity schema |
| `isFieldEditable` | Check if field is editable |

---

## Field Types (Built-in)

Field components are auto-rendered by `FormFieldRenderer`. You don't import them directly.

### Text Inputs
- `text` - Single-line text input
- `email` - Email input with validation
- `tel` - Phone number input
- `url` - URL input
- `color` - Color picker
- `password` - Password input (masked)
- `textarea` - Multi-line text input
- `richtext` - Rich text editor

### Numbers
- `number` - Numeric input
- `range` - Slider input
- `rating` - Star rating input (1–5, configurable max)

**Rating + comment (e.g. reviews):** Use two fields on the same entity — `rating` (type `rating`) for stars and `comment` (type `textarea`) for the text. The form renders them as separate rows; no composite field type needed.

### Boolean
- `checkbox` - Checkbox input
- `boolean` - Alias for checkbox
- `switch` - Toggle switch

### Dates & Time
- `date` - Date picker
- `datetime-local` - Date and time picker
- `time` - Time picker
- `week` - Week picker
- `month` - Month picker
- `timestamp` - Timestamp (Firestore Timestamp)

### Selection
- `select` - Dropdown select
- `combobox` - Searchable dropdown
- `multiselect` - Multiple selection dropdown
- `radio` - Radio button group

### Files & Media
- `file` - Single file upload
- `files` - Multiple file uploads
- `document` - Document upload (PDF, etc.)
- `documents` - Multiple document uploads
- `image` - Single image upload
- `images` - Multiple image uploads

### Complex Types
- `geopoint` - Geographic coordinates (lat/lng)
- `address` - Address input with autocomplete
- `map` - Map picker
- `array` - Array of text inputs

### Special
- `avatar` - Avatar image upload
- `badge` - Badge display
- `hidden` - Hidden field (not displayed)
- `submit` - Submit button (uncontrolled)
- `reset` - Reset button (uncontrolled)

To add custom field types:
```tsx
import { useController, registerFieldType } from '@donotdev/crud';
import type { ControlledFieldProps } from '@donotdev/crud';

// Custom controlled component MUST use framework's useController (not react-hook-form's)
function ScoreField({
  fieldConfig,
  control,
  errors,
  t,
  onChange
}: ControlledFieldProps) {
  // REQUIRED: Use framework's useController - ensures type compatibility
  const { field, fieldState } = useController({
    name: fieldConfig.name,
    control: control,
  });

  return (
    <div>
      <label>{t(fieldConfig.label)}</label>
      {/* Use field.value and field.onChange */}
      <input
        type="number"
        value={field.value ?? 0}
        onChange={(e) => {
          const value = Number(e.target.value);
          field.onChange(value);
          onChange?.(value);
        }}
        min={0}
        max={10}
      />
      {fieldState?.error && (
        <span className="error">{fieldState.error.message}</span>
      )}
    </div>
  );
}

registerFieldType({
  type: 'score',
  controlledComponent: ScoreField,
});
```

**Important:** 
- Custom controlled components receive `control` prop, NOT `field` prop
- You must use **framework's `useController`** (from `@donotdev/crud`), NOT `react-hook-form`'s useController
- This ensures type compatibility - no type assertions needed

---

## Service & Store

Direct access (rarely needed):

```tsx
import { getCrudService, useCrudStore } from '@donotdev/crud';

const service = getCrudService();
await service.query('products', { where: [['active', '==', true]] });
```

---

## Collection Utilities

```tsx
import { loadDeterministicRange, upsertDeterministic, appendToCollection } from '@donotdev/crud';
```

| Utility | Purpose |
|---------|---------|
| `loadDeterministicRange` | Paginated loading with deterministic IDs |
| `upsertDeterministic` | Insert or update with deterministic ID |
| `appendToCollection` | Add to collection end |

---

**JSDoc in IDE** - Hover over any import for full props and examples.
