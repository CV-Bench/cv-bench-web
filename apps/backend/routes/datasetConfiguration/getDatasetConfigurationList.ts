import { Request, Response } from "express";
import Database from "../../connectors/mongo";

const getDatasetConfigurationList = async (req: Request, res: Response) => {

  (await Database.DatasetConfiguration.find(req.session.user?._id)).toArray().then(x => res.json(x));

};

export default getDatasetConfigurationList;
