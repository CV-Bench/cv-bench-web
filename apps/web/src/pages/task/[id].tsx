import Card from "@/components/Card";
import { useTask } from "@/hooks/task";
import { useRouter } from "next/router";

const TaskId = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const { data: task } = useTask(id?.toString() ?? "");


  console.log(task)

  return (
    <>
      <Card className="h-1/2">
        <div>
          {task?.type}
        </div>
        <div>
          {task?.status}
        </div>
        <div>
 
        </div>
      </Card>
    </>
  );
};

export default TaskId;
