import { useRouter } from "next/router";
import { useState } from "react";
import * as z from "zod";

import ToolGeneralSettings from "@/components/inputs/ToolGeneralSettings";
import PreviewStep from "@/components/model/upload/PreviewStep";
import FormStepsPanel, {
  FormStep
} from "@/components/multiform/FormStepsPanel";
import { api } from "@/network";

import {
  AccessType,
  DataUrlFile,
  DataUrlFileBody,
  ModelType,
  PostModel,
  PostModelBody
} from "shared-types";

const UploadModel = () => {
  const router = useRouter();

  const [postModel, setFormData] = useState<PostModel>({
    name: "",
    description: "",
    modelObject: undefined!,
    domainTags: [],
    modelAssets: [],
    accessType: AccessType.PUBLIC,
    modelType: ModelType["3D"],
    previewImage: ""
  });

  const onThumbnailUpdate = (val: string) =>
    setFormData({ ...postModel, previewImage: val });
  const onSelectTags = (val: string[]) =>
    setFormData({ ...postModel, domainTags: val });
  const onSelectModel = (val: DataUrlFile) =>
    setFormData({ ...postModel, modelObject: val });
  const onSelectMaterials = (val: DataUrlFile[]) =>
    setFormData({ ...postModel, modelAssets: val });

  const handleUpload = () => {
    api
      .postModel(postModel)
      .then((x) => {
        router.push("/model");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const steps: FormStep[] = [
    {
      name: "Preview",
      description: "tbd",
      component: (
        <PreviewStep
          tags={postModel.domainTags}
          modelAssets={postModel.modelAssets}
          model={postModel.modelObject}
          thumbnail={postModel.previewImage}
          onThumbnailUpdate={onThumbnailUpdate}
          onSelectTags={onSelectTags}
          onSelectModelAssets={onSelectMaterials}
          onSelectModel={onSelectModel}
        />
      ),
      validation: z.object({
        previewImage: z.string(),
        modelObject: DataUrlFileBody
      })
    },
    {
      name: "Upload",
      description: "tbd",
      component: (
        <ToolGeneralSettings
          name={postModel.name}
          accessType={postModel.accessType}
          handleChange={(key, value) =>
            setFormData({ ...postModel, [key]: value })
          }
          handleUpload={handleUpload}
          uploadButtonText="Upload Data"
        />
      ),
      validation: PostModelBody
    }
  ];

  return (
    <>
      <FormStepsPanel formData={postModel} steps={steps} />
    </>
  );
};

export default UploadModel;
