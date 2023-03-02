import Link from "next/link";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Table, { TableHeader, TableItem } from "@/components/Table";
import { useModelList } from "@/hooks/model";
import { useTaskList } from "@/hooks/task";

const TaskList = () => {
  const { data: models } = useTaskList();
  const data: TableItem[] = models ?? [];
  const header: TableHeader[] = [
    {
      key: "_id",
      title: "ID"
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
};

export default TaskList;
