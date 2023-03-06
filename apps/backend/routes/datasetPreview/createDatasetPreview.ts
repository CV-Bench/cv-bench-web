import { Response } from "express";

import { PostDatasetPreview, TypedRequest } from "shared-types";

import Database from "../../connectors/mongo";

const createDatasetConfiguration = (
  req: TypedRequest<PostDatasetPreview>,
  res: Response
) => {
  const preview = req.body as PostDatasetPreview;
  Database.DatasetPreview.insert(preview)
    .then((value) => res.json(value.insertedId).end())
    .catch((x) => res.status(500).end());
};

export default createDatasetConfiguration;
