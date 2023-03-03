import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import Database from "../../connectors/mongo";

const deleteNotification = (req: Request, res: Response) => {
  const userId = req.session.user?._id;

  Database.Notification.findOne(req.params.id, userId).then(
    () => {
      Database.Notification.deleteOne(req.params.id, userId)
        .then(() => {
          res.status(200).end();
        })
        .catch((e) => {
          console.error(e);
          res.status(500).end();
        });
    },
    () => {
      res.status(404).end();
    }
  );
};

export default deleteNotification;
