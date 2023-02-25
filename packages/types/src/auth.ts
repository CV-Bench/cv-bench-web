import * as z from "zod";

export const SessionUser = z.object({
  id: z.string(),
  name: z.string(),
  loggedInAt: z.date(),
  email: z.string().email(),
  picture: z.string().url().optional(),
  provider: z.string().url(),
  locale: z.string().optional(),
});

export type SessionUser = z.infer<typeof SessionUser>;
