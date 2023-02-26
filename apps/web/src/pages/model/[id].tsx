import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ModelPreview from "@/components/visualization/ModelPreview";
import { useModel } from "@/hooks/model";
import { api } from "@/network";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AccessType, DataUrlFile, GetModel } from "types";

const ModelId = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: apiModel } = useModel(id?.toString() ?? '')
  const [model, setModel] = useState<GetModel>();

  useEffect(() => {
    if (apiModel) {
      setModel(apiModel);
    }
  }, [apiModel]);

  if (!model) {
    return <></>
  }

  const setTags = (val: string[]) => setModel({ ...model, domainTags: val });
  const setName = (val: string) => setModel({ ...model, name: val });
  const setAccessType = (val: AccessType) => setModel({ ...model, accessType: val });

  const downloadFile = (file: DataUrlFile) => {
    var a = document.createElement("a");
    a.href = file.dataUrl;
    a.download = file.filename;
    a.click();
  }

  const downloadModel = () => {
    if (model.modelObject) {
      downloadFile(model.modelObject);
    }
    if (model.modelAssets) {
      model.modelAssets.forEach(file => downloadFile(file));
    }
  }

  const deleteModel = async () => {
    await api.deleteModel(model._id);
    router.push('/model');
  }

  const updateModel = async () => {
    await api.patchModel(model._id, {
      name: model.name,
      description: model.description,
      domainTags: model.domainTags,
      accessType: model.accessType
    });
    router.push('/model');
  }

  return (<>
    <div className="h-full flex flex-col text-white container mx-auto">
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
          <Button onClick={updateModel}>Update</Button>
        </div>
        <div className="border-l border-white -my-4"></div>
        <div className="flex-1 px-4">
          <InputLabel>Download</InputLabel>
          <Button onClick={downloadModel}>Download</Button>
        </div>
        <div className="border-l border-white -my-4"></div>
        <div className="flex-1 px-4">
          <InputLabel>Delete</InputLabel>
          <Button onClick={deleteModel}>Delete</Button>
        </div>
      </Card>
    </div>
  </>);
}

export default ModelId;
