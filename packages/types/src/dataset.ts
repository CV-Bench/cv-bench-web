import * as z from "zod";
import { DataBody, ObjId, PostDataBody } from "./utils";

export enum DatasetType {
  "BLENDER_3D",
}

export const DatasetBody = DataBody.extend({
  models: z.array(ObjId),
  datasetType: z.nativeEnum(DatasetType),
  configurationId: ObjId,
});

export type DatasetDb = z.infer<typeof DatasetBody>;

export const PostDatasetBody = PostDataBody.merge(
  DatasetBody.pick({ models: true, datasetType: true, configurationId: true })
);
export type PostDataset = z.infer<typeof PostDatasetBody>;
