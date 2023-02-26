import * as z from "zod";
import { ObjId } from "./utils";

export const SessionUser = z.object({
  _id: ObjId.optional(),
  id: z.string(),
  name: z.string(),
  loggedInAt: z.date(),
  email: z.string().email(),
  picture: z.string().url().optional(),
  provider: z.string().url(),
  locale: z.string().optional(),
});

export type SessionUser = z.infer<typeof SessionUser>;
