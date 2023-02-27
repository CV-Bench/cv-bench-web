import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Database from "../../connectors/mongo";
import S3 from "../../connectors/s3";

const getBackground = (req: Request, res: Response) => {
  const userId = new ObjectId("5d71522dc452f78e335d2d8b") as any;

  Database.Background.findOne(req.params.id, userId)
    .then((result) => {
      const fileExt = result.name.split(".").pop();

      const key = req.params.id + "." + fileExt;
      const parts = result.previewImage.split(";");
      const mimType = parts[0].split(":")[1];

      S3.Background.get(key, {
        onSuccess: (background) => {
          background.Body?.transformToString("base64")
            .then((background) => {
              const image = `data:${mimType};base64,${background}`;

              res.status(200).json({
                ...result,
                previewImage: image,
              });
            })
            .catch(() => res.status(500).end());
        },
        onError: () => res.status(404).end(),
      });
    })
    .catch(() => res.status(500).end());
};

export default getBackground;
