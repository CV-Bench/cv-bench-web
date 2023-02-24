import * as z from "zod";

export enum AuthProvider {
    GOOGLE = "https://accounts.google.com"
}

export const SessionUser = z.object({
  id: z.string(),
  name: z.string(),
  loggedInAt: z.date(),
  email: z.string().email(),
  picture: z.string().url(),
  provider: z.nativeEnum(AuthProvider),
  locale: z.string(),
});

export type SessionUser = z.infer<typeof SessionUser>;
