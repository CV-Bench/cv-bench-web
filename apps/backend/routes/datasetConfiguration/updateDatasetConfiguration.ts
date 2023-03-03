import { Response } from "express";

import { PatchDatasetConfiguration, TypedRequest } from "shared-types";

import Database from "../../connectors/mongo";

const updateDatasetConfiguration = (
  req: TypedRequest<PatchDatasetConfiguration>,
  res: Response
) => {
  const config = req.body as PatchDatasetConfiguration;
  Database.DatasetConfiguration.updateOne(
    req.params.id,
    req.session.user?._id,
    config
  )
    .then((value) => res.json(req.params.id).end())
    .catch((x) => res.status(500).end());
};

export default updateDatasetConfiguration;
