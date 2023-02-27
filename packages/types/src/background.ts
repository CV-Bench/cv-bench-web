import * as z from "zod";
import { AccessType, DataBody, PostDataBody } from "./utils";

export const BackgroundBody = DataBody.omit({ description: true }).extend({
  previewImage: z.string(),
});

export type BackgroundDb = z.infer<typeof BackgroundBody>;

// POST
export const PostBackgroundBody = z.object({
  backgrounds: z.array(
    z.object({
      image: z.string(),
      name: z.string(),
    })
  ),
  domainTags: z.array(z.string()),
  accessType: z.nativeEnum(AccessType),
});

export type PostBackground = z.infer<typeof PostBackgroundBody>;

export const PostBackgroundResponseBody = z.object({});
export type PostBackgroundResponse = z.infer<typeof PostBackgroundResponseBody>;

// PATCH
export const PatchBackgroundBody = PostDataBody.pick({
  accessType: true,
  domainTags: true,
});

export type PatchBackground = z.infer<typeof PatchBackgroundBody>;

// GET SINGLE BACKGROUND
export const GetBackgroundBody = BackgroundBody.omit({
  createdAt: true,
  updatedAt: true,
}).extend({
  createdAt: z.string().transform((d) => new Date(d)),
  updatedAt: z.string().transform((d) => new Date(d)),
});
export type GetBackground = z.infer<typeof GetBackgroundBody>;

// GET BACKGROUNDS
export const GetBackgroundListBody = z.array(GetBackgroundBody);
export type GetBackgroundList = z.infer<typeof GetBackgroundListBody>;
