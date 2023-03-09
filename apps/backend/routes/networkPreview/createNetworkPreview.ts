import { Response } from "express";
import { ObjectId } from "mongodb";

import { PostNetworkPreview, TypedRequest } from "shared-types";

import Database from "../../connectors/mongo";

const createNetworkPreview = (
  req: TypedRequest<PostNetworkPreview>,
  res: Response
) => {
  const { taskId, image } = req.body;

  Database.NetworkPreview.insertOne({ taskId: new ObjectId(taskId), image })
    .then((value) => res.json(value.insertedId).end())
    .catch((x) => res.status(500).end());
};

export default createNetworkPreview;
