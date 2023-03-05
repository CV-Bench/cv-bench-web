import { GetTask, TaskDatasetInfo, TaskNetworkInfo } from "shared-types";

import InputField from "../inputs/InputField";
import InputLabel from "../inputs/InputLabel";
import TagInput from "../inputs/TagInput";

export interface NetworkTaskInfoProps {
  task: GetTask;
}

const NetworkTaskInfo: React.FC<NetworkTaskInfoProps> = ({ task }) => {
  const info = task.info as TaskNetworkInfo;
  return (
    <div className="pl-3">
      <div>
        <InputLabel>Dataset ID</InputLabel>
        <InputField type="text" readOnly value={info.datasetId} />
      </div>
      <div>
        <InputLabel>Network Architecture</InputLabel>
        <InputField type="text" readOnly value={info.networkArchitectureId} />
      </div>
    </div>
  );
};

export default NetworkTaskInfo;
