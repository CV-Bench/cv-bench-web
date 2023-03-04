import { Request, Response } from "express";

import Database from "../../connectors/mongo";

const getNetworkArchitectureList = (_: Request, res: Response) => {
  Database.NetworkArchitecture.find()
    .then((result) => res.status(200).json(result.toArray()))
    .catch(() => res.status(500).end());
};

export default getNetworkArchitectureList;
