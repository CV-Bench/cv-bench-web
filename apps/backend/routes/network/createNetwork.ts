import { Response } from "express";
import { ObjectId } from "mongodb";

import { PostNetwork, TaskStatus, TaskType, TypedRequest } from "shared-types";

import Database from "../../connectors/mongo";
import { Socket } from "../../connectors/socket";

const createNetwork = (req: TypedRequest<PostNetwork>, res: Response) => {
  Database.Task.insert({
    userId: new ObjectId(req.session.user?._id),
    status: TaskStatus.PENDING,
    type: TaskType.CREATE_NETWORK,
    name: req.body.name,
    info: {
      name: req.body.name,
      domainTags: req.body.domainTags,
      accessType: req.body.accessType,

      datasetId: req.body.datasetId,
      networkArchitectureId: req.body.networkArchitectureId
    }
  })
    .then((result) => {
      const insertedId = result.insertedId.toString();

      Socket.Task.start(insertedId);

      res.status(200).json({ _id: insertedId });
    })
    .catch(() => res.status(500).end());
};

export default createNetwork;
