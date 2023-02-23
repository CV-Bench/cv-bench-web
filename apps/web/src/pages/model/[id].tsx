import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ModelPreview from "@/components/visualization/ModelPreview";
import { AccessType } from "@/types/accessType";
import { useState } from "react";
import { UploadModelFormData } from "./upload";

const ModelId = () => {
  // GET MODEL WITH
  // const model = useModel(id)


  // ToDo: Needs to be fetched from Backend
  const [model, setModel] = useState<UploadModelFormData>({
    name: 'Test Model',
    model: {
      filename: 'big_dolph.ply',
      dataUrl: '/big_dolph.ply'
    },
    modelAssets: [],
    tags: ['Test', 'Idk'],
    accessType: 'Public'
  })

  const setTags = (val: string[]) => setModel({...model, tags: val});
  const setName = (val: string) => setModel({...model, name: val});
  const setAccessType = (val: AccessType) => setModel({...model, accessType: val});

  return (<>
    <div className="h-full flex flex-col text-white">
      <div className="flex-1 flex">
        <Card className="mr-2 w-1/4 flex flex-col justify-around">
          <div>
            <InputLabel>3D Model</InputLabel>
            <Card className="bg-indigo-800">
              <ul>
                {model.model?.filename}
              </ul>
            </Card>
          </div>
          <div>
            <InputLabel>Materials & Textures</InputLabel>
            <Card className="bg-indigo-800">
              <ul>
                {(model.modelAssets?.length ?? 0) == 0 && <span>No materials present</span>}
                {model.modelAssets?.map((x, i) => <li key={i}>{x.filename}</li>)}
              </ul>
            </Card>
          </div>
          <div>
            <InputLabel>Tags</InputLabel>
            <TagInput tags={model.tags} setTags={setTags} />
          </div>
        </Card>
        <Card className="flex-1 ml-2 w-3/4">
          <ModelPreview model={model.model} modelAssets={model.modelAssets} />
        </Card>
      </div>
      <Card className="mt-4 flex">
        <div className="flex-1 pr-4">
          <div>
            <InputLabel>Name</InputLabel>
            <InputField type="text" value={model.name} onChange={(ev) => setName((ev.target as HTMLInputElement).value)} />
          </div>
          <AccessTypeInput className="mt-3" accessType={model.accessType} setAccessType={setAccessType} />
        </div>
        <div className="border-l border-white -my-4"></div>
        <div className="flex-1 px-4">
          <InputLabel>Update</InputLabel>
          <Button>Update</Button>
        </div>
        <div className="border-l border-white -my-4"></div>
        <div className="flex-1 px-4">
          <InputLabel>Download</InputLabel>
          <Button>Download</Button>
        </div>
        <div className="border-l border-white -my-4"></div>
        <div className="flex-1 px-4">
          <InputLabel>Delete</InputLabel>
          <Button>Delete</Button>
        </div>
      </Card>
    </div>
  </>);
}

export default ModelId;
