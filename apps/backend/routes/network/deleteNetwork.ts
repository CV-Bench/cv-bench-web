import { Request, Response } from "express";

import { DataType } from "shared-types";

import Database from "../../connectors/mongo";
import S3 from "../../connectors/s3";
import { Socket } from "../../connectors/socket";

const deleteNetwork = (req: Request, res: Response) => {
  Database.Network.findOne(req.params.id, req.session.user?._id)
    .then((network) => {
      const actions: Promise<any>[] = [];
      if (network.s3Key) {
        actions.push(S3.Network.delete(network.s3Key));
      }
      actions.push(
        Database.Network.deleteOne(req.params.id, req.session.user?._id)
      );

      Socket.Data.deleteData(req.params.id, DataType.NETWORK);

      Promise.all(actions).then(() => res.status(200));
    })
    .catch(() => res.status(500));
};

export default deleteNetwork;
