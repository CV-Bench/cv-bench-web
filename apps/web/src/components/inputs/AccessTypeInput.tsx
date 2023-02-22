import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import { AccessType } from "@/types/accessType";
import React from "react"
import RadioGroupSelection from "./RadioGroupSelection";


export interface AccessTypeInputProps {
  className?: string;
  accessType?: AccessType;
  setAccessType: (val: AccessType) => void;
}

const AccessTypeInput: React.FC<AccessTypeInputProps> = ({ accessType='Private', setAccessType, className }) => {
  return (
    <div className={className}>
      <InputLabel>Access Type</InputLabel>
      <RadioGroupSelection values={['Private', 'Public']} selected={accessType} onSelect={(val) => setAccessType(val == 'Private' ? 'Private' : 'Public')} />
    </div>
  )
}
export default AccessTypeInput
