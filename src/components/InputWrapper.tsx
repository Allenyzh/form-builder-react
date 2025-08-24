import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormLabelWrapper from "@/components/FormLabelWrapper";
import type { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";

type InputWrapperProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  description?: string;
  isRequired?: boolean;
};

export default function InputWrapper<T extends FieldValues = FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  isRequired,
}: InputWrapperProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabelWrapper isRequired={isRequired}>{label}</FormLabelWrapper>

          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription className={description ? "block" : "hidden"}>
            {description}
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
