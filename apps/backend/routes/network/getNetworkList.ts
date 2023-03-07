import { Request, Response } from "express";
import Database from "../../connectors/mongo";

const getNetworkList = (req: Request, res: Response) => {
    const dbResult = await (
        await Database.Network.find(req.session.user?._id)
      ).toArray();
      res.json(dbResult);
};

export default getNetworkList;
