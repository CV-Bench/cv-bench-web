import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";

import { AccessType } from "shared-types";

export interface TrainStepProps {
  name?: string;
  tags?: string[];
  accessType?: AccessType;
  onSetName: (name: string) => void;
  onSelectAccessType: (accessType: AccessType) => void;
  onSelectTags: (tags: string[]) => void;
}

const TrainStep: React.FC<TrainStepProps> = (props) => {
  return (
    <>
      <div className="m-2">
        <Card className="flex flex-col h-full">
          <InputLabel>Tags</InputLabel>
          <TagInput
            tags={props.tags}
            setTags={props.onSelectTags}
            placeholder="Tags"
          />
        </Card>
      </div>

      <div className="m-2">
        <Card className="flex p-0  ">
          <div className="flex-1 p-4">
            <InputLabel>Name</InputLabel>
            <input
              type="text"
              className="w-full block rounded-md bg-slate-700 border-none text-white placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-0 "
              placeholder={"Enter a name for the task"}
              value={props.name}
              onChange={(e) => props.onSetName(e.target.value)}
              required={true}
            />
          </div>
          <div className="border-l border-indigo-50"></div>
          <div className="flex-1 p-4">
            <AccessTypeInput
              accessType={props.accessType}
              className="mt-3"
              setAccessType={props.onSelectAccessType}
            />
          </div>
        </Card>
      </div>
    </>
  );
};
export default TrainStep;
