import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FormLabelWrapper from "@/components/FormLabelWrapper";
import type { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";

type TextareaWrapperProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  description?: string;
  isRequired?: boolean;
};

export default function TextareaWrapper<T extends FieldValues = FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  isRequired,
}: TextareaWrapperProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabelWrapper isRequired={isRequired}>{label}</FormLabelWrapper>

          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription className={description ? "block" : "hidden"}>
            {description}
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
