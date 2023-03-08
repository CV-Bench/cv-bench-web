import { useRouter } from "next/router";

import Badge from "@/components/Badge";
import Card from "@/components/Card";
import Date from "@/components/Date";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import DatasetPreviewImages from "@/components/task/DatasetPreviewImages";
import DatasetTaskInfo from "@/components/task/DatasetTaskInfo";
import TaskLogs from "@/components/task/Logs";
import NetworkTaskInfo from "@/components/task/NetworkTaskInfo";
import TaskGeneralInfos from "@/components/task/TaskGeneralInfos";
import { useTask } from "@/hooks/task";

import { TaskDatasetInfo, TaskType } from "shared-types";

const TaskId = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: task } = useTask(id?.toString() ?? "");

  if (!task) {
    return null;
  }

  return (
    <div className="flex flex-col container mx-auto py-8 space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <TaskGeneralInfos
          name={task.info.accessType}
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
              <NetworkTaskInfo task={task} />
            )}
          </div>
        </Card>
      </div>

      {task.type === TaskType.CREATE_DATASET && (
        <DatasetPreviewImages taskId={task._id} />
      )}

      <TaskLogs taskId={task._id} />
    </div>
  );
};

export default TaskId;
