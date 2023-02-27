import { Request, Response } from "express";
import { PostBackground } from "types";
import { ObjectId } from "mongodb";
import sharp from "sharp";
import Database from "../../connectors/mongo";
import S3 from "../../connectors/s3";

const resizeImage = (
  newWidth: number,
  newHeight: number,
  image: Buffer,
  mimType: string
) =>
  new Promise<string>((resolve) => {
    sharp(image)
      .resize(newWidth, newHeight)
      .toBuffer()
      .then((imgBuffer: Buffer) =>
        resolve(`data:${mimType};base64,${imgBuffer.toString("base64")}`)
      );
  });

const uploadBackground = (
  req: Omit<Request, "body"> & { body: PostBackground },
  res: Response
) => {
  const { domainTags, accessType, backgrounds } = req.body;

  const promises: Promise<any>[] = [];

  backgrounds.map(({ name, image }) => {
    const newId = new ObjectId();

    const parts = image.split(";");
    const mimType = parts[0].split(":")[1];
    const imageData = parts[1].split(",")[1];

    const img = Buffer.from(imageData, "base64");

    promises.push(
      new Promise<void>((resolve) => {
        resizeImage(128, 128, img, mimType).then((resizedImage) => {
          Database.Background.insertOne({
            _id: newId,
            userId: req.session.user?._id,
            name,
            domainTags,
            accessType,
            previewImage: resizedImage,
          });

          resolve();
        });
      })
    );

    const key = `${newId}.${name.split(".").pop()}`;

    promises.push(S3.Background.put(img, key));
  });

  Promise.all(promises)
    .then(() => res.status(200).json({}))
    .catch(() => res.status(500).json({}));
};

export default uploadBackground;
