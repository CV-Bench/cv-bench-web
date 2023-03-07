import { Request, Response } from "express";

import Database from "../../connectors/mongo";

const getNetworkList = (req: Request, res: Response) => {
  Database.Network.find(req.session.user?._id)
    .then((result) => {
      result.toArray().then((list) => res.status(200).json(list));
    })
    .catch(() => res.status(500).end());
};

export default getNetworkList;
