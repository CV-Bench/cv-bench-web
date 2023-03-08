import { Request, Response } from "express";

import Database from "../../connectors/mongo";
import { redisClient } from "../../connectors/redis";
import { Socket } from "../../connectors/socket";

const getTask = (req: Request, res: Response) => {
  const taskId = req.params.id;

  console.log("GET TASK", taskId);
  //TODO get rest of the task..
  // redisClient
  //   .get(`taskLog:${taskId}`)
  //   .then((result) => {
  //     if (!result) {
  //       // task log not available
  //       // so request from server and defer sending to socket
  //       Socket.Task.get(taskId);
  //       res.status(404).end();
  //     } else {
  //       res.status(200).send(result);
  //     }
  //   })
  //   .catch((e) => console.error(e));

  Database.Task.findOne(taskId, req.session.user?._id)
    .then((result) => res.status(200).json(result))
    .catch((e) => {
      console.error(e);
      res.status(404).end();
    });
};

export default getTask;
