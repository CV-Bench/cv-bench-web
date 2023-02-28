import FormStepsPanel, { FormStep } from "@/components/multiform/FormStepsPanel";
import { AccessType, BlenderConfiguration, CamLensUnit, ComputeBbox, DatasetType, GetModelList, GetModelListBody, PostDataset } from "types";
import { useState } from "react";
import * as z from "zod";
import BackgroundSelectStep from "@/components/dataset/create/BackgroundSelectStep";
import DatasetConfigurationStep from "@/components/dataset/create/DatasetConfigurationStep";
import ModelSelectStep from "@/components/dataset/create/ModelSelectStep";

const CreateDataset = () => {
  const [dataset, setDataset] = useState<PostDataset>({
    name: '',
    description: '',
    domainTags: [],
    models: [],
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
          sensor_height: 1,
          sensor_width: 1,
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

  const [backgroundTags, setBackgroundTags] = useState<string[]>([]);

  const setModels = (models: GetModelList) => setDataset({...dataset, models});

  const setConfig = (config: BlenderConfiguration) => setDataset({...dataset, configuration: config});

  const steps: FormStep[] = [
    {
      name: "Model",
      description: "Select Models",
      component: (
        <ModelSelectStep
          selectedModels={dataset.models}
          onSelectModels={setModels}
        />
      ),
      validation: z.object({ models: GetModelListBody.nonempty() })
    },
    {
      name: "Background",
      description: "tbd",
      component: (
        <BackgroundSelectStep
          selectedBackgroundTags={backgroundTags}
          onSelectBackgroundTags={setBackgroundTags}
        />
      ),
      validation: z.object({ models: GetModelListBody.nonempty() })
    },
    {
      name: "Configuration",
      description: "tbd",
      component: (
        <DatasetConfigurationStep
          setConfig={setConfig}
          config={dataset.configuration}
          selectedModels={dataset.models}
        />
      ),
      validation: z.object({ models: GetModelListBody.nonempty() })
    }
  ];

  const handleUpload = () => {
    
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
