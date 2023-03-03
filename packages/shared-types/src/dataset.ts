import * as z from "zod";

import { DataBody, ObjId, PostDataBody } from "./utils";

export enum DatasetType {
  "BLENDER_3D"
}

export const DatasetBody = DataBody.extend({
  models: z.array(ObjId),
  distractors: z.array(ObjId),
  datasetType: z.nativeEnum(DatasetType),
  configurationId: ObjId,
  size: z.number(),
  backgroundIds: z.array(ObjId),
  s3Key: z.string().optional()
});

export type DatasetDb = z.infer<typeof DatasetBody>;

// POST
export const PostDatasetBody = PostDataBody.merge(
  DatasetBody.pick({
    models: true,
    distractors: true,
    backgroundIds: true,
    datasetType: true,
    configurationId: true
  })
);
export type PostDataset = z.infer<typeof PostDatasetBody>;

export const PostDatasetResponseBody = z.object({
  _id: ObjId
});
export type PostDatasetResponse = z.infer<typeof PostDatasetResponseBody>;

// PATCH
export const PatchDatasetBody = PostDataBody;

export type PatchDataset = z.infer<typeof PatchDatasetBody>;

// GET
export const GetDatasetBody = DatasetBody.omit({
  createdAt: true,
  updatedAt: true
}).extend({
  createdAt: z.string().transform((d) => new Date(d)),
  updatedAt: z.string().transform((d) => new Date(d))
});

export type GetDataset = z.infer<typeof GetDatasetBody>;

// GET LIST
export const GetDatasetListBody = z.array(
  GetDatasetBody.omit({
    configurationId: true,
    models: true,
    distractors: true
  })
);
export type GetDatasetList = z.infer<typeof GetDatasetListBody>;
