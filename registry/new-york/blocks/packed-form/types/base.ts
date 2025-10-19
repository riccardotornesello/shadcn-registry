export type FieldType =
  | "email"
  | "float"
  | "int"
  | "password"
  | "string"
  | "text";

export interface BaseFieldDefinition {
  type: FieldType;
  label: string;
  optional?: boolean;
}
