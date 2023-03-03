import { Request, Response } from "express";
import Database from "../../connectors/mongo";

const getDatasetConfiguration = async (req: Request, res: Response) => {
  Database.DatasetConfiguration.findOne(req.params.id, req.session.user?._id).then(x => res.json(x));
};

export default getDatasetConfiguration;
