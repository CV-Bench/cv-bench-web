import * as z from "zod";

import { ObjectId } from "mongodb";

import { AccessType } from ".";

export const ObjId = z.instanceof(ObjectId);

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
