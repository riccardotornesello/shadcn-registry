import { EmailFieldDefinition } from "../fields/email";
import { FloatFieldDefinition } from "../fields/float";
import { IntFieldDefinition } from "../fields/int";
import { PasswordFieldDefinition } from "../fields/password";
import { StringFieldDefinition } from "../fields/string";
import { TextFieldDefinition } from "../fields/text";

export type FieldDefinition = 
  | EmailFieldDefinition
  | FloatFieldDefinition
  | IntFieldDefinition
  | PasswordFieldDefinition
  | StringFieldDefinition
  | TextFieldDefinition;

export type FormDefinition = Record<string, FieldDefinition>;
