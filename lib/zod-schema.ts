// lib/zod-schemas.ts
import { z } from "zod";

export const partnerVisitorSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  partner: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});
