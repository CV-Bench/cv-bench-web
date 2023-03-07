import { Request, Response } from "express";
import Database from "../../connectors/mongo";

const getDatasetList = (req: Request, res: Response) => {
    const dbResult = await (
        await Database.Dataset.find(req.session.user?._id)
      ).toArray();
      res.json(dbResult);
};

export default getDatasetList;
