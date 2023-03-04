import * as z from "zod";

import { ObjId } from "./utils";

export enum DatasetFormat {
  COCO = "COCO"
}

export const NetworkArchitectureBody = z.object({
  _id: ObjId,
  name: z.string(),
  identifier: z.string(),
  description: z.string(),
  createdAt: z.date(),
  requiredDatasetFormat: z.nativeEnum(DatasetFormat)
});

export type NetworkArchitecture = z.infer<typeof NetworkArchitectureBody>;

export const GetNetworkArchitectureListBody = z.array(
  NetworkArchitectureBody.omit({ createdAt: true }).extend({
    createdAt: z.string().transform((d) => new Date(d))
  })
);
export type GetNetworkArchitectureList = z.infer<
  typeof GetNetworkArchitectureListBody
>;
