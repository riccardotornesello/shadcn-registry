import { IntFieldDefinition } from "../fields/int";
import { TextFieldDefinition } from "../fields/text";

export type FieldDefinition = TextFieldDefinition | IntFieldDefinition;

export type FormDefinition = Record<string, FieldDefinition>;
