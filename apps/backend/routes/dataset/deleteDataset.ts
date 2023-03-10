import { Request, Response } from "express";

import { DataType } from "shared-types";

import Database from "../../connectors/mongo";
import S3 from "../../connectors/s3";
import { Socket } from "../../connectors/socket";

const deleteDataset = (req: Request, res: Response) => {
  Database.Dataset.findOne(req.params.id, req.session.user?._id)
    .then((network) => {
      const actions: Promise<any>[] = [];
      if (network.s3Key) {
        actions.push(S3.Dataset.delete(network.s3Key));
      }
      actions.push(
        Database.Network.deleteOne(req.params.id, req.session.user?._id)
      );

      Socket.Data.deleteData(req.params.id, DataType.DATASET);

      Promise.all(actions)
        .then(() => res.status(200).end())
        .catch(() => res.status(500).end());
    })
    .catch(() => res.status(500).end());
};

export default deleteDataset;
