import Button from "@/components/Button";
import Card from "@/components/Card";
import Table, { TableItem, TableHeader } from "@/components/Table";
import { useTaskList } from "@/hooks/task";
import { formatToDateString } from "@/utils/date";
import Link from "next/link";

const TaskList: React.FC = () => {
    const { data: tasks } = useTaskList();
    const data: TableItem[] =
      tasks?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((task) => {
        return {
          ...task,
          href: `/task/${task._id}`,
          createdAt: formatToDateString(task.createdAt)
        };
      }) ?? [];
    const header: TableHeader[] = [
      {
        key: "name",
        title: "Name"
      },
      {
        key: "status",
        title: "Status"
      },
      {
        key: "createdAt",
        title: "Created At"
      }
    ];
  
    return (
      <div className="h-full flex flex-col text-white container mx-auto">
        <Card className="flex justify-between items-center">
          <div>
            <h1 className=" text-3xl">Tasks</h1>
            <span>Task description</span>
          </div>
        </Card>
  
        <Table data={data} header={header} />
      </div>
    );
}

export default TaskList;