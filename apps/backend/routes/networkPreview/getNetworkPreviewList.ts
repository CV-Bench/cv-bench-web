import { Request, Response } from "express";

import { AccessType } from "shared-types";

import Database from "../../connectors/mongo";

const getNetworkPreviewList = (req: Request, res: Response) => {
  const taskId = req.params.id;

  Database.Task.findOne(taskId, undefined).then((result) => {
    const { info, userId } = result;

    const isUserRequesting = userId.toString() === req.session.user?._id;

    if (!isUserRequesting && info.accessType != AccessType.PUBLIC) {
      res.status(403).end();
      return;
    }

    Database.NetworkPreview.find(taskId).then((results) =>
      results.toArray().then((list) => res.status(200).json(list))
    );
  });
};

export default getNetworkPreviewList;
