import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Card from "@/components/Card";
import DatasetPreviewImages from "@/components/task/DatasetPreviewImages";
import DatasetTaskInfo from "@/components/task/DatasetTaskInfo";
import TaskLogs from "@/components/task/Logs";
import NetworkMetricsPage from "@/components/task/NetworkMetrics";
import NetworkTaskInfo from "@/components/task/NetworkTaskInfo";
import TaskGeneralInfos from "@/components/task/TaskGeneralInfos";
import { useTask } from "@/hooks/task";
import { useSocket } from "@/hooks/useSocket";

import {
  TaskDatasetInfo,
  TaskLogUpdateData,
  TaskNetworkInfo,
  TaskType
} from "shared-types";

const TaskId = () => {
  const router = useRouter();
  const { id: taskId } = router.query as { id: string };
  const socket = useSocket();
  const { data: task } = useTask(taskId?.toString() ?? "");
  const [taskLog, setTaskLog] = useState<TaskLogUpdateData>();

  useEffect(() => {
    if (!socket || !taskId) {
      return;
    }

    socket.on("task_log", (data) => {
      console.log("TASK LOG", data);
      setTaskLog(data);
    });

    // sub on component mount
    socket.emit("subscribe_task_log", { taskId });

    // unsub on component unmount
    return () => {
      socket.emit("unsubscribe_task_log", { taskId });
    };
  }, [socket, taskId]);

  if (!task) {
    return null;
  }

  return (
    <div className="flex flex-col container mx-auto py-8 space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <TaskGeneralInfos
          name={task.info.name}
          accessType={task.info.accessType}
          status={task.status}
          type={task.type}
          createdAt={task.createdAt}
          updatedAt={task.updatedAt}
        />

        <Card className="h-full p-4 col-span-3 w-full divide-y divide-slate-600">
          <p className="text-slate-200 pb-4">Task Specific Infos</p>
          <div className="py-4 grid-cols-2 space-y-2 w-full">
            {task.type == TaskType.CREATE_DATASET && (
              <DatasetTaskInfo {...(task.info as TaskDatasetInfo)} />
            )}
            {task.type == TaskType.CREATE_NETWORK && (
              <NetworkTaskInfo {...(task.info as TaskNetworkInfo)} />
            )}
          </div>
        </Card>
      </div>

      {task.type === TaskType.CREATE_DATASET && (
        <DatasetPreviewImages taskId={task._id} />
      )}
      {task.type == TaskType.CREATE_NETWORK && taskLog && taskLog.metrics && (
        <NetworkMetricsPage
          metrics={taskLog.metrics}
          timestamp={taskLog.timestamp}
        />
      )}

      {taskLog && (
        <TaskLogs timestamp={taskLog.timestamp} lines={taskLog.lines} />
      )}
    </div>
  );
};

export default TaskId;
