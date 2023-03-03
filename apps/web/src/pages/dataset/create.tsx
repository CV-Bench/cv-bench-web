import FormStepsPanel, { FormStep } from "@/components/multiform/FormStepsPanel";
import { AccessType, BlenderConfiguration, BlenderConfigurationObject, CamLensUnit, ComputeBbox, DatasetConfigurationBody, DatasetType, GetBackgroundList, GetModelList, GetModelListBody, ObjId, PostDataset, PostDatasetBody } from "shared-types";
import { useEffect, useState } from "react";
import * as z from "zod";
import BackgroundSelectStep from "@/components/dataset/create/BackgroundSelectStep";
import DatasetConfigurationStep from "@/components/dataset/create/DatasetConfigurationStep";
import ModelSelectStep from "@/components/dataset/create/ModelSelectStep";
import { Co2Sharp } from "@mui/icons-material";
import DatasetUploadStep from "@/components/dataset/create/DatasetUploadStep";
import { api } from "@/network";
import { useRouter } from "next/router";

const CreateDataset = () => {
  const router = useRouter();

  const [dataset, setDataset] = useState<PostDataset>({
    name: '',
    description: '',
    domainTags: [],
    models: [],
    images: [],
    accessType: AccessType.PRIVATE,
    datasetType: DatasetType.BLENDER_3D
  })

  // Stored here for persistency between form-steps
  const [backgroundTags, setBackgroundTags] = useState<string[]>([]);

  const [backgrounds, setBackgrounds] = useState<GetBackgroundList>([]);
  const [models, setModels] = useState<GetModelList>([]);

  useEffect(() => setDataset({...dataset, models: models.map(x => x._id)}), [models]);
  useEffect(() => setDataset({...dataset, images: backgrounds.map(x => x._id)}), [backgrounds]);

  const setName = (name: string) => setDataset({...dataset, name});
  const setAccessType = (accessType: AccessType) => setDataset({...dataset, accessType});
  const setTags = (domainTags: string[]) => setDataset({...dataset, domainTags});

  const steps: FormStep[] = [
    {
      name: "Model",
      description: "Select Models",
      component: (
        <ModelSelectStep
          selectedModels={models}
          onSelectModels={setModels}
        />
      ),
      validation: z.object({ models: z.array(ObjId).nonempty() })
    },
    {
      name: "Background",
      description: "tbd",
      component: (
        <BackgroundSelectStep
          selectedBackgroundTags={backgroundTags}
          onSelectBackgroundTags={setBackgroundTags}
          selectedBackgrounds={backgrounds}
          onSelectBackgrounds={setBackgrounds}
        />
      ),
      validation: z.object({ images: z.array(ObjId).nonempty() })
    },
    {
      name: "Configuration",
      description: "tbd",
      component: (
        <DatasetConfigurationStep
          dataset={dataset}
          setDataset={setDataset}
          models={models}
          backgrounds={backgrounds}
        />
      ),
      validation: z.object({ configurationId: z.string() })
    },
    {
      name: "Upload",
      description: "tbd",
      component: (
        <DatasetUploadStep
          name={dataset.name}
          setName={setName}
          accessType={dataset.accessType}
          setAccessType={setAccessType}
          tags={dataset.domainTags}
          setTags={setTags}
        />
      ),
      validation: PostDatasetBody
    }
  ];

  const handleUpload = async() => {
    await api.postDatasets(dataset);
    router.push('/task');
  };

  return (
    <>
      <FormStepsPanel
        submitButtonText="Start Upload"
        formData={dataset}
        steps={steps}
        handleSubmit={handleUpload}
      />
    </>
  );
};

export default CreateDataset;
