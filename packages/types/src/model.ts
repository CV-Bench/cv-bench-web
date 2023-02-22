import * as z from "zod";
import { DataBody, PostDataBody } from "./utils";

export enum ModelType {
  "3D",
  "2D",
}

export const ModelBody = DataBody.extend({
  modelType: z.nativeEnum(ModelType),
});

export type ModelDb = z.infer<typeof ModelBody>;

export const PostModelBody = PostDataBody.extend({
  modelType: z.nativeEnum(ModelType),
  // TODO: extend with necessary data to upload .obj and .ply
});
export type PostModel = z.infer<typeof PostModelBody>;
