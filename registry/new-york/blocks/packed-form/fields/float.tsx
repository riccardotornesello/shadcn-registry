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

interface FloatOptions {
  min?: number;
  max?: number;
}

export interface FloatFieldDefinition extends BaseFieldDefinition {
  type: "float";
  options?: FloatOptions;
}

export class FloatField extends BaseField<FloatFieldDefinition> {
  getValidator() {
    let validator = z.number();

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
