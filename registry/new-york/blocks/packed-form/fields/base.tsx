import { z } from "zod";
import React from "react";
import type { BaseFieldDefinition } from "../types/base";
import { ControllerRenderProps } from "react-hook-form";
export class BaseField<T extends BaseFieldDefinition = BaseFieldDefinition> {
  constructor(public definition: T) {}

  getValidator(): z.ZodType {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_: { field: ControllerRenderProps }): React.ReactElement {
    throw new Error("Method not implemented.");
  }
}
