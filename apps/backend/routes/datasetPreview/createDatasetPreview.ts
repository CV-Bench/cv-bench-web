import { Response } from "express";
import { ObjectId } from "mongodb";

import { PostDatasetPreview, TypedRequest } from "shared-types";

import Database from "../../connectors/mongo";

const createDatasetPreview = (
  req: TypedRequest<PostDatasetPreview>,
  res: Response
) => {
  const { taskId, image } = req.body as PostDatasetPreview;

  Database.DatasetPreview.insertOne({ taskId: new ObjectId(taskId), image })
    .then((value) => res.json(value.insertedId).end())
    .catch((x) => res.status(500).end());
};

export default createDatasetPreview;
