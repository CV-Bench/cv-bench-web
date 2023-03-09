import {
  GetTask,
  NetworkDb,
  TaskDatasetInfo,
  TaskNetworkInfo
} from "shared-types";

import InputField from "../inputs/InputField";
import InputLabel from "../inputs/InputLabel";
import TagInput from "../inputs/TagInput";

export interface NetworkTaskInfoProps
  extends Pick<NetworkDb, "networkArchitectureId" | "datasetId"> {
  showTags?: boolean;
}

const NetworkTaskInfo: React.FC<NetworkTaskInfoProps> = ({
  networkArchitectureId,
  datasetId
}) => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2">
        <InputLabel className="text-slate-400">Dataset ID</InputLabel>
        <InputField
          type="text"
          readOnly
          value={datasetId}
          className="text-slate-200 py-1 bg-transparent px-0"
        />
      </div>
      <div className="grid grid-cols-2">
        <InputLabel className="text-slate-400">Network Architecture</InputLabel>
        <InputField
          type="text"
          readOnly
          value={networkArchitectureId}
          className="text-slate-200 py-1 bg-transparent px-0"
        />
      </div>
    </div>
  );
};

export default NetworkTaskInfo;
