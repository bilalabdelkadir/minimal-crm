import * as z from "zod";

const urlRegex =
  /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([a-z0-9-]+\.[a-z]{2,})(?:\/[\w.-]*)*\/?$/i;

export const workspaceSchema = z.object({
  name: z.string().min(2, {
    message: "name should be at least 2 characters",
  }),
  description: z
    .string()
    .max(500, {
      message: "description should be less than 500 characters",
    })
    .optional()
    .or(z.literal(null)),
  website: z
    .string()
    .max(70)
    .regex(urlRegex, {
      message: "website should be valid url",
    })
    .optional()
    .or(z.literal("")),
  country: z.string().max(10).optional().or(z.literal("")),
});
