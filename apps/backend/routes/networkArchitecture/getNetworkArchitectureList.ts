import { Request, Response } from "express";

import Database from "../../connectors/mongo";

const getNetworkArchitectureList = (_: Request, res: Response) => {
  Database.NetworkArchitecture.find()
    .then((result) =>
      result.toArray().then((list) => res.status(200).json(list))
    )
    .catch(() => res.status(500).end());
};

export default getNetworkArchitectureList;
