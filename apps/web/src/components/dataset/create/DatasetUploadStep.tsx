import React from "react";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";

import { AccessType } from "shared-types";
import TagInput from "@/components/inputs/TagInput";

export interface DatasetUploadStepProps {
  name?: string;
  setName: (val: string) => void;

  tags: string[];
  setTags: (val: string[]) => void;

  accessType?: AccessType;
  setAccessType: (val: AccessType) => void;
}

const DatasetUploadStep: React.FC<DatasetUploadStepProps> = ({
  name,
  setName,
  tags,
  setTags,
  accessType,
  setAccessType
}) => {
  return (
    <>
    <Card className="mb-4">
      <div>
        <InputLabel>Tags</InputLabel>
        <TagInput tags={tags} setTags={setTags}/>
      </div>
    </Card>
    <Card className="flex p-0">
      <div className="flex-1 pr-4">
        <div>
          <InputLabel>Name</InputLabel>
          <InputField
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
            type="text"
          />
        </div>
        <AccessTypeInput
          className="mt-3"
          accessType={accessType}
          setAccessType={setAccessType}
        />
      </div>
      <div className="border-l -my-4 border-indigo-50"></div>
      <div className="flex-1 pl-4">
      </div>
    </Card>
    </>
  );
};
export default DatasetUploadStep;
