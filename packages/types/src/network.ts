import * as z from "zod";
import { DataBody, ObjId, PostDataBody } from "./utils";

export const NetworkBody = DataBody.extend({
  datasetId: ObjId,
  networkArchitectureId: ObjId,
});

export type NetworkDb = z.infer<typeof NetworkBody>;

export const PostNetworkBody = PostDataBody.merge(
  NetworkBody.pick({ datasetId: true, networkArchitectureId: true })
);

export type PostNetwork = z.infer<typeof PostNetworkBody>;
