import { formatToDateString } from "@/utils/date";

import { DatasetLogUpdateData, TaskLogUpdateData } from "shared-types";

import Card from "../Card";

interface TaskLogsProps {
  taskLog: TaskLogUpdateData | undefined;
}

const TaskLogs: React.FC<TaskLogsProps> = ({ taskLog }) => {
  if (!taskLog) {
    return null;
  }

  const { timestamp, data } = taskLog as Omit<TaskLogUpdateData, "data"> &
    DatasetLogUpdateData;

  return (
    <Card className="p-4 divide-y divide-slate-600">
      <div className="space-x-4 flex items-center pb-4 justify-between">
        <p className="text-slate-200">Logs</p>
        <p className="text-slate-400 text-sm">
          Last updated: {formatToDateString(new Date(timestamp * 1000))}
        </p>
      </div>
      <div className="pt-4">
        <div className="bg-gray-900 text-slate-400 p-4 rounded shadow">
          {data.map((line) => (
            <p>{line}</p>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TaskLogs;
