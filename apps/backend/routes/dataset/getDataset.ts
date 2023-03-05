import { Request, Response } from "express";
import Database from "../../connectors/mongo";

const getDataset = (req: Request, res: Response) => {
    Database.Dataset.findOne(req.params.id, req.session.user?._id)
    .then((dataset) => res.json(dataset))
    .catch(() => res.status(500));
};

export default getDataset;
