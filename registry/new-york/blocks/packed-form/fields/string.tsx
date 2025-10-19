import { z } from "zod";
import { BaseFieldDefinition } from "../types/base";
import { BaseField } from "./base";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";

interface StringOptions {
  minLength?: number;
  maxLength?: number;
}

export interface StringFieldDefinition extends BaseFieldDefinition {
  type: "string";
  options?: StringOptions;
}

export class StringField extends BaseField<StringFieldDefinition> {
  getValidator() {
    let validator = z.string();

    const { options, optional } = this.definition;

    if (options) {
      if (options.minLength !== undefined) {
        validator = validator.min(options.minLength);
      }

      if (options.maxLength !== undefined) {
        validator = validator.max(options.maxLength);
      }
    }

    if (optional) {
      return z.optional(validator);
    } else {
      return validator;
    }
  }

  render({ field }: { field: ControllerRenderProps }) {
    return (
      <FormItem>
        <FormLabel>{this.definition.label}</FormLabel>
        <FormControl>
          <Input {...field} type="text" />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
}
