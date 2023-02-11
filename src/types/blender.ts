import * as z from "zod";

export enum BBoxBehavior {
  FAST = "fast",
  TIGHT = "tight"
}

export enum RandomColor {
  NONE = "None",
  TEMPERATURE = "Temperature",
  PROJECTOR = "Projector"
}

export enum CamLensUnit {
  FOV = "FOV",
  MILLIMETERS = "MILLIMETERS"
}

//CONFIGURATION OBJECT config.py
export const CompleteBlenderConfigurationObj = z.object({
  seed: z.number().int().default(1),
  test: z.boolean().default(false),

  out_folder: z.string(), //output folder name
  bg_paths: z.array(z.string()), //background image paths
  environment_paths: z.array(z.string()), //360° HDRI background image paths
  model_paths: z.array(z.string()), //model paths
  compute_bbox: z.enum([BBoxBehavior.FAST, BBoxBehavior.TIGHT]), //bounding box behavior
  distractor_paths: z.array(z.string()), //distractor image paths
  max_distractor_objects: z.number().int().gte(0), //max number of distractor objects

  object_texture_path: z.string(), //path to textures folder
  distractor_texture_path: z.string(), //path to distractor folder

  NumberOfObjects: z.number().int().gte(0).default(1), //number of target objects
  use_fps_keypoints: z.boolean(), //experimental feature for 6d pose estimation

  // DEPTH OUTPUT (not tested)
  output_depth: false,
  depth_color_depth: "16",

  // AUGMENTATION
  use_bg_image: z.boolean().default(true), // use Background Images
  use_environment_maps: z.boolean().default(true), // use 360° HDRI Panoramas
  emission_min: z.number().default(1), // only for environment maps
  emission_max: z.number().default(8), // only for environment maps
  light_number_min: z.number().default(1), // only for background images
  light_number_max: z.number().default(3), // only for background images
  light_energymin: z.number().default(20), // only for background images
  light_energymax: z.number().default(80), // only for background images
  random_hsv_value: z.boolean().default(false), // randomize the value of HSV color space of the object with p=0.5
  random_metallic_value: z.boolean().default(false), //randomize the metallic object value with p=0.5
  random_roughness_value: z.boolean().default(false), //randomize the roughness object value with p=0.5
  //random_projector_colors: z.bool.default(false),  //random projector augmentation with p=0.5 (point light with random color)

  random_color: z.enum([
    RandomColor.NONE,
    RandomColor.TEMPERATURE,
    RandomColor.PROJECTOR
  ]), //choose "None", "temperature", "projector"

  // OBJECT COLOR (for PLY Files)
  model_scale: z.number().gt(0).default(1), // model scale for PLY objects
  hsv_hue: z.number().gte(0).lte(1).default(0.5), // changes hue of Hue Saturation Value Node, default 0.5
  hsv_saturation: z.number().gte(0).lte(1).default(1), // changes saturation of Hue Saturation Value Node, default 1
  hsv_value: z.number().gte(0).lte(1).default(1), // 0.35 // changes value of Hue Saturation Value Node, default 1
  //roughness: z.number().gte(0).lte(1).default(0.3) //0.1 # Object Material Roughness (0=Mirror, 1=No Reflections)

  // camera sphere coordinates
  cam_rmin: z.number().default(0.3), // minimum camera distance
  cam_rmax: z.number().default(1.1), // maximum camera distance
  cam_incmin: z.number().default(0),
  cam_incmax: z.number().default(Math.PI / 2), // pi*2/3
  cam_azimin: z.number().default(0),
  cam_azimax: z.number().default(2 * Math.PI),

  //  OBJECT POSITION
  obj_location_xmin: z.number().default(-0.2), // translation in meters
  obj_location_xmax: z.number().default(0.2),
  obj_location_ymin: z.number().default(-0.2),
  obj_location_ymax: z.number().default(0.2),
  obj_location_zmin: z.number().default(-0.2),
  obj_location_zmax: z.number().default(0.2),
  cam_rotation_min: z.number().default(0),
  cam_rotation_max: z.number().default(2 * Math.PI),

  max_boundingbox: z.number().gte(0).lte(1).default(0.1), // filter out objects with bbox < -x or > 1+x (a value of 0.1 means max. 10% occlusion)

  // Camera
  cam_lens_unit: z.enum([CamLensUnit.FOV, CamLensUnit.MILLIMETERS]), // Choose 'FOV' or 'MILLIMETERS'
  cam_lens: z.number().default(4.7), // Camera lens value in mm
  cam_fov: z.number().default((59 + 90) / 2), // camera field of view in degrees
  cam_sensor_height: z.number().gt(0).default(3.84), // mm
  cam_sensor_width: z.number().gt(0).default(5.11), // mm

  clip_end: z.number().default(50),
  clip_start: z.number().default(0.01),

  //  RENDERING CONFIG
  use_GPU: z.boolean().default(true),
  use_cycles: z.boolean().default(true), // cycles or eevee
  use_cycles_denoising: z.boolean().default(false),
  use_adaptive_sampling: z.boolean().default(true),
  resolution_x: z.number().gt(0).default(640), // pixel resolution
  resolution_y: z.number().gt(0).default(360), // pixel resolution
  samples: z.number().gt(0).default(512),

  //  OUTPUT
  numberOfRenders: z.number().default(20), // how many rendered examples

  // temporary variables (dont change anything here)
  // TODO change this in the docker
  metallic: z.array().default(() => []),
  roughness: z.array().default(() => [])
});

export type CompleteBlenderConfiguration = z.infer<
  typeof CompleteBlenderConfigurationObj
>;
export type CompleteBlenderConfigurationKey =
  keyof CompleteBlenderConfiguration;

//CONFIGURATION OBJECT user-editable
export const BlenderConfigurationObject = CompleteBlenderConfigurationObj.pick({
  seed: true,
  test: true,
  out_folder: true,
  bg_paths: true,
  environment_paths: true,
  model_paths: true,
  compute_bbox: true,
  distractor_paths: true,
  max_distractor_objects: true,
  distractor_texture_path: true,
  object_texture_path: true,
  use_bg_image: true,
  use_environment_maps: true,
  emission_min: true,
  emission_max: true,
  light_number_min: true,
  light_number_max: true,
  light_energymin: true,
  light_energymax: true,
  random_color: true,
  cam_rmin: true,
  cam_rmax: true,
  cam_incmin: true,
  cam_incmax: true,
  cam_azimin: true,
  cam_azimax: true,
  obj_location_xmin: true,
  obj_location_xmax: true,
  obj_location_ymin: true,
  obj_location_ymax: true,
  obj_location_zmin: true,
  obj_location_zmax: true,
  cam_rotation_min: true,
  cam_rotation_max: true,
  max_boundingbox: true,
  cam_lens_unit: true,
  cam_lens: true,
  cam_fov: true,
  cam_sensor_height: true,
  cam_sensor_width: true,
  clip_end: true,
  clip_start: true,
  use_GPU: true,
  use_cycles: true,
  use_cycles_denoising: true,
  use_adaptive_sampling: true,
  resolution_x: true,
  resolution_y: true,
  samples: true,
  numberOfRenders: true
});

export type BlenderConfiguration = z.infer<typeof BlenderConfigurationObject>;
export type BlenderConfigurationKey = keyof BlenderConfiguration;

//OUTPUT COCO FILE
export const BlenderOutputImageObj = z.object({
  id: z.number(),
  file_name: z.string(),
  height: z.number(),
  width: z.number()
});

export const BlenderOutputAnnotationsObj = z.object({
  id: z.number(),
  image_id: z.number(),
  bbox: z.array(z.number()).length(4),
  category_id: z.number(),
  segmentation: z.array(),
  iscrowd: z.number(),
  area: z.number(),
  keypoints: z.array(z.array(z.number)),
  num_keypoints: z.number()
});

export type BlenderOutputAnnotations = z.infer<
  typeof BlenderOutputAnnotationsObj
>;

export const BlenderOutputObj = z.object({
  info: z.object(),
  images: z.array(BlenderOutputImageObj),
  annotations: z.array(BlenderOutputAnnotationsObj),
  categories: z.array()
});
