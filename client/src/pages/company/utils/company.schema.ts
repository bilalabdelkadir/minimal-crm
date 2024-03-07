import { websiteRegex } from "@/utils/regex";
import { z } from "zod";

export enum PreferredContactMethod {
  Email = "Email",
  Phone = "Phone",
}

export const companySchema = z.object({
  name: z.string().min(2, "please provide valid name"),
  email: z.string().email("please provide valid email"),
  phone: z
    .number()
    .min(9, "phone number should be min of 9 character")
    .optional()
    .or(z.literal("")),
  secondaryEmail: z
    .string()
    .email("please provide valid email")
    .optional()
    .or(z.literal("")),
  secondaryPhone: z
    .number()
    .min(9, "phone number should be min of 9 character")
    .optional()
    .or(z.literal("")),
  preferredContactMethod: z
    .enum(["Email", "Phone"])
    .optional()
    .or(z.literal("")),
  referalSource: z.string().optional(),
  preferredCurrency: z.string().optional(),
  preferredLanguage: z.string().optional(),
  website: z
    .string()
    .regex(websiteRegex, "please provide valid url")
    .optional()
    .or(z.literal("")),
  contacts: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  addresses: z
    .array(
      z.object({
        country: z.string().min(2, "country is required"),
        street: z.string().optional().or(z.literal("")),
        city: z.string().optional().or(z.literal("")),
        state: z.string().optional().or(z.literal("")),
        zip: z.string().optional().or(z.literal("")),
      }),
    )
    .optional(),
});
