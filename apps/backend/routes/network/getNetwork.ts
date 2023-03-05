import { Request, Response } from "express";

import Database from "../../connectors/mongo";

const getNetwork = (req: Request, res: Response) => {
  Database.Network.findOne(req.params.id, req.session.user?._id)
    .then((network) => res.json(network))
    .catch(() => res.status(500));
};

export default getNetwork;
