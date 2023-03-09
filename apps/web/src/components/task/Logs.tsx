import { formatToDateString } from "@/utils/date";

import Card from "../Card";

interface TaskLogsProps {
  timestamp: number;
  lines: string[];
}

const TaskLogs: React.FC<TaskLogsProps> = ({ timestamp, lines }) => {
  if (lines.length <= 0) {
    return null;
  }

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
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TaskLogs;
