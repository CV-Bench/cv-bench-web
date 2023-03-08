import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import Badge from "@/components/Badge";
import Card from "@/components/Card";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";
import { useTaskList } from "@/hooks/task";
import { formatToDateString } from "@/utils/date";

const TaskList: React.FC = () => {
  const { data: tasks } = useTaskList();

  if (!tasks) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="">
        <TableHeader title="Tasks" description="" icon={<Cog6ToothIcon />} />

        <Table
          data={tasks.map(({ createdAt, _id, name, status, type }) => ({
            status: <Badge variant={status} />,
            type: <Badge variant={type} />,
            name,
            href: `/task/${_id}`,
            createdAt: formatToDateString(createdAt)
          }))}
          header={[
            {
              key: "name",
              title: "Name"
            },
            {
              key: "status",
              title: "Status"
            },
            {
              key: "type",
              title: "Type"
            },
            {
              key: "createdAt",
              title: "Created At"
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default TaskList;
