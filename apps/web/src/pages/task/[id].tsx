import Card from "@/components/Card";
import { useTask } from "@/hooks/task";
import { useRouter } from "next/router";

const TaskId = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const { data: task } = useTask(id?.toString() ?? "");




  return (
    <>
      <Card>
        <div>
        </div>
      </Card>
    </>
  );
};

export default TaskId;
