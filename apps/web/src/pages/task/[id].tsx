import { useRouter } from "next/router";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

import Card from "@/components/Card";
import Date from "@/components/Date";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import DatasetTaskInfo from "@/components/task/DatasetTaskInfo";
import NetworkTaskInfo from "@/components/task/NetworkTaskInfo";
import { useTask } from "@/hooks/task";
import { useSocket } from "@/hooks/useSocket";

import {
  FrontendNamespaceClientToServerEvents,
  FrontendNamespaceServerToClientEvents,
  TaskType
} from "shared-types";

const TaskId = () => {
  const router = useRouter();
  const { id } = router.query;
  let socket: Socket<
    FrontendNamespaceServerToClientEvents,
    FrontendNamespaceClientToServerEvents
  >;

  useSocket().then((s) => {
    socket = s!;
  });

  useEffect(() => {
    // sub on component mount
    socket?.emit("subscribe_task_log", { taskId: id as string });

    // unsub on component unmount
    return () => {
      socket?.emit("unsubscribe_task_log", { taskId: id as string });
    };
  }, []);

  const { data: task } = useTask(id?.toString() ?? "");

  return (
    <div className="flex flex-col h-full container mx-auto">
      {task && (
        <div className="h-2/3">
          <Card className="h-full text-white flex">
            <div className="w-1/3">
              <div>
                <InputLabel>Type</InputLabel>
                <InputField type="text" readOnly value={task.type} />
              </div>
              <div>
                <InputLabel>Status</InputLabel>
                <InputField type="text" readOnly value={task.status} />
              </div>
              <div>
                <InputLabel>Created At</InputLabel>
                <Date date={task.createdAt} />
              </div>
              <div>
                <InputLabel>Updated At</InputLabel>
                <Date date={task.updatedAt} />
              </div>
            </div>
            <div className="w-2/3 overflow-auto">
              {task.type == TaskType.CREATE_DATASET && (
                <DatasetTaskInfo task={task} />
              )}
              {task.type == TaskType.CREATE_NETWORK && (
                <NetworkTaskInfo task={task} />
              )}
            </div>
          </Card>
        </div>
      )}

      <div className="h-1/3 pt-3">
        <Card className="h-full text-white">Logs</Card>
      </div>
    </div>
  );
};

export default TaskId;
