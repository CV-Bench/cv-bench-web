import * as z from "zod";

export enum AccessType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export enum DataType {
  MODEL = "MODEL",
  DATASET = "DATASET",
  NETWORK = "NETWORK",
}

export const ObjId = z.any();

export const DataBody = z.object({
  _id: ObjId,
  userId: ObjId.optional(),
  name: z.string(),
  description: z.string(),
  domainTags: z.array(z.string()),
  accessType: z.nativeEnum(AccessType),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const PostDataBody = DataBody.pick({
  name: true,
  description: true,
  accessType: true,
  domainTags: true,
});

export type OmitFirst<T extends any[]> = T extends [any, ...infer R]
  ? R
  : never;
