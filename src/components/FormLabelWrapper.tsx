import { FormLabel, FormMessage } from "@/components/ui/form";
import type { ReactNode } from "react";

type FormLabelWrapperProps = {
  children: ReactNode;
  isRequired?: boolean;
};

export default function FormLabelWrapper({
  children,
  isRequired,
}: FormLabelWrapperProps) {
  return (
    <div className="flex justify-between">
      <FormLabel>
        {children}
        {isRequired ? <span className="text-red-500">*</span> : null}
      </FormLabel>
      <FormMessage />
    </div>
  );
}
