import { z } from "zod";

export const formStatusValues = ["draft", "active", "archived"] as const;

export const FormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  fieldsCount: z
    .number()
    .int("Fields count must be an integer.")
    .min(0, "Fields count must be at least 0.")
    .max(50, "Fields count must be at most 50."),
  status: z.enum(formStatusValues),
});

export type FormInput = z.infer<typeof FormSchema>;

export type FormRecord = FormInput & {
  id: string;
  updatedAt: string;
  createdAt: string;
};
