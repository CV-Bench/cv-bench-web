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
    <div className="grid grid-cols-2 group">
      <div className="flex space-x-2 items-center uppercase text-sm text-slate-400 transition-all duration-150  group-hover:text-slate-200">
        <p>Access type</p>
        <p className="text-xs text-slate-600">Who can use this data.</p>
      </div>
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
