import { Request, Response } from "express";

import Database from "../../connectors/mongo";
import S3 from "../../connectors/s3";

const getBackground = (req: Request, res: Response) => {
  Database.Background.findOne(req.params.id, req.session.user?._id)
    .then((result) => {
      const parts = result.previewImage.split(";");
      const mimType = parts[0].split(":")[1];

      S3.Background.get(result.name, {
        onSuccess: (background) => {
          background.Body?.transformToString("base64")
            .then((background) => {
              const image = `data:${mimType};base64,${background}`;

              res.status(200).json({
                ...result,
                previewImage: image
              });
            })
            .catch(() => res.status(500).end());
        },
        onError: () => res.status(404).end()
      });
    })
    .catch(() => res.status(500).end());
};

export default getBackground;
