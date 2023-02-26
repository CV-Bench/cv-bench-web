import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ModelPreview from "@/components/visualization/ModelPreview";
import { useModel } from "@/hooks/model";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AccessType } from "types";
import { UploadModelFormData } from "./upload";

const ModelId = () => {
  const router = useRouter()
  const { id } = router.query

  const {data: apiModel} = useModel(id ? id as string : null)
  const [model, setModel] = useState<UploadModelFormData>({
    name: '',
    modelAssets: [],
    domainTags: [],
    accessType: AccessType.PRIVATE,
  })

  useEffect(() => {
    if (apiModel) {
        setModel(apiModel);
    }
  }, [apiModel]);
  
  const setTags = (val: string[]) => setModel({...model, domainTags: val});
  const setName = (val: string) => setModel({...model, name: val});
  const setAccessType = (val: AccessType) => setModel({...model, accessType: val});

  const onDownload = () => {

  }

  return (<>
    <div className="h-full flex flex-col text-white">
      <div className="flex-1 flex">
        <Card className="mr-2 w-1/4 flex flex-col justify-around">
          <div>
            <InputLabel>3D Model</InputLabel>
            <Card className="bg-indigo-800">
              <ul>
                {model.modelObject?.filename}
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
            <TagInput tags={model.domainTags} setTags={setTags} />
          </div>
        </Card>
        <Card className="flex-1 ml-2 w-3/4">
          <ModelPreview model={model.modelObject} modelAssets={model.modelAssets} />
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
