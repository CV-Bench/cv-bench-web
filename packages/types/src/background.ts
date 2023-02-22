import * as z from "zod";
import { DataBody, PostDataBody } from "./utils";

export const BackgroundBody = DataBody.omit({ description: true }).extend({
  previewImage: z.string(),
});

export type BackgroundDb = z.infer<typeof BackgroundBody>;

export const PostBackgroundBody = z.object({
  backgrounds: z.array(
    z.object({
      image: z.string(),
      name: z.string(),
    })
  ),
  domainTags: z.array(z.string()),
});

export type PostBackground = z.infer<typeof PostBackgroundBody>;

// PATCH
export const PatchBackgroundBody = PostDataBody.omit({
  name: true,
  description: true,
});

export type PatchBackground = z.infer<typeof PatchBackgroundBody>;
