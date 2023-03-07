import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ToolGeneralSettings from "@/components/inputs/ToolGeneralSettings";

import { AccessType } from "shared-types";

export interface TrainStepProps {
  name: string;
  tags: string[];
  accessType: AccessType;
  handleUpload: () => void;
  handleChange: (
    key: "accessType" | "name" | "domainTags",
    value: string | string[] | AccessType
  ) => void;
}

const TrainStep: React.FC<TrainStepProps> = ({
  name,
  accessType,
  tags,
  handleChange,
  handleUpload
}) => {
  return (
    <div className="space-y-4">
      <Card className="flex flex-col h-full p-4">
        <InputLabel>Tags</InputLabel>
        <TagInput
          tags={tags}
          setTags={(newTags) => handleChange("domainTags", newTags)}
          placeholder="Tags"
        />
      </Card>

      <ToolGeneralSettings
        name={name}
        accessType={accessType}
        handleChange={handleChange}
        handleUpload={handleUpload}
      />
    </div>
  );
};
export default TrainStep;
