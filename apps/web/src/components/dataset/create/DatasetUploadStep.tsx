import React from "react";

import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ToolGeneralSettings from "@/components/inputs/ToolGeneralSettings";

import { AccessType } from "shared-types";

export interface DatasetUploadStepProps {
  name: string;
  tags: string[];
  accessType: AccessType;

  handleChange: (
    key: "domainTags" | "name" | "accessType",
    value: string[] | string | AccessType
  ) => void;
  handleUpload: () => void;
}

const DatasetUploadStep: React.FC<DatasetUploadStepProps> = ({
  name,
  tags,
  accessType,
  handleChange,
  handleUpload
}) => {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div>
          <InputLabel>Tags</InputLabel>
          <TagInput
            tags={tags}
            setTags={(newTags) => handleChange("domainTags", newTags)}
          />
        </div>
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
export default DatasetUploadStep;
