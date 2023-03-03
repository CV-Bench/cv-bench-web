import { Request, Response } from "express";

import Database from "../../connectors/mongo";

const getNotifications = (req: Request, res: Response) => {
  Database.Notification.find(req.session.user?._id)
    .then((result) =>
      result.toArray().then((notifications) => res.status(200).json(notifications))
    )
    .catch((e) => {
      console.error(e);
      res.status(500).end();
    });
};

export default getNotifications;
