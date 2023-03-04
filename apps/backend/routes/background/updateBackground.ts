import { Response } from "express";

import { PatchBackground, TypedRequest } from "shared-types";

import Database from "../../connectors/mongo";

const updateBackground = (
  req: TypedRequest<PatchBackground>,
  res: Response
) => {
  Database.Background.updateOne(req.params.id, req.session.user?._id, req.body)
    .then((result) => {
      if (result.matchedCount < 1) {
        return res.status(404).end();
      }

      res.status(200).json({});
    })
    .catch(() => {
      res.status(500).end();
    });
};

export default updateBackground;
