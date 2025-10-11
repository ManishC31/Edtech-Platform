import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  date_of_birth: z.date().optional(),
  role: z.enum(["STUDENT", "STAFF", "ADMIN"]),
  org_name: z.string().optional(),
  org_description: z.string().optional(),
  org_email: z.string().email().optional(),
  staff_role: z.string().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});
