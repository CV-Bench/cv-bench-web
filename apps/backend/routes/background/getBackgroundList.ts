import { Request, Response } from "express";

import Database from "../../connectors/mongo";

const getBackgrounds = (req: Request, res: Response) => {
  Database.Background.find(req.session.user?._id)
    .then((result) =>
      result.toArray().then((backgrounds) => res.status(200).json(backgrounds))
    )
    .catch((e) => {
      console.error(e);
      res.status(500).end();
    });
};

export default getBackgrounds;
