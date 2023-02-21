import React from "react"
import Button from "../Button"
import Card from "../Card"
import InputField from "../inputs/InputField"
import InputLabel from "../inputs/InputLabel"
import RadioGroupSelection from "../inputs/RadioGroupSelection"

export interface UploadStepProps {

}

const UploadStep: React.FC<UploadStepProps> = () => {

  return (
    <Card className="flex p-0">
      <div className="flex-1 p-4">
        <div>
          <InputLabel>Name</InputLabel>
          <InputField type="text" placeholder="Name"></InputField>
        </div>

        <div className="mt-3">
          <InputLabel>Access Type</InputLabel>
          <RadioGroupSelection values={['Private', 'Public']} selected="Private" onSelect={(val) => console.log(val)} />
        </div>
      </div>
      <div className="border-l border-indigo-50">

      </div>
      <div className="flex-1 p-4">
        <InputLabel>Upload</InputLabel>
        <Button className="m-2">Upload</Button>
      </div>
    </Card>
  )
}
export default UploadStep
