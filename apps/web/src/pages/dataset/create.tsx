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

const CreateDataset = () => {
  const [dataset, setDataset] = useState<PostDataset>({
    name: '',
    description: '',
    domainTags: [],
    models: [],
    images: [],
    accessType: AccessType.PRIVATE,
    datasetType: DatasetType.BLENDER_3D,
    configuration: {
      input: {
        object: [],
        distractor: [],
        bg: []
      },
      output: {
        images: 5, // ToDo
        just_merge: .5, // ToDo
        "skew_angle:material": .5 // ToDo
      },
      render: {
        camera: {
          lens_unit: CamLensUnit.FOV,
          lens: 50,
          clip_start: .1,
          clip_end: 20
        },
        resolution_x: 480, // px // ToDo
        resolution_y: 480, // px // ToDo
    
        model_scale: 1, //fragwürdig
        exposure: 40, // ToDo
        compute_bbox: ComputeBbox.FAST, // ToDo
        use_fps_keypoints: false, //muss nicht unbedgingt user-einstellbar sein 
    
        use_cycles: true, // sollte immer true sein
        samples: 40, // sinnvolle obere Grenze ca. 60, unter 10 sinnlos // ToDo
        use_cycles_donoising: false, // sollte erstmal immer false sein
        use_adaptive_sampling:false, // sollte erstmal immer false sein
        use_GPU: true, // sollte immer true sein
      },
      random: {
        min_azi: 0,
        max_azi: Math.PI * 2,
        min_distractors: 0, // ToDo
        max_distractors: 1, // ToDo
        min_inc: 0,
        max_inc: Math.PI / 2,
        min_metallic: .2,
        max_metallic: .75,
        min_roughness: .2,
        max_roughness: .75,
        min_x_pos: -.5,
        max_x_pos: .5,
        min_y_pos: -.5,
        max_y_pos: .5,
        min_z_pos: -.5,
        max_z_pos: .5
      }
    }
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
      validation: z.object({ configuration: BlenderConfigurationObject })
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

  const handleUpload = () => {
    api.postDatasets(dataset);
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
