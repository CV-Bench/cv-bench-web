import { UrlFile } from "@/components/inputs/FileInput";
import PreviewStep from "@/components/model/upload/PreviewStep";
import UploadStep from "@/components/model/upload/UploadStep";
import FormStepsPanel, { FormStep } from "@/components/multiform/FormStepsPanel";
import { useState } from "react";
import * as z from "zod";

export interface UploadModelFormData {
  tags?: string[];
  model?: UrlFile;
  modelAssets?: UrlFile[];
  thumbnail?: UrlFile;

  name?: string;
  accessType?: string;
}

const UploadModel = () => {
  const [formData, setFormData] = useState<UploadModelFormData>({});

  const onThumbnailUpdate = (val: UrlFile) => setFormData({ ...formData, thumbnail: val });
  const onSelectTags = (val: string[]) => setFormData({ ...formData, tags: val });
  const onSelectModel = (val: UrlFile) => setFormData({ ...formData, model: val });
  const onSelectMaterials = (val: UrlFile[]) => setFormData({ ...formData, modelAssets: val });

  const onSetName = (val: string) => setFormData({ ...formData, name: val });
  const onSetAccessType = (val: string) => setFormData({ ...formData, accessType: val });

  const steps: FormStep[] = [
    {
      name: 'Preview',
      description: 'tbd',
      component: (<PreviewStep
      tags={formData.tags}
      modelAssets={formData.modelAssets}
      model={formData.model}
      thumbnail={formData.thumbnail}
      onThumbnailUpdate={onThumbnailUpdate}
      onSelectTags={onSelectTags}
      onSelectMaterials={onSelectMaterials}
      onSelectModel={onSelectModel} />),
      validation: z.object({ model: z.object({ filename: z.string(), url: z.string() }), tags: z.array(z.string()) })
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
      validation: z.object({ modelObj: z.string() })
    }
  ];

  const handleUpload = () => console.log("Upload");

  return (<>
    <FormStepsPanel
      submitButtonText="Start Upload"
      formData={formData}
      steps={steps}
      handleSubmit={handleUpload} />
  </>);
}

export default UploadModel;