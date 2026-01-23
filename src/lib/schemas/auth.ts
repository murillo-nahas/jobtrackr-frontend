import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name should be at least 3 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password should be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type User = z.infer<typeof userSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type RegisterData = Omit<RegisterFormValues, "confirmPassword">;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type LoginData = z.infer<typeof loginSchema>;
