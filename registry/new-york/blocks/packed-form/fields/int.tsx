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

interface IntOptions {
  min?: number;
  max?: number;
}

export interface IntFieldDefinition extends BaseFieldDefinition {
  type: "int";
  options?: IntOptions;
}

export class IntField extends BaseField<IntFieldDefinition> {
  getValidator() {
    let validator = z.coerce.number().int();

    const { options, optional } = this.definition;

    if (options) {
      if (options.min !== undefined) {
        validator = validator.min(options.min);
      }

      if (options.max !== undefined) {
        validator = validator.max(options.max);
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
          <Input {...field} type="number" />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }
}
