import { Co2Sharp } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as z from "zod";

import BackgroundSelectStep from "@/components/dataset/create/BackgroundSelectStep";
import DatasetConfigurationStep from "@/components/dataset/create/DatasetConfigurationStep";
import DatasetUploadStep from "@/components/dataset/create/DatasetUploadStep";
import ModelSelectStep from "@/components/dataset/create/ModelSelectStep";
import FormStepsPanel, {
  FormStep
} from "@/components/multiform/FormStepsPanel";
import { api } from "@/network";

import {
  AccessType,
  DatasetType,
  GetBackgroundList,
  GetModelList,
  ObjId,
  PostDataset,
  PostDatasetBody
} from "shared-types";

const CreateDataset = () => {
  const router = useRouter();

  const [dataset, setDataset] = useState<PostDataset>({
    name: "",
    description: "",
    domainTags: [],
    modelIds: [],
    distractorIds: [],
    backgroundIds: [],
    accessType: AccessType.PRIVATE,
    datasetType: DatasetType.BLENDER_3D
  });

  // Stored here for persistency between form-steps
  const [backgroundTags, setBackgroundTags] = useState<string[]>([]);

  const [backgrounds, setBackgrounds] = useState<GetBackgroundList>([]);
  const [models, setModels] = useState<GetModelList>([]);
  const [distractors, setDistractors] = useState<GetModelList>([]);

  useEffect(
    () => setDataset({ ...dataset, modelIds: models.map((x) => x._id) }),
    [models]
  );
  useEffect(
    () =>
      setDataset({
        ...dataset,
        distractorIds: distractors.map((x) => x._id)
      }),
    [distractors]
  );
  useEffect(
    () =>
      setDataset({ ...dataset, backgroundIds: backgrounds.map((x) => x._id) }),
    [backgrounds]
  );

  const setName = (name: string) => setDataset({ ...dataset, name });
  const setAccessType = (accessType: AccessType) =>
    setDataset({ ...dataset, accessType });
  const setTags = (domainTags: string[]) =>
    setDataset({ ...dataset, domainTags });

  console.log(dataset);

  const steps: FormStep[] = [
    {
      name: "Model",
      description: "Select Models (>= 1)",
      component: (
        <ModelSelectStep selectedModels={models} onSelectModels={setModels} />
      ),
      validation: z.object({ models: z.array(ObjId).nonempty() })
    },
    // {
    //   name: "Distractors",
    //   description: "Select Distractors (>= 0)",
    //   component: (
    //     <ModelSelectStep
    //       selectedModels={distractorIds}
    //       onSelectModels={setDistractors}
    //     />
    //   ),
    //   validation: z.object({ distractorIds: z.array(ObjId) })
    // },
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
      validation: z.object({ backgroundIds: z.array(ObjId).nonempty() })
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

  const handleUpload = async () => {
    api
      .postDatasets(dataset)
      .then((result) => {
        router.push("/task/" + result._id);
      })
      .catch((e) => console.error(e));
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
