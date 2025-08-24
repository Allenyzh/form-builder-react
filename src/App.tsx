import FormBuilder from "@/components/FormBuilder";
import type { formConfigType } from "@/type/formConfig.type";
import { z } from "zod";

export default function App() {
  const formConfig: formConfigType[] = [
    {
      type: "input",
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
      description: "Your unique username",
      value: "",
      zodSchema: z
        .string()
        .min(2, { message: "Username must be at least 2 characters." }),
      colSpan: 1,
    },
    {
      type: "select",
      name: "category",
      label: "Category",
      placeholder: "Select a category",
      options: [
        { value: "tech", label: "Technology" },
        { value: "health", label: "Health" },
        { value: "finance", label: "Finance" },
      ],
      description: "Choose a category that fits you best",
      value: "",
      zodSchema: z.string().min(1, { message: "Please select a category." }),
      colSpan: 2,
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      placeholder: "Enter a description",
      description: "Provide more details",
      value: "",
      zodSchema: z.string().min(1, { message: "Description is required." }),
      colSpan: 1,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dynamic Form Builder</h1>
      <FormBuilder formConfig={formConfig} />

      <h2>Form Configs</h2>
      <pre className="w-2/3 mt-2 rounded-md bg-neutral-950 p-4">
        <code className="text-white">
          {JSON.stringify(formConfig, null, 2)}
        </code>
      </pre>
    </div>
  );
}
