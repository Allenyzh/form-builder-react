# React Dynamic FormBuilder

一个基于 React + TypeScript + Zod + React Hook Form 的动态表单构建器，支持多种表单字段类型和响应式布局。

## 🚀 特性

- ✅ **动态表单生成** - 通过配置对象快速生成表单
- ✅ **类型安全** - 完整的 TypeScript 支持
- ✅ **表单验证** - 基于 Zod schema 的强类型验证
- ✅ **响应式布局** - 支持网格布局和自定义列跨度
- ✅ **多种字段类型** - 支持 input、select、textarea
- ✅ **可扩展** - 易于添加新的字段类型
- ✅ **现代 UI** - 基于 shadcn/ui 组件库

## 📦 安装

```bash
# 使用 pnpm
pnpm install

# 使用 npm
npm install

# 使用 yarn
yarn install
```

## 🛠️ 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **React Hook Form** - 表单状态管理
- **Zod** - Schema 验证
- **shadcn/ui** - UI 组件库
- **Sonner** - 通知组件

## 🎯 快速开始

### 1. 启动开发服务器

```bash
pnpm dev
```

### 2. 基本用法

```tsx
import FormBuilder from "@/components/FormBuilder";
import type { formConfigType } from "@/type/formConfig.type";
import { z } from "zod";

export default function App() {
  const formConfig: formConfigType[] = [
    {
      type: "input",
      name: "username",
      label: "用户名",
      placeholder: "请输入用户名",
      description: "您的唯一用户名",
      value: "",
      zodSchema: z.string().min(2, { message: "用户名至少2个字符" }),
      colSpan: 1,
    },
    {
      type: "select",
      name: "category",
      label: "分类",
      placeholder: "选择分类",
      options: [
        { value: "tech", label: "技术" },
        { value: "health", label: "健康" },
        { value: "finance", label: "金融" },
      ],
      description: "选择最适合您的分类",
      value: "",
      zodSchema: z.string().min(1, { message: "请选择分类" }),
      colSpan: 2,
    },
  ];

  return (
    <div>
      <FormBuilder formConfig={formConfig} />
    </div>
  );
}
```

## 📝 API 文档

### FormBuilder 组件

#### Props

| 属性名       | 类型               | 必需 | 描述             |
| ------------ | ------------------ | ---- | ---------------- |
| `formConfig` | `formConfigType[]` | ✅   | 表单字段配置数组 |

### formConfigType 配置

#### 基础属性

| 属性名        | 类型                                | 必需 | 描述                             |
| ------------- | ----------------------------------- | ---- | -------------------------------- |
| `type`        | `"input" \| "select" \| "textarea"` | ✅   | 字段类型                         |
| `name`        | `string`                            | ✅   | 字段名称，用作表单字段的唯一标识 |
| `label`       | `string`                            | ✅   | 字段标签                         |
| `placeholder` | `string`                            | ✅   | 占位符文本                       |
| `value`       | `string`                            | ✅   | 默认值                           |

#### 可选属性

| 属性名             | 类型                               | 默认值 | 描述                       |
| ------------------ | ---------------------------------- | ------ | -------------------------- |
| `description`      | `string`                           | -      | 字段描述信息               |
| `options`          | `{value: string, label: string}[]` | -      | select 类型专用的选项数组  |
| `zodSchema`        | `ZodType`                          | -      | Zod 验证 schema            |
| `colSpan`          | `number`                           | `1`    | 网格布局中占用的列数 (1-3) |
| `row`              | `number`                           | -      | 所在行（预留功能）         |
| `group`            | `string`                           | -      | 分组名称（预留功能）       |
| `wrapperClassName` | `string`                           | -      | 额外的 CSS 类名            |

## 🔧 字段类型详解

### Input 字段

```tsx
{
  type: "input",
  name: "email",
  label: "邮箱",
  placeholder: "请输入邮箱地址",
  description: "用于接收重要通知",
  value: "",
  zodSchema: z.string().email({ message: "请输入有效邮箱" }),
  colSpan: 2
}
```

### Select 字段

```tsx
{
  type: "select",
  name: "country",
  label: "国家",
  placeholder: "选择国家",
  options: [
    { value: "cn", label: "中国" },
    { value: "us", label: "美国" },
    { value: "jp", label: "日本" }
  ],
  value: "",
  zodSchema: z.string().min(1, { message: "请选择国家" }),
  colSpan: 1
}
```

### Textarea 字段

```tsx
{
  type: "textarea",
  name: "description",
  label: "描述",
  placeholder: "请输入详细描述",
  description: "最多500个字符",
  value: "",
  zodSchema: z.string()
    .min(10, { message: "描述至少10个字符" })
    .max(500, { message: "描述最多500个字符" }),
  colSpan: 3
}
```

## 🎨 布局系统

FormBuilder 使用 CSS Grid 布局，默认为 3 列网格：

- `colSpan: 1` - 占用 1 列（1/3 宽度）
- `colSpan: 2` - 占用 2 列（2/3 宽度）
- `colSpan: 3` - 占用 3 列（全宽度）

## ✅ 表单验证

使用 Zod 进行表单验证，支持：

### 常用验证规则

```tsx
// 字符串长度
z.string().min(2, { message: "至少2个字符" });
z.string().max(50, { message: "最多50个字符" });

// 邮箱验证
z.string().email({ message: "无效邮箱格式" });

// 必填验证
z.string().min(1, { message: "此字段为必填项" });

// 数字验证
z.string().regex(/^\d+$/, { message: "请输入数字" });

// 自定义验证
z.string().refine((val) => val.length >= 8, { message: "密码至少8位" });
```

## 🎯 完整示例

```tsx
import FormBuilder from "@/components/FormBuilder";
import type { formConfigType } from "@/type/formConfig.type";
import { z } from "zod";

const userFormConfig: formConfigType[] = [
  {
    type: "input",
    name: "firstName",
    label: "名",
    placeholder: "请输入名",
    value: "",
    zodSchema: z.string().min(1, { message: "名为必填项" }),
    colSpan: 1,
  },
  {
    type: "input",
    name: "lastName",
    label: "姓",
    placeholder: "请输入姓",
    value: "",
    zodSchema: z.string().min(1, { message: "姓为必填项" }),
    colSpan: 1,
  },
  {
    type: "input",
    name: "email",
    label: "邮箱",
    placeholder: "请输入邮箱地址",
    description: "用于登录和接收通知",
    value: "",
    zodSchema: z.string().email({ message: "请输入有效邮箱" }),
    colSpan: 1,
  },
  {
    type: "select",
    name: "role",
    label: "角色",
    placeholder: "选择用户角色",
    options: [
      { value: "admin", label: "管理员" },
      { value: "user", label: "普通用户" },
      { value: "guest", label: "访客" },
    ],
    value: "",
    zodSchema: z.string().min(1, { message: "请选择角色" }),
    colSpan: 2,
  },
  {
    type: "textarea",
    name: "bio",
    label: "个人简介",
    placeholder: "请输入个人简介",
    description: "简单介绍一下自己",
    value: "",
    zodSchema: z.string().optional(),
    colSpan: 3,
  },
];

export default function UserForm() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">用户信息表单</h1>
      <FormBuilder formConfig={userFormConfig} />
    </div>
  );
}
```

## 🔧 自定义扩展

### 添加新的字段类型

1. 更新类型定义：

```tsx
// src/type/formConfig.type.ts
export interface formConfigType {
  type: "input" | "select" | "textarea" | "radio" | "checkbox"; // 添加新类型
  // ... 其他属性
}
```

1. 创建新的包装组件：

```tsx
// src/components/RadioWrapper.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// 实现组件逻辑
```

1. 在 FormBuilder 中添加 case：

```tsx
// src/components/FormBuilder.tsx
switch (field.type) {
  case "radio":
    content = <RadioWrapper {...commonProps} options={field.options || []} />;
    break;
  // ... 其他 case
}
```

## 🐛 常见问题

### Q: 如何设置字段为必填？

A: 在 `zodSchema` 中使用 `.min(1)` 或其他验证规则：

```tsx
zodSchema: z.string().min(1, { message: "此字段为必填项" });
```

### Q: 如何自定义字段样式？

A: 使用 `wrapperClassName` 属性：

```tsx
{
  // ... 其他配置
  wrapperClassName: "bg-blue-50 p-4 rounded-lg";
}
```

### Q: 如何获取表单提交的数据？

A: 当前版本在提交时会通过 toast 显示数据。要获取数据，可以修改 `FormBuilder.tsx` 中的 `onSubmit` 函数。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**更多信息请查看源代码或联系开发团队。**
