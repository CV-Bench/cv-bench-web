import { Request, Response } from "express";

import Database from "../../connectors/mongo";

const getDatasetPreview = (req: Request, res: Response) => {
  // Database.DatasetPreview.find(req.params.id, req.session.user?._id)
  // .then((datasetPreviews) => res.json(datasetPreviews))
  // .catch(() => res.status(500));
};

export default getDatasetPreview;
