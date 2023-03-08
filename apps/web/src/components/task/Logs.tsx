import Card from "../Card";

interface TaskLogsProps {
  taskId: string;
}

const TaskLogs: React.FC<TaskLogsProps> = ({ taskId }) => {
  return (
    <Card className="p-4 divide-y divide-slate-600">
      <p className="text-slate-200 pb-4">Logs</p>
      <div></div>
    </Card>
  );
};

export default TaskLogs;
