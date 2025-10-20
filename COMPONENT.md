# Packed Form Component Documentation

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Field Types](#field-types)
- [Examples](#examples)
- [Validation](#validation)
- [Customization](#customization)

## Overview

The Packed Form component is a declarative form builder that combines the power of React Hook Form and Zod validation with the beautiful UI components from shadcn/ui. It allows you to define forms using a simple JSON-like structure, and handles all the complexity of form state management, validation, and styling.

## Architecture

The component is built using an object-oriented architecture:

```
packed-form/
├── form.tsx              # Main form component
├── types/
│   ├── base.ts          # Base field type definitions
│   └── form.ts          # Form definition types
├── fields/
│   ├── base.tsx         # Base field class
│   ├── string.tsx       # String field implementation
│   ├── email.tsx        # Email field implementation
│   ├── password.tsx     # Password field implementation
│   ├── int.tsx          # Integer field implementation
│   ├── float.tsx        # Float field implementation
│   └── text.tsx         # Text (textarea) field implementation
├── utils/
│   └── validation.ts    # Field validation utilities
└── examples/
    └── contact-form.tsx # Example implementation
```

## Installation

### Prerequisites

Ensure you have the following shadcn/ui components installed:

- button
- input
- textarea
- label

### Install the Component

```bash
npx shadcn@latest add https://riccardotornesello.github.io/shadcn-registry/r/packed-form.json
```

This will install:
- The main Form component
- All field types
- Type definitions
- Validation utilities

## Quick Start

1. Define your form structure:

```tsx
import { FormDefinition } from "@/components/packed-form/types/form";

const loginFormDefinition: FormDefinition = {
  email: {
    type: "email",
    label: "Email Address",
  },
  password: {
    type: "password",
    label: "Password",
    options: {
      minLength: 8,
    },
  },
};
```

2. Use the Form component:

```tsx
import { Form } from "@/components/packed-form/form";

export function LoginForm() {
  return <Form formDefinition={loginFormDefinition} />;
}
```

That's it! The form will automatically handle validation, error messages, and styling.

## API Reference

### Form Component

**Props:**

- `formDefinition` (FormDefinition): Required. Object defining the form structure.

### FormDefinition Type

```typescript
type FormDefinition = Record<string, FieldDefinition>;
```

A `FormDefinition` is an object where:
- **Keys**: Field names (used as form field names)
- **Values**: Field definitions (see Field Types below)

### BaseFieldDefinition

All field types extend this base interface:

```typescript
interface BaseFieldDefinition {
  type: FieldType;
  label: string;
  optional?: boolean;
}
```

## Field Types

### 1. String Field

Single-line text input.

**Type:** `"string"`

**Options:**
```typescript
{
  minLength?: number;
  maxLength?: number;
}
```

**Example:**
```typescript
username: {
  type: "string",
  label: "Username",
  options: {
    minLength: 3,
    maxLength: 20,
  },
}
```

### 2. Email Field

Email input with automatic email validation.

**Type:** `"email"`

**Options:**
```typescript
{
  minLength?: number;
  maxLength?: number;
}
```

**Example:**
```typescript
email: {
  type: "email",
  label: "Email Address",
}
```

### 3. Password Field

Password input (masked text).

**Type:** `"password"`

**Options:**
```typescript
{
  minLength?: number;
  maxLength?: number;
}
```

**Example:**
```typescript
password: {
  type: "password",
  label: "Password",
  options: {
    minLength: 8,
    maxLength: 128,
  },
}
```

### 4. Integer Field

Number input that only accepts integers.

**Type:** `"int"`

**Options:**
```typescript
{
  min?: number;
  max?: number;
}
```

**Example:**
```typescript
age: {
  type: "int",
  label: "Age",
  options: {
    min: 18,
    max: 120,
  },
}
```

### 5. Float Field

Number input that accepts decimal numbers.

**Type:** `"float"`

**Options:**
```typescript
{
  min?: number;
  max?: number;
}
```

**Example:**
```typescript
price: {
  type: "float",
  label: "Price",
  options: {
    min: 0.01,
    max: 999999.99,
  },
}
```

### 6. Text Field

Multi-line textarea input.

**Type:** `"text"`

**Options:**
```typescript
{
  minLength?: number;
  maxLength?: number;
}
```

**Example:**
```typescript
description: {
  type: "text",
  label: "Description",
  options: {
    minLength: 10,
    maxLength: 1000,
  },
}
```

## Examples

### Contact Form

```tsx
const contactFormDefinition: FormDefinition = {
  name: {
    type: "string",
    label: "Full Name",
    options: {
      minLength: 2,
      maxLength: 100,
    },
  },
  email: {
    type: "email",
    label: "Email Address",
  },
  phone: {
    type: "string",
    label: "Phone Number",
    optional: true,
  },
  message: {
    type: "text",
    label: "Message",
    options: {
      minLength: 10,
      maxLength: 500,
    },
  },
};
```

### User Registration Form

```tsx
const registrationFormDefinition: FormDefinition = {
  username: {
    type: "string",
    label: "Username",
    options: {
      minLength: 3,
      maxLength: 20,
    },
  },
  email: {
    type: "email",
    label: "Email",
  },
  password: {
    type: "password",
    label: "Password",
    options: {
      minLength: 8,
    },
  },
  age: {
    type: "int",
    label: "Age",
    options: {
      min: 13,
    },
  },
};
```

### Product Listing Form

```tsx
const productFormDefinition: FormDefinition = {
  title: {
    type: "string",
    label: "Product Title",
    options: {
      minLength: 5,
      maxLength: 100,
    },
  },
  price: {
    type: "float",
    label: "Price ($)",
    options: {
      min: 0.01,
    },
  },
  quantity: {
    type: "int",
    label: "Quantity",
    options: {
      min: 1,
    },
  },
  description: {
    type: "text",
    label: "Description",
    options: {
      minLength: 20,
      maxLength: 2000,
    },
  },
};
```

## Validation

The component uses Zod for validation. Validation rules are automatically applied based on:

1. **Field Type**: Email fields validate email format, integers validate whole numbers, etc.
2. **Options**: Min/max length for strings, min/max values for numbers
3. **Optional Flag**: Fields are required by default unless `optional: true` is set

### Validation Messages

The component provides user-friendly validation messages:

- String length: "String must contain at least X character(s)"
- Email format: "Invalid email"
- Number range: "Number must be greater than or equal to X"
- Required fields: Automatically validated

### Custom Validation

To add custom validation, you can extend the field classes or modify the validation utilities in `utils/validation.ts`.

## Customization

### Styling

The component uses shadcn/ui components, which can be customized through your Tailwind configuration and CSS variables. Modify your `globals.css` to change colors, spacing, and other styles.

### Custom Field Types

To add custom field types:

1. Create a new field class extending `BaseField`
2. Implement `getValidator()` for Zod validation
3. Implement `render()` for the field UI
4. Add the field type to `types/base.ts` and `types/form.ts`
5. Register the field in `utils/validation.ts`

Example:

```tsx
// fields/url.tsx
import { z } from "zod";
import { BaseFieldDefinition } from "../types/base";
import { BaseField } from "./base";

export interface UrlFieldDefinition extends BaseFieldDefinition {
  type: "url";
}

export class UrlField extends BaseField<UrlFieldDefinition> {
  getValidator() {
    return z.string().url();
  }

  render({ field }: { field: ControllerRenderProps }) {
    return (
      <FormItem>
        <FormLabel>{this.definition.label}</FormLabel>
        <FormControl>
          <Input {...field} type="url" placeholder="https://" />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
}
```

### Form Submission

The current implementation logs form data to the console. To customize submission behavior, modify the `onSubmit` function in `form.tsx`:

```tsx
const onSubmit = (data: z.infer<typeof formSchema>) => {
  // Your custom logic here
  console.log("Form Data:", data);
  
  // Example: Send to API
  // await fetch('/api/submit', {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // });
};
```

## TypeScript Support

The component is fully typed. TypeScript will provide autocomplete and type checking for:

- Field types
- Field options
- Form definitions

Example with type inference:

```tsx
import type { FormDefinition } from "@/components/packed-form/types/form";

const myForm: FormDefinition = {
  // TypeScript will validate this structure
  field1: {
    type: "string", // Autocomplete available
    label: "Field 1",
    options: {
      // Options specific to string type
    },
  },
};
```

## Browser Support

The component works in all modern browsers that support:
- ES6+ features
- React 18+
- Next.js 15+

## Contributing

To contribute to this component or report issues, visit the [GitHub repository](https://github.com/riccardotornesello/shadcn-registry).

## License

This component is open source and follows the same license as shadcn/ui.
