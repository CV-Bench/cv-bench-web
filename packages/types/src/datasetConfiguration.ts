import * as z from "zod";
import { ObjId } from "./utils";

export enum ConfigurationType {
  "BLENDER",
}

export enum RandomColor {
  NONE = "None",
  TEMPERATURE = "Temperature",
  PROJECTOR = "Projector",
}

export enum CamLensUnit {
  FOV = "FOV",
  MILLIMETERS = "MILLIMETERS",
}

//CONFIGURATION OBJECT user-editable
export const BlenderConfigurationObject = z.object({
  maxDistractorObjects: z.number().int().gte(0), //max number of distractor objects

  numberOfObjects: z.number().int().gte(0).default(1), //number of target objects

  // DEPTH OUTPUT (not tested)
  outputDepth: z.boolean().default(false),
  depthOutputDepth: z.number().int().default(16),

  // AUGMENTATION
  // emission_min: z.number().default(1), // only for environment maps
  // emission_max: z.number().default(8), // only for environment maps
  // light_number_min: z.number().default(1), // only for background images
  // light_number_max: z.number().default(3), // only for background images
  // light_energymin: z.number().default(20), // only for background images
  // light_energymax: z.number().default(80), // only for background images
  randomHSVValue: z.boolean().default(false), // randomize the value of HSV color space of the object with p=0.5
  randomMetallicValue: z.boolean().default(false), //randomize the metallic object value with p=0.5
  randomRoughnessValue: z.boolean().default(false), //randomize the roughness object value with p=0.5

  random_color: z.nativeEnum(RandomColor), //choose "None", "temperature", "projector"

  // OBJECT COLOR (for PLY Files)
  modelScale: z.number().gt(0).default(1), // model scale for PLY objects
  hsv_hue: z.number().gte(0).lte(1).default(0.5), // changes hue of Hue Saturation Value Node, default 0.5
  hsv_saturation: z.number().gte(0).lte(1).default(1), // changes saturation of Hue Saturation Value Node, default 1
  hsv_value: z.number().gte(0).lte(1).default(1), // 0.35 // changes value of Hue Saturation Value Node, default 1
  //roughness: z.number().gte(0).lte(1).default(0.3) //0.1 # Object Material Roughness (0=Mirror, 1=No Reflections)

  // camera sphere coordinates
  camRMin: z.number().default(0.3), // minimum camera distance
  camRMax: z.number().default(1.1), // maximum camera distance
  camIncMin: z.number().default(0),
  camIncMax: z.number().default(Math.PI / 2), // pi*2/3
  camAziMin: z.number().default(0),
  camAziMax: z.number().default(2 * Math.PI),

  //  OBJECT POSITION
  objLocationXMin: z.number().default(-0.2), // translation in meters
  objLocationXMax: z.number().default(0.2),
  objLocationYMin: z.number().default(-0.2),
  objLocationYMax: z.number().default(0.2),
  objLocationZMin: z.number().default(-0.2),
  objLocationZMax: z.number().default(0.2),
  camRotationMin: z.number().default(0),
  camRotationMax: z.number().default(2 * Math.PI),

  maxBoundingBox: z.number().gte(0).lte(1).default(0.1), // filter out objects with bbox < -x or > 1+x (a value of 0.1 means max. 10% occlusion)

  // Camera
  camLensUnit: z.nativeEnum(CamLensUnit), // Choose 'FOV' or 'MILLIMETERS'
  camLens: z.number().default(4.7), // Camera lens value in mm
  camFov: z.number().default((59 + 90) / 2), // camera field of view in degrees
  camSensorHeight: z.number().gt(0).default(3.84), // mm
  camSensorWidth: z.number().gt(0).default(5.11), // mm

  clipEnd: z.number().default(50),
  clipStart: z.number().default(0.01),

  //  RENDERING CONFIG
  useGPU: z.boolean().default(true),
  useCycles: z.boolean().default(true), // cycles or eevee
  useCyclesDenoising: z.boolean().default(false),
  useAdaptiveSampling: z.boolean().default(true),
  resolutionX: z.number().gt(0).default(640), // pixel resolution
  resolutionY: z.number().gt(0).default(360), // pixel resolution
  samples: z.number().gt(0).default(512),

  //  OUTPUT
  numberOfRenders: z.number().default(20), // how many rendered examples
});

export type BlenderConfiguration = z.infer<typeof BlenderConfigurationObject>;
export type BlenderConfigurationKey = keyof BlenderConfiguration;

export const DatasetConfigurationBody = z.object({
  _id: ObjId,
  userId: ObjId,
  name: z.string(),
  createdAt: z.string(),
  configurationType: z.nativeEnum(ConfigurationType),
  configuration: BlenderConfigurationObject,
});
export type DatasetConfigurationDb = z.infer<typeof DatasetConfigurationBody>;

export const PostDatasetConfigurationBody = DatasetConfigurationBody.pick({
  name: true,
  configurationType: true,
  configuration: true,
});
export type PostDatasetConfiguration = z.infer<
  typeof PostDatasetConfigurationBody
>;
