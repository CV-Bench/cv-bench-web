import * as z from "zod";

import { DataBody, ObjId, PostDataBody } from "./utils";

export const DatasetPreviewBody = DataBody.pick({_id:true, createdAt:true}).extend({
    image: z.string(), //base64 encoded image
    taskId: z.string()
});

export type DatasetPreviewDb = z.infer<typeof DatasetPreviewBody>;

// POST
//                             ↓ for extensibility in case we choose to add description:true
export const PostDatasetPreviewBody = PostDataBody.pick({}).merge(
DatasetPreviewBody.pick({
    image: true,
    taskId: true
  })
);
export type PostDatasetPreview = z.infer<typeof PostDatasetPreviewBody>;

export const PostDatasetPreviewResponseBody = z.object({
  _id: ObjId
});
export type PostDatasetPreviewResponse = z.infer<typeof PostDatasetPreviewResponseBody>;


// GET
export const GetDatasetPreviewBody = DatasetPreviewBody.omit({createdAt: true}).extend({
  createdAt: z.string().transform((d) => new Date(d))
});

export type GetDatasetPreview = z.infer<typeof GetDatasetPreviewBody>;
