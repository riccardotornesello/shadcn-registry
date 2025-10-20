"use client"

import { Form } from "../form";
import { FormDefinition } from "../types/form";

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

export function ContactFormExample() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Form formDefinition={contactFormDefinition} />
    </div>
  );
}
