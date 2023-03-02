import * as z from "zod";

import { ObjId } from "./utils";

export enum ConfigurationType {
  "BLENDER"
}

export enum ComputeBbox {
  FAST = "fast",
  TIGHT = "tight"
}

export enum CamLensUnit {
  FOV = "FOV",
  MILLIMETERS = "MILLIMETERS"
}

//CONFIGURATION OBJECT user-editable
export const BlenderConfigurationObject = z.object({
  input: z.object({
    object: z.array(z.string()), // Object UIDs
    distractor: z.array(z.string()), // Distractor UIDs
    bg: z.array(z.string()) // Background UIDs
  }),

  output: z.object({
    images: z.number().int().gt(0), // Anzahl ausgegebener Bilder
    just_merge: z.number().gte(0).lte(1), // Proportion von Bildern die nur durch Merging erzeugt werden
    "skew_angle:material": z.number().gte(0) // Verhältnis von Winkel-Samples zu Material-Samples
  }),

  render: z.object({
    camera: z.object({
      lens_unit: z.nativeEnum(CamLensUnit),
      lens: z.number().gt(0), // °|mm
      clip_start: z.number().gte(0).default(0.1), // reine Performance, muss man nicht unbedingt einstellen können
      clip_end: z.number().gte(0).default(50) // nur für sehr entfernte Objekte (= gar nicht) sinnvoll
    }),

    resolution_x: z.number().int().gt(0).default(640), // px
    resolution_y: z.number().int().gt(0).default(360), // px

    model_scale: z.number().gt(0).default(1), //fragwürdig
    exposure: z.number().gte(0).default(40),
    compute_bbox: z.nativeEnum(ComputeBbox).default(ComputeBbox.FAST),
    use_fps_keypoints: z.boolean().default(false), //muss nicht unbedgingt user-einstellbar sein

    use_cycles: z.boolean().default(true), // sollte immer true sein
    samples: z.number().int().gte(10).lte(60).default(60), // sinnvolle obere Grenze ca. 60, unter 10 sinnlos
    use_cycles_donoising: z.boolean().default(false), // sollte erstmal immer false sein
    use_adaptive_sampling: z.boolean().default(false), // sollte erstmal immer false sein
    use_GPU: z.boolean().default(true) // sollte immer true sein
  }),

  random: z.object({
    // Config nimmt entweder [a,b] range oder konstante Zahl. Für b<=a nimmt die Übersetzerfunktion a als konstante Zahl.
    min_distractors: z.number().int().gte(0),
    max_distractors: z.number().int().gte(0),

    min_x_pos: z.number(),
    max_x_pos: z.number(),
    min_y_pos: z.number(),
    max_y_pos: z.number(),
    min_z_pos: z.number(),
    max_z_pos: z.number(),

    min_inc: z.number(),
    max_inc: z.number(),
    min_azi: z.number(),
    max_azi: z.number(),

    min_metallic: z.number().gte(0).lte(1),
    max_metallic: z.number().gte(0).lte(1),
    min_roughness: z.number().gte(0).lte(1),
    max_roughness: z.number().gte(0).lte(1)
  })
});

export type BlenderConfiguration = z.infer<typeof BlenderConfigurationObject>;
export type BlenderConfigurationKey = keyof BlenderConfiguration;

export const DatasetConfigurationBody = z.object({
  _id: ObjId,
  userId: ObjId,
  name: z.string(),
  createdAt: z.string(),
  configurationType: z.nativeEnum(ConfigurationType),
  configuration: BlenderConfigurationObject
});
export type DatasetConfigurationDb = z.infer<typeof DatasetConfigurationBody>;

export const PostDatasetConfigurationBody = DatasetConfigurationBody.pick({
  name: true,
  configurationType: true,
  configuration: true
});
export type PostDatasetConfiguration = z.infer<
  typeof PostDatasetConfigurationBody
>;

export function configurationToJSON(conf: BlenderConfiguration): string {
  return JSON.stringify({
    input: conf.input,
    output: conf.output,
    render: conf.render,
    random: {
      distractors:
        conf.random.min_distractors < conf.random.max_distractors
          ? [conf.random.min_distractors, conf.random.max_distractors]
          : conf.random.min_distractors,
      x_pos:
        conf.random.min_x_pos < conf.random.max_x_pos
          ? [conf.random.min_x_pos, conf.random.max_x_pos]
          : conf.random.min_x_pos,
      y_pos:
        conf.random.min_y_pos < conf.random.max_y_pos
          ? [conf.random.min_y_pos, conf.random.max_y_pos]
          : conf.random.min_y_pos,
      z_pos:
        conf.random.min_z_pos < conf.random.max_z_pos
          ? [conf.random.min_z_pos, conf.random.max_z_pos]
          : conf.random.min_z_pos,
      inc:
        conf.random.min_inc < conf.random.max_inc
          ? [conf.random.min_inc, conf.random.max_inc]
          : conf.random.min_inc,
      azi:
        conf.random.min_azi < conf.random.max_azi
          ? [conf.random.min_azi, conf.random.max_azi]
          : conf.random.min_azi,
      metallic:
        conf.random.min_metallic < conf.random.max_metallic
          ? [conf.random.min_metallic, conf.random.max_metallic]
          : conf.random.min_metallic,
      roughness:
        conf.random.min_roughness < conf.random.max_roughness
          ? [conf.random.min_roughness, conf.random.max_roughness]
          : conf.random.min_roughness
    }
  });
}
