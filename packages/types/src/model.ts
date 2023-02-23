import * as z from "zod";
import { DataBody, ObjId, PostDataBody } from "./utils";

export enum ModelType {
  "3D",
  "2D",
}

export const ModelBody = DataBody.extend({
  modelType: z.nativeEnum(ModelType),
  previewImage: z.string(),
});

export type ModelDb = z.infer<typeof ModelBody>;

export const DataUrlFileBody = z.object({
  filename: z.string(),
  dataUrl: z.string()
})

export type DataUrlFile = z.infer<typeof DataUrlFileBody>;


// POST
export const PostModelBody = PostDataBody.extend({
  modelType: z.nativeEnum(ModelType),
  previewImage: z.string(),
  modelObject: DataUrlFileBody,
  modelAssets: z.array(DataUrlFileBody).optional()
});
export type PostModel = z.infer<typeof PostModelBody>;

export const PostModelResponseBody = z.object({
  _id: ObjId,
});
export type PostModelResponse = z.infer<typeof PostModelResponseBody>;

// PATCH
export const PatchModelBody = PostDataBody;

export type PatchModel = z.infer<typeof PatchModelBody>;

// GET SINGLE MODEL
export const GetModelBody = ModelBody;
export type GetModel = z.infer<typeof GetModelBody>;

// GET MODELS
export const GetModelListBody = z.array(GetModelBody);
export type GetModelList = z.infer<typeof GetModelListBody>;
