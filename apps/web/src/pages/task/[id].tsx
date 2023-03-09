import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInterval } from "react-use";

import Card from "@/components/Card";
import DatasetPreviewImages from "@/components/task/DatasetPreviewImages";
import DatasetTaskInfo from "@/components/task/DatasetTaskInfo";
import TaskLogs from "@/components/task/Logs";
import NetworkMetricsPage from "@/components/task/NetworkMetrics";
import NetworkTaskInfo from "@/components/task/NetworkTaskInfo";
import TaskGeneralInfos from "@/components/task/TaskGeneralInfos";
import { useTask, useTaskLog } from "@/hooks/task";
import { api } from "@/network";

import {
  RouteNames,
  TaskDatasetInfo,
  TaskNetworkInfo,
  TaskType,
  getRoute
} from "shared-types";

const TaskId = () => {
  const router = useRouter();
  const { id: taskId } = router.query as { id: string };
  const { data: task } = useTask(taskId?.toString() ?? "");
  const { data: taskLog, mutate } = useTaskLog(taskId);

  useInterval(() => {
    mutate();
  }, 1000);

  useEffect(() => {
    if (!taskId) {
      return;
    }

    // sub on component mount
    api.subscribeTaskLog(taskId);

    // unsub on component unmount
    return () => {
      api.unsubscribeTaskLog(taskId);
    };
  }, [taskId]);

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
