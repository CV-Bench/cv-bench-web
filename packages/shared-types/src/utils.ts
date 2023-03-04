import { Request } from "express";
import * as z from "zod";

export enum AccessType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export enum DataType {
  DATASET = "DATASET",
  NETWORK = "NETWORK"
}

export const ObjId = z.any();

export const DataBody = z.object({
  _id: ObjId,
  userId: ObjId.optional(),
  name: z.string(),
  description: z.string().optional(),
  domainTags: z.array(z.string()),
  accessType: z.nativeEnum(AccessType),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const PostDataBody = DataBody.pick({
  name: true,
  description: true,
  accessType: true,
  domainTags: true
});

export type OmitFirst<T extends any[]> = T extends [any, ...infer R]
  ? R
  : never;

export type TypedRequest<T> = Omit<Request, "body"> & { body: T };
