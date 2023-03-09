import Date from "@/components/Date";

import { AccessType, TaskStatus, TaskType } from "shared-types";

import Badge from "../Badge";
import Card from "../Card";
import InputField from "../inputs/InputField";
import InputLabel from "../inputs/InputLabel";

interface TaskGeneralInfosProps {
  name: string;
  status?: TaskStatus;
  accessType: AccessType;
  type?: TaskType;
  createdAt: Date;
  updatedAt: Date;
}

const TaskGeneralInfos: React.FC<TaskGeneralInfosProps> = ({
  name,
  status,
  accessType,
  type,
  createdAt,
  updatedAt
}) => {
  return (
    <Card className="p-4 text-slate-200 divide-y divide-slate-600">
      <p className="text-slate-200 pb-4">General Infos</p>
      <div className="py-4 space-y-2">
        <div className="grid grid-cols-2">
          <InputLabel className="text-slate-400">Name</InputLabel>
          <InputField
            type="text"
            readOnly
            value={name}
            className="text-slate-200 py-1 bg-transparent px-0"
          />
        </div>
        <div className="grid grid-cols-2">
          <InputLabel className="text-slate-400">Status</InputLabel>
          <div className="h-min">
            <Badge variant={status} />
          </div>
        </div>
        <div className="grid grid-cols-2">
          <InputLabel className="text-slate-400">Access Type</InputLabel>
          <div className="h-min">
            <Badge variant={accessType} />
          </div>
        </div>
        {type && (
          <div className="grid grid-cols-2">
            <InputLabel className="text-slate-400">Type</InputLabel>
            <div className="h-min">
              <Badge variant={type} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2">
          <InputLabel className="text-slate-400 py-1">Created At</InputLabel>
          <Date date={createdAt} />
        </div>

        <div className="grid grid-cols-2">
          <InputLabel className="text-slate-400 py-1">Last Updated</InputLabel>
          <Date date={updatedAt} />
        </div>
      </div>
    </Card>
  );
};

export default TaskGeneralInfos;
