import { Request, Response } from "express";

import Database from "../../connectors/mongo";
import S3 from "../../connectors/s3";

const deleteBackground = (req: Request, res: Response) => {
  const userId = req.session.user?._id;

  Database.Background.findOne(req.params.id, userId)
    .then(({ name }) => {
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

      promises.push(S3.Background.delete(name));

      Promise.all(promises)
        .then(() => res.status(200).json({}))
        .catch(() => res.status(500).end());
    })
    .catch(() => res.status(500).end());
};

export default deleteBackground;
