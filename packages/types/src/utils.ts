import * as z from "zod";

import { AccessType } from ".";

export const ObjId = z.any();

export const DataBody = z.object({
  _id: ObjId,
  userId: ObjId,
  name: z.string(),
  description: z.string(),
  domainTags: z.array(z.string()),
  accessType: z.nativeEnum(AccessType),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PostDataBody = DataBody.pick({
  name: true,
  description: true,
  accessType: true,
});
