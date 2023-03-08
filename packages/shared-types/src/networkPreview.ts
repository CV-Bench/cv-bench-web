import * as z from "zod";

import { DataBody, ObjId, PostDataBody } from "./utils";

export const NetworkPreviewBody = DataBody.pick({
  _id: true,
  createdAt: true
}).extend({
  image: z.string(), //base64 encoded image
  taskId: ObjId
});

export type NetworkPreviewDb = z.infer<typeof NetworkPreviewBody>;

// POST
//                             ↓ for extensibility in case we choose to add description:true
export const PostNetworkPreviewBody = PostDataBody.pick({}).merge(
  NetworkPreviewBody.pick({
    image: true,
    taskId: true
  })
);
export type PostNetworkPreview = z.infer<typeof PostNetworkPreviewBody>;

export const PostNetworkPreviewResponseBody = z.object({
  _id: ObjId
});
export type PostNetworkPreviewResponse = z.infer<
  typeof PostNetworkPreviewResponseBody
>;

// GET
export const GetNetworkPreviewBody = NetworkPreviewBody.omit({
  createdAt: true
}).extend({
  createdAt: z.string().transform((d) => new Date(d))
});

export type GetNetworkPreview = z.infer<typeof GetNetworkPreviewBody>;

export const GetNetworkPreviewListBody = z.array(GetNetworkPreviewBody);

export type GetNetworkPreviewList = z.infer<typeof GetNetworkPreviewListBody>;
