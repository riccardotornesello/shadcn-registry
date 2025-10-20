# Packed Form Registry

A custom shadcn registry for the **Packed Form** component - a powerful form builder that automatically handles validation and styling using Zod and React Hook Form.

## Overview

The Packed Form component provides a declarative way to build forms with automatic validation and consistent styling. Simply define your form structure, and the component handles the rest.

## Features

- ✅ **Declarative API**: Define forms using simple JSON-like structures
- ✅ **Automatic Validation**: Built-in Zod validation for all field types
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Multiple Field Types**: String, Email, Password, Int, Float, Text (textarea)
- ✅ **Customizable**: Supports min/max length, min/max values, and optional fields
- ✅ **Consistent Styling**: Uses shadcn/ui components for a cohesive look

## Installation

Install the component using the shadcn CLI:

```bash
npx shadcn@latest add https://riccardotornesello.github.io/shadcn-registry/r/packed-form.json
```

## Available Field Types

- **string**: Single-line text input
- **email**: Email input with automatic email validation
- **password**: Password input
- **int**: Integer number input with automatic coercion
- **float**: Float number input with automatic coercion
- **text**: Multi-line textarea

## Usage Example

```tsx
import { Form } from "@/components/packed-form/form";
import { FormDefinition } from "@/components/packed-form/types/form";

const contactFormDefinition: FormDefinition = {
  name: {
    type: "string",
    label: "Name",
    options: {
      minLength: 2,
      maxLength: 50,
    },
  },
  email: {
    type: "email",
    label: "Email",
  },
  age: {
    type: "int",
    label: "Age",
    optional: true,
    options: {
      min: 18,
      max: 120,
    },
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

export function ContactForm() {
  return <Form formDefinition={contactFormDefinition} />;
}
```

## Field Options

### String Fields
- `minLength`: Minimum string length
- `maxLength`: Maximum string length

### Number Fields (int, float)
- `min`: Minimum value
- `max`: Maximum value

### All Fields
- `optional`: Whether the field is optional (default: false)

## Demo

Visit the [live demo](https://riccardotornesello.github.io/shadcn-registry) to see the component in action.

## Registry Information

This is a custom shadcn registry built using Next.js:

- The registry uses a `registry.json` file to define components and their files
- Registry items are served as static files under `public/r/[name].json`
- All registry items are compatible with the `shadcn` CLI
- Includes v0 integration using the "Open in v0" API

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) for more information about custom registries.
