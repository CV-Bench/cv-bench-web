import * as z from "zod";
import { httpMethod, ObjId, RouteName } from "./utils";

export enum AccessType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export enum DataType {
  MODEL = "MODEL",
  DATASET = "DATASET",
  NETWORK = "NETWORK",
}

export enum DatasetFormat {
  COCO = "COCO",
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

export type RouteMethodName = `/${RouteName}/${httpMethod}`;
export type Route = {[route in RouteMethodName]?: z.AnyZodObject};

export * from "./model";
export * from "./dataset";
export * from "./datasetConfiguration";
export * from "./audit";
export * from "./network";
export * from "./notification";
export * from "./task";
export * from "./mongo";