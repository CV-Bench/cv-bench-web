import { Request, Response } from "express";
import { redisClient } from "../../connectors/redis";

import { Socket } from "../../connectors/socket";

const getTask = (req: Request, res: Response) => {
//   const taskId = req.params.id;

//   redisClient.get(`taskLog:${taskId}`).then(result => {
//     if(!result){
//         // task log not available
//         // so request from server and defer sending to socket
//         Socket.Task.get(taskId);
//         res.status(404).end();
//     }
//     else {
//         res.status(200).send(result);
//     }
//   });
};

export default getTask;
