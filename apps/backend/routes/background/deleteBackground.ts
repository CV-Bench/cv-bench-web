import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import Database from "../../connectors/mongo";
import S3 from "../../connectors/s3";

const deleteBackground = (req: Request, res: Response) => {
  const userId = req.session.user?._id;

  Database.Background.findOne(req.params.id, userId)
    .then(({ name }) => {
      const fileExt = name.split(".").pop();

      const promises: Promise<void>[] = [];

      promises.push(
        new Promise((resolve, reject) =>
          Database.Background.deleteOne(req.params.id, userId)
            .then((result) => {
              if (result.deletedCount != 1) {
                return reject();
              }

              resolve();
            })
            .catch(reject)
        )
      );

      const key = `${req.params.id}.${fileExt}`;

      promises.push(S3.Background.delete(key));

      Promise.all(promises)
        .then(() => res.status(200).json({}))
        .catch(() => res.status(500).end());
    })
    .catch(() => res.status(500).end());
};

export default deleteBackground;
