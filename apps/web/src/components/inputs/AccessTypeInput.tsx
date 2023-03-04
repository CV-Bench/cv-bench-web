import React from "react";

import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";

import { AccessType } from "shared-types";

import RadioGroupSelection from "./RadioGroupSelection";

export interface AccessTypeInputProps {
  className?: string;
  accessType?: AccessType;
  setAccessType: (val: AccessType) => void;
}

const AccessTypeInput: React.FC<AccessTypeInputProps> = ({
  accessType = AccessType.PRIVATE,
  setAccessType,
  className
}) => {
  return (
    <div className={className}>
      <InputLabel>Access Type</InputLabel>
      <RadioGroupSelection
        values={["Private", "Public"]}
        selected={accessType == AccessType.PRIVATE ? "Private" : "Public"}
        onSelect={(val) =>
          setAccessType(
            val == "Private" ? AccessType.PRIVATE : AccessType.PUBLIC
          )
        }
      />
    </div>
  );
};
export default AccessTypeInput;
