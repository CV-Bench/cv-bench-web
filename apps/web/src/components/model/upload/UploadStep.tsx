import React from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";

import { AccessType } from "shared-types";

export interface UploadStepProps {
  name?: string;
  setName: (val: string) => void;

  accessType?: AccessType;
  setAccessType: (val: AccessType) => void;
}

const UploadStep: React.FC<UploadStepProps> = ({
  name,
  setName,
  accessType,
  setAccessType
}) => {
  return (
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
        {/* <InputLabel>Upload</InputLabel>
        <Button className="m-2">Upload</Button> */}
      </div>
    </Card>
  );
};
export default UploadStep;
