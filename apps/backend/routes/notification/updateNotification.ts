import { Response } from "express";

import { PatchNotification, TypedRequest } from "shared-types";

import Database from "../../connectors/mongo";

const updateNotification = (
  req: TypedRequest<PatchNotification>,
  res: Response
) => {
  const userId = req.session.user?._id;

  Database.Notification.findOne(req.params.id, req.session.user?._id).then(
    () => {
      Database.Notification.updateOne(req.params.id, userId, {
        isRead: req.body.isRead
      })
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

export default updateNotification;
