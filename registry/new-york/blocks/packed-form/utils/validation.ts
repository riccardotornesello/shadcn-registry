import { z } from "zod";
import { FieldDefinition, FormDefinition } from "../types/form";
import { FieldType } from "../types/base";
import { BaseField } from "../fields/base";
import { EmailField } from "../fields/email";
import { FloatField } from "../fields/float";
import { IntField } from "../fields/int";
import { PasswordField } from "../fields/password";
import { StringField } from "../fields/string";
import { TextField } from "../fields/text";

// TODO: type-safe mapping
const fieldsMap: Record<FieldType, any> = {
  email: EmailField,
  float: FloatField,
  int: IntField,
  password: PasswordField,
  string: StringField,
  text: TextField,
} as const;

export function getField(fieldDefinition: FieldDefinition): BaseField {
  const FieldClass = fieldsMap[fieldDefinition.type];

  if (!FieldClass) {
    throw new Error(`Unsupported field type: ${fieldDefinition.type}`);
  }

  return new FieldClass(fieldDefinition);
}

export function getFields(
  formDefinition: FormDefinition
): Record<string, BaseField> {
  return Object.entries(formDefinition).reduce(
    (acc, [fieldName, fieldDefinition]) => {
      acc[fieldName] = getField(fieldDefinition);
      return acc;
    },
    {} as Record<string, BaseField>
  );
}

export function getFieldValidator(fields: Record<string, BaseField>) {
  const shape = Object.entries(fields).reduce(
    (acc, [fieldName, field]) => {
      acc[fieldName] = field.getValidator();
      return acc;
    },
    {} as Record<string, z.ZodType>
  );

  return z.object(shape);
}
