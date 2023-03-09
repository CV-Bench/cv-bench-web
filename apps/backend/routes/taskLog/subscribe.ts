import { Response } from "express";

import { TaskLogTrigger, TypedRequest } from "shared-types";

import { handleTaskSubscription } from "../../util/taskSubscription";

const SubscribeTaskLog = (req: TypedRequest<TaskLogTrigger>, res: Response) => {
  handleTaskSubscription(
    { taskId: req.body.taskId, userId: req.session.user?._id },
    "subscribe_task_log"
  )
    .then(() => res.status(200).json({}))
    .catch(() => res.status(500).json({}));
};

export default SubscribeTaskLog;
