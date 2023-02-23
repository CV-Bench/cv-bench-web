import PreviewStep from "@/components/model/upload/PreviewStep";
import UploadStep from "@/components/model/upload/UploadStep";
import FormStepsPanel, { FormStep } from "@/components/multiform/FormStepsPanel";
import { useState } from "react";
import { api } from "@/network";
import { AccessType, DataUrlFile, DataUrlFileBody, ModelType, PostModel, PostModelBody } from "types";
import * as z from "zod";

export interface UploadModelFormData {
  domainTags: string[];
  name: string;
  accessType: AccessType;
  
  previewImage?: string;
  modelObject?: DataUrlFile;
  modelAssets?: DataUrlFile[];
}

const UploadModel = () => {
  const [formData, setFormData] = useState<UploadModelFormData>({
    accessType: AccessType.PRIVATE,
    name: '', 
    domainTags: []
  });

  const onThumbnailUpdate = (val: string) => setFormData({ ...formData, previewImage: val });
  const onSelectTags = (val: string[]) => setFormData({ ...formData, domainTags: val });
  const onSelectModel = (val: DataUrlFile) => setFormData({ ...formData, modelObject: val });
  const onSelectMaterials = (val: DataUrlFile[]) => setFormData({ ...formData, modelAssets: val });

  const onSetName = (val: string) => setFormData({ ...formData, name: val });
  const onSetAccessType = (val: AccessType) => setFormData({ ...formData, accessType: val });

  const steps: FormStep[] = [
    {
      name: 'Preview',
      description: 'tbd',
      component: (<PreviewStep
      tags={formData.domainTags}
      modelAssets={formData.modelAssets}
      model={formData.modelObject}
      thumbnail={formData.previewImage}
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
        name={formData.name}
        accessType={formData.accessType}
        setName={onSetName}
        setAccessType={onSetAccessType}
        />),
      validation: z.object({ name: z.string().min(1), accessType: z.nativeEnum(AccessType) })
    }
  ];

  const handleUpload = () => {
    api.postModel({
      ...formData,
      previewImage: formData.previewImage as string,
      modelObject: formData.modelObject as DataUrlFile,
      description: '',
      modelType: ModelType["3D"]
    } as any).then(x => console.log("RESULT", x))
    
  }

  return (<>
    <FormStepsPanel
      submitButtonText="Start Upload"
      formData={formData}
      steps={steps}
      handleSubmit={handleUpload} />
  </>);
}

export default UploadModel;