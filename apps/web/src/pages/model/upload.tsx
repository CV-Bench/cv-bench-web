import { SelectedFile } from "@/components/inputs/FileInput";
import PreviewStep from "@/components/model/PreviewStep";
import UploadStep from "@/components/model/UploadStep";
import FormStepsPanel, { FormStep } from "@/components/multiform/FormStepsPanel";
import { useState } from "react";
import * as z from "zod";

export interface UploadModelFormData {
  tags?: string[];
  model?: SelectedFile;
  materials?: SelectedFile[];

  name?: string;
  accessType?: 'Private' | 'Public';
}

const UploadModel = () => {
  const [formData, setFormData] = useState<UploadModelFormData>({});

  const onSelectTags = (val: string[]) => setFormData({ ...formData, tags: val });
  const onSelectModel = (val: SelectedFile) => setFormData({ ...formData, model: val });
  const onSelectMaterials = (val: SelectedFile[]) => setFormData({ ...formData, materials: val });

  const steps: FormStep[] = [
    {
      name: 'Preview',
      description: 'tbd',
      component: (<PreviewStep
        tags={formData.tags}
        materials={formData.materials}
        model={formData.model}
        onSelectTags={onSelectTags}
        onSelectMaterials={onSelectMaterials}
        onSelectModel={onSelectModel} />),
      validation: z.object({ model: z.object({ filename: z.string(), data: z.string() }), tags: z.array(z.string()) })
    },
    {
      name: 'Upload',
      description: 'tbd',
      component: (<UploadStep />),
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