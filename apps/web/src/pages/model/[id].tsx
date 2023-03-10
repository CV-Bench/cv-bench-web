import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { addToast } from "@/components/Toast";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ToolGeneralSettings from "@/components/inputs/ToolGeneralSettings";
import ModelPreview from "@/components/visualization/ModelPreview";
import { useModel } from "@/hooks/model";
import { api } from "@/network";

import {
  AccessType,
  DataUrlFile,
  GetModel,
  NotificationType
} from "shared-types";

const ModelId = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: apiModel } = useModel(id?.toString() ?? "");
  const [model, setModel] = useState<GetModel>();

  useEffect(() => {
    if (apiModel) {
      setModel(apiModel);
    }
  }, [apiModel]);

  if (!model) {
    return <></>;
  }

  const handleChange = (
    key: "accessType" | "name" | "domainTags",
    val: string[] | string | AccessType
  ) => setModel({ ...model, [key]: val });

  const downloadFile = (file: DataUrlFile) => {
    var a = document.createElement("a");
    a.href = file.dataUrl;
    a.download = file.filename;
    a.click();
  };

  const downloadModel = () => {
    if (model.modelObject) {
      downloadFile(model.modelObject);
    }
    if (model.modelAssets) {
      model.modelAssets.forEach((file) => downloadFile(file));
    }
  };

  const deleteModel = async () => {
    api
      .deleteModel(model._id)
      .then(() => {
        addToast(
          "Model Deleted!",
          "Model was deleted successfully.",
          NotificationType.INFO
        );
        router.push("/model");
      })
      .catch((e) =>
        addToast(
          "Deletion Failed!",
          "Model could not be deleted.",
          NotificationType.ERROR
        )
      );
  };

  const updateModel = () => {
    api
      .patchModel(model._id, {
        name: model.name,
        description: model.description,
        domainTags: model.domainTags,
        accessType: model.accessType
      })
      .then(() => {
        addToast(
          "Model Updated!",
          "Model was updated successfully.",
          NotificationType.SUCCESS
        );
      })
      .catch((e) =>
        addToast(
          "Update Failed!",
          "Model could not be updated.",
          NotificationType.ERROR
        )
      );
  };

  return (
    <div className="h-full flex flex-col container mx-auto pt-8 space-y-4">
      <div className="flex space-x-4">
        <Card className="w-1/4 flex flex-col p-4 divide-y divide-slate-700">
          <div className="space-y-1 pb-4">
            <InputLabel>3D Model</InputLabel>
            <Card className="bg-indigo-800 p-1 text-slate-400 text-sm">
              <ul>{model.modelObject?.filename}</ul>
            </Card>
          </div>
          <div className="space-y-1 py-4">
            <InputLabel>Materials & Textures</InputLabel>
            {(model.modelAssets?.length ?? 0) == 0 && (
              <span>No materials present</span>
            )}
            {model.modelAssets?.map((x, i) => (
              <Card className="bg-indigo-800 p-1 text-slate-400 text-sm">
                <ul key={i}>{x.filename}</ul>
              </Card>
            ))}
          </div>
          <div className="space-y-1 py-4">
            <InputLabel>Tags</InputLabel>
            <TagInput
              tags={model.domainTags}
              setTags={(newTags: string[]) =>
                handleChange("domainTags", newTags)
              }
            />
          </div>
        </Card>
        <Card className="flex-1 w-3/4">
          <ModelPreview
            model={model.modelObject}
            modelAssets={model.modelAssets}
          />
        </Card>
      </div>

      <ToolGeneralSettings
        accessType={model.accessType}
        name={model.name}
        uploadButtonText="Update"
        handleChange={(key, data) => handleChange(key, data)}
        handleUpload={updateModel}
        showDownload
        handleDownload={downloadModel}
        showDelete
        handleDelete={deleteModel}
      />
    </div>
  );
};

export default ModelId;
