import React from "react"
import Card from "../Card"
import FileInput, { SelectedFile } from "../inputs/FileInput"
import InputLabel from "../inputs/InputLabel"
import TagInput from "../inputs/TagInput"

export interface PreviewStepProps {
  tags?: string[];
  model?: SelectedFile;
  materials?: SelectedFile[];
  onSelectModel: (val: SelectedFile) => void;
  onSelectMaterials: (val: SelectedFile[]) => void;
  onSelectTags: (val: string[]) => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({onSelectModel, onSelectMaterials, onSelectTags, model, materials, tags}) => {

  return (
    <div className="lg:flex min-h-full">
      <div className="lg:w-1/3 lg:pr-2 lg:pb-0 pb-2">
        <Card className="flex flex-col justify-around h-full">

          <FileInput selectedFiles={model && [model]} setSelectedFiles={(val) => onSelectModel(val[0])} accept={['.obj', '.ply']} title="Select 3D Model" />
          <FileInput selectedFiles={materials} setSelectedFiles={onSelectMaterials} className="mt-3" accept={['.mtl']} title="Select Materials" multiple={true} />


          <div className="h-32 mt-3">
            <InputLabel>Tags</InputLabel>
            <TagInput tags={tags} setTags={onSelectTags} placeholder="Tags" />
          </div>
        </Card>
      </div>
      <div className="lg:w-2/3 lg:pl-2 lg:pt-0 pt-2 min-h-full">
        <Card className="h-full">
          <h1>PREVIEW</h1>
        </Card>
      </div>
      
    </div>
  )
}
export default PreviewStep
