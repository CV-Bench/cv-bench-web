import { Response } from "express";

import { PostDatasetConfiguration, TypedRequest } from "shared-types";

import Database from "../../connectors/mongo";

const createDatasetConfiguration = (
  req: TypedRequest<PostDatasetConfiguration>,
  res: Response
) => {
  const config = req.body as PostDatasetConfiguration;
  Database.DatasetConfiguration.insert(config, req.session.user?._id)
    .then((value) => res.json(value.insertedId).end())
    .catch((x) => res.status(500).end());
};

export default createDatasetConfiguration;
