import { Response } from "express";

import { TaskLogTrigger, TypedRequest } from "shared-types";

import { handleTaskSubscription } from "../../util/taskSubscription";

const UnsubscribeTaskLog = (
  req: TypedRequest<TaskLogTrigger>,
  res: Response
) => {
  handleTaskSubscription(
    { taskId: req.body.taskId, userId: req.session.user?._id },
    "unsubscribe_task_log"
  )
    .then(() => res.status(200).json({}))
    .catch(() => res.status(500).json({}));
};

export default UnsubscribeTaskLog;
