import * as z from "zod";
import { ObjId } from "./utils";

export enum AuthProvider {
  GOOGLE = "google",
  MICROSOFT = "microsoft"
}

export const SessionUser = z.object({
  _id: ObjId.optional(),
  id: z.string(),
  name: z.string(),
  loggedInAt: z.date(),
  email: z.string().email(),
  picture: z.string().url().optional(),
  provider: z.nativeEnum(AuthProvider),
  locale: z.string().optional(),
});

export type SessionUser = z.infer<typeof SessionUser>;
