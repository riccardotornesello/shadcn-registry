import { useMemo } from "react";
import { getFieldValidator, getFields } from "./utils/validation";
import { FormDefinition } from "./types/form";
import { Button } from "@/components/ui/button";
import { Form as ShadCnForm, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

interface FormProps {
  formDefinition: FormDefinition;
}

export const Form = ({ formDefinition }: FormProps) => {
  const fields = useMemo(() => getFields(formDefinition), [formDefinition]);
  const formSchema = useMemo(() => getFieldValidator(fields), [fields]);

  const defaultValues = useMemo(() => {
    return Object.keys(fields).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {} as Record<string, string>);
  }, [fields]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
    alert("Form submitted! Check console for data.");
  };

  return (
    <ShadCnForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {Object.entries(fields).map(([fieldName, field]) => (
          <FormField
            control={form.control}
            name={fieldName}
            key={fieldName}
            render={(p) => field.render(p)}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </ShadCnForm>
  );
};
