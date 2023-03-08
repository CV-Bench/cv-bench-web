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
import { useTask } from "@/hooks/task";

import { TaskType } from "shared-types";

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
        <Card className="p-4 text-slate-200 divide-y divide-slate-600">
          <p className="text-slate-200 pb-4">General Infos</p>
          <div className="py-4 space-y-2">
            <div className="grid grid-cols-2">
              <InputLabel className="text-slate-400">Name</InputLabel>
              <InputField
                type="text"
                readOnly
                value={task.info.name}
                className="text-slate-200 py-1 bg-transparent px-0"
              />
            </div>
            <div className="grid grid-cols-2">
              <InputLabel className="text-slate-400">Status</InputLabel>
              <div className="h-min">
                <Badge variant={task.status} />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <InputLabel className="text-slate-400">Type</InputLabel>
              <div className="h-min">
                <Badge variant={task.type} />
              </div>
            </div>

            <div className="grid grid-cols-2">
              <InputLabel className="text-slate-400 py-1">
                Created At
              </InputLabel>
              <Date date={task.createdAt} />
            </div>

            <div className="grid grid-cols-2">
              <InputLabel className="text-slate-400 py-1">
                Last Updated
              </InputLabel>
              <Date date={task.updatedAt} />
            </div>
          </div>
        </Card>
        <Card className="h-full p-4 col-span-3 w-full divide-y divide-slate-600">
          <p className="text-slate-200 pb-4">Task Specific Infos</p>
          <div className="py-4 grid-cols-2 space-y-2 w-full">
            {task.type == TaskType.CREATE_DATASET && (
              <DatasetTaskInfo task={task} />
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
