import { Response } from "express";

import { StopTask, TypedRequest } from "shared-types";

import { Socket } from "../../connectors/socket";

const stopTask = (req: TypedRequest<StopTask>, res: Response) => {
  Socket.Task.stop(req.body.taskId);

  res.status(200).end();
};

export default stopTask;
