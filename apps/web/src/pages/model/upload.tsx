import PreviewStep from "@/components/model/upload/PreviewStep";
import UploadStep from "@/components/model/upload/UploadStep";
import FormStepsPanel, { FormStep } from "@/components/multiform/FormStepsPanel";
import { useState } from "react";
import { api } from "@/network";
import { AccessType, DataUrlFile, DataUrlFileBody, ModelType, PostModel, PostModelBody } from "types";
import * as z from "zod";
import { useRouter } from "next/router";

const UploadModel = () => {
  const router = useRouter();

  const [postModel, setFormData] = useState<PostModel>({
    name: '',
    description: '',
    modelObject: undefined!,
    domainTags: [],
    modelAssets: [],
    accessType: AccessType.PUBLIC,
    modelType: ModelType["3D"],
    previewImage: ''
  });

  const onThumbnailUpdate = (val: string) => setFormData({ ...postModel, previewImage: val });
  const onSelectTags = (val: string[]) => setFormData({ ...postModel, domainTags: val });
  const onSelectModel = (val: DataUrlFile) => setFormData({ ...postModel, modelObject: val });
  const onSelectMaterials = (val: DataUrlFile[]) => setFormData({ ...postModel, modelAssets: val });

  const onSetName = (val: string) => setFormData({ ...postModel, name: val });
  const onSetAccessType = (val: AccessType) => setFormData({ ...postModel, accessType: val });

  const steps: FormStep[] = [
    {
      name: 'Preview',
      description: 'tbd',
      component: (<PreviewStep
        tags={postModel.domainTags}
        modelAssets={postModel.modelAssets}
        model={postModel.modelObject}
        thumbnail={postModel.previewImage}
        onThumbnailUpdate={onThumbnailUpdate}
        onSelectTags={onSelectTags}
        onSelectModelAssets={onSelectMaterials}
        onSelectModel={onSelectModel} />),
      validation: z.object({ previewImage: z.string(), modelObject: DataUrlFileBody })
    },
    {
      name: 'Upload',
      description: 'tbd',
      component: (<UploadStep
        name={postModel.name}
        accessType={postModel.accessType}
        setName={onSetName}
        setAccessType={onSetAccessType}
      />),
      validation: PostModelBody
    }
  ];

  const handleUpload = () => {
    api.postModel(postModel).then(x => router.push('/model'));

  }

  return (<>
    <FormStepsPanel
      submitButtonText="Start Upload"
      formData={postModel}
      steps={steps}
      handleSubmit={handleUpload} />
  </>);
}

export default UploadModel;