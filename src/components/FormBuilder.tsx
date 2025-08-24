import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputWrapper from "@/components/InputWrapper";
import SelectWrapper from "@/components/SelectWrapper";
import TextareaWrapper from "@/components/TextareaWrapper";
import type { formConfigType } from "@/type/formConfig.type";

interface FormBuilderProps {
  formConfig: formConfigType[];
}

export default function FormBuilder({ formConfig }: FormBuilderProps) {
  const FormSchema = z.object({
    ...formConfig.reduce((acc, field) => {
      if (field.zodSchema) {
        acc[field.name] = field.zodSchema;
      } else {
        acc[field.name] = z.string().optional();
      }
      return acc;
    }, {} as Record<string, z.ZodTypeAny>),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formConfig.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as Record<string, formConfigType["value"]>),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const isFieldRequired = (fieldName: string) => {
    const fieldConfig = formConfig.find((field) => field.name === fieldName);
    if (!fieldConfig?.zodSchema) return false;

    const result = fieldConfig.zodSchema.safeParse(undefined);
    return !result.success;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <Toaster />

        <div className="grid grid-cols-3 gap-4">
          {formConfig.map((field) => {
            const commonProps = {
              form,
              name: field.name as keyof z.infer<typeof FormSchema>,
              label: field.label,
              placeholder: field.placeholder,
              description: field.description,
              isRequired: isFieldRequired(field.name),
            };

            let content = null;

            switch (field.type) {
              case "input":
                content = <InputWrapper {...commonProps} />;
                break;
              case "select":
                content = (
                  <SelectWrapper
                    {...commonProps}
                    options={field.options || []}
                  />
                );
                break;
              case "textarea":
                content = <TextareaWrapper {...commonProps} />;
                break;
              default:
                content = null;
            }

            if (!content) return null;

            return (
              <div
                key={field.name}
                className={field.wrapperClassName}
                style={{
                  gridColumn: `span ${field.colSpan || 1} / span ${
                    field.colSpan || 1
                  }`,
                }}
              >
                {content}
              </div>
            );
          })}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
