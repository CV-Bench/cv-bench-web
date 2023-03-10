import { Response } from "express";
import { ObjectId } from "mongodb";

import { PostDataset, TaskStatus, TaskType, TypedRequest } from "shared-types";

import Database from "../../connectors/mongo";
import { Socket } from "../../connectors/socket";

const createDataset = (req: TypedRequest<PostDataset>, res: Response) => {
  Database.Task.insert({
    userId: new ObjectId(req.session.user?._id),
    status: TaskStatus.PENDING,
    type: TaskType.CREATE_DATASET,
    name: req.body.name,
    info: {
      name: req.body.name,
      domainTags: req.body.domainTags,
      accessType: req.body.accessType,

      modelIds: req.body.modelIds,
      distractorIds: [],
      backgroundIds: req.body.backgroundIds,
      configurationId: req.body.configurationId
    }
  })
    .then((result) => {
      const insertedId = result.insertedId.toString();

      Socket.Task.start(insertedId);

      res.status(200).json({ _id: insertedId });
    })
    .catch(() => res.status(500).end());
};

export default createDataset;
