import type { ZodType } from "zod";

export interface formConfigType {
  type: "input" | "select" | "textarea";
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  options?: { value: string; label: string }[]; // Only for select type
  value: string;
  zodSchema?: ZodType;

  colSpan?: number; // 占几列
  row?: number; // 所在行
  group?: string; // 分组名
  wrapperClassName?: string; // 额外样式
}
