import * as z from "zod";
import { ObjId } from "./utils";

export enum DatasetFormat {
  COCO = "COCO",
}

export enum loggerTitle {
  EXPRESS_SERVER = "EXPRESS SERVER",
  EXPRESS_REQUEST = "EXPRESS REQUEST",
  REDIS_CLIENT = "REDIS CLIENT",
  MONGO_CLIENT = "MONGO CLIENT",
  AUTH_CLIENT = "AUTH CLIENT",
  SOCKET = "SOCKET",
}

export const NetworkArchitectureBody = z.object({
  _id: ObjId,
  name: z.string(),
  identifier: z.string(),
  description: z.string(),
  createdAt: z.date(),
  requiredDatasetFormat: z.nativeEnum(DatasetFormat),
});

export type NetworkArchitecture = z.infer<typeof NetworkArchitectureBody>;

export * from "./utils";
export * from "./model";
export * from "./dataset";
export * from "./datasetConfiguration";
export * from "./audit";
export * from "./network";
export * from "./background";
export * from "./notification";
export * from "./task";
export * from "./routes";
export * from "./mongo";
export * from "./s3";
export * from "./auth";
export * from "./socket";
