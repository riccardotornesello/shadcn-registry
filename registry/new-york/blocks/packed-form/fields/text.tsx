import { z } from "zod";
import { BaseFieldDefinition } from "../types/base";
import { BaseField } from "./base";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps } from "react-hook-form";

interface TextOptions {
  minLength?: number;
  maxLength?: number;
}

export interface TextFieldDefinition extends BaseFieldDefinition {
  type: "text";
  options?: TextOptions;
}

export class TextField extends BaseField<TextFieldDefinition> {
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
          <Textarea {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
}
