import Card from "@/components/Card";
import Date from "@/components/Date";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import DatasetTaskInfo from "@/components/task/DatasetTaskInfo";
import { useTask } from "@/hooks/task";
import { useRouter } from "next/router";
import { TaskType } from "shared-types";

const TaskId = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const { data: task } = useTask(id?.toString() ?? "");

  return (
    <>
      {task &&
      <Card className="h-1/2 text-white flex">
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
        <div className="w-2/3">
          {task.type == TaskType.CREATE_DATASET && <DatasetTaskInfo task={task} />}
        </div>
      </Card>}
    </>
  );
};

export default TaskId;
