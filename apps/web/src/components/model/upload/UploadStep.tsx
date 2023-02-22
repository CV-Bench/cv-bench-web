import Button from "@/components/Button";
import Card from "@/components/Card";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import RadioGroupSelection from "@/components/inputs/RadioGroupSelection";
import React from "react"


export interface UploadStepProps {
  name?: string;
  setName: (val: string) => void;

  accessType?: string;
  setAccessType: (val: string) => void;
}

const UploadStep: React.FC<UploadStepProps> = ({ name, setName, accessType, setAccessType }) => {

  return (
    <Card className="flex p-0">
      <div className="flex-1 pr-4">
        <div>
          <InputLabel>Name</InputLabel>
          <InputField type="text" placeholder="Name" value={name ?? ''} onChange={e => setName((e.target as HTMLInputElement).value ?? '')}></InputField>
        </div>

        <div className="mt-3">
          <InputLabel>Access Type</InputLabel>
          <RadioGroupSelection values={['Private', 'Public']} selected={accessType ?? 'Private'} onSelect={(val) => setAccessType(val.toString())} />
        </div>
      </div>
      <div className="border-l -my-4 border-indigo-50">

      </div>
      <div className="flex-1 pl-4">
        <InputLabel>Upload</InputLabel>
        <Button className="m-2">Upload</Button>
      </div>
    </Card>
  )
}
export default UploadStep
