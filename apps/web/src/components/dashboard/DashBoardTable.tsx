import { CpuChipIcon } from "@heroicons/react/20/solid";

import { useTaskList } from "@/hooks/task";
import { formatToDateString } from "@/utils/date";

import Badge from "../Badge";
import Card from "../Card";
import Table from "../Table";
import TableHeader from "../TableHeader";

const DashboardTable: React.FC = () => {
  const { data: tasks } = useTaskList();

  if (!tasks) {
    return null;
  }

  return (
    <Card>
      <TableHeader title="Recent Tasks" description="" icon={<CpuChipIcon />} />
      <Table
        header={[
          {
            title: "Name",
            key: "name"
          },
          { title: "Last updated", key: "updatedAt" },
          { title: "Status", key: "status" },
          { title: "type", key: "type" }
        ]}
        data={tasks.slice(0, 7).map(({ name, updatedAt, status, type }) => ({
          name,
          updatedAt: formatToDateString(updatedAt),
          status: <Badge variant={status} />,
          type: <Badge variant={type} />
        }))}
        minItems={7}
        showMoreButton={{
          text: "See complete task list",
          href: "/task"
        }}
      />
    </Card>
  );
};

export default DashboardTable;
