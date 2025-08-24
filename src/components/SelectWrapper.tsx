import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";
import FormLabelWrapper from "@/components/FormLabelWrapper";

type SelectOption = {
  value: string;
  label: string;
};

type SelectWrapperProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  options: SelectOption[];
  description?: string;
  isRequired?: boolean;
};

export default function SelectWrapper<T extends FieldValues = FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
  description,
  isRequired,
}: SelectWrapperProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabelWrapper isRequired={isRequired}>{label}</FormLabelWrapper>

          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger tabIndex={0} className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription className={description ? "block" : "hidden"}>
            {description}
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
