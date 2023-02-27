import * as z from "zod";
import { DataBody, ObjId, PostDataBody } from "./utils";

export const NetworkBody = DataBody.extend({
  datasetId: ObjId,
  networkArchitectureId: ObjId,
});

export type NetworkDb = z.infer<typeof NetworkBody>;

// POST
export const PostNetworkBody = PostDataBody.merge(
  NetworkBody.pick({ datasetId: true, networkArchitectureId: true })
);

export type PostNetwork = z.infer<typeof PostNetworkBody>;

// PATCH
export const PatchNetworkBody = PostDataBody;

export type PatchNetwork = z.infer<typeof PatchNetworkBody>;

// GET
export const GetNetworkBody = NetworkBody.omit({
  createdAt: true,
  updatedAt: true,
}).extend({
  createdAt: z.string().transform((d) => new Date(d)),
  updatedAt: z.string().transform((d) => new Date(d)),
});

export type GetNetwork = z.infer<typeof GetNetworkBody>;

// GET LIST
export const GetNetworkListBody = z.array(
  GetNetworkBody.omit({ datasetId: true, networkArchitectureId: true })
);

export type GetNetworkList = z.infer<typeof GetNetworkListBody>;
