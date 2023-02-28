<<<<<<< HEAD
import FormStepsPanel, { FormStep } from "@/components/multiform/FormStepsPanel";
import { AccessType, BlenderConfiguration, CamLensUnit, ComputeBbox, DatasetType, GetModelList, GetModelListBody, PostDataset } from "types";
import { useState } from "react";
import ModelSelectStep from "@/components/dataset/create/ModelSelectStep";
import * as z from "zod";
import BackgroundSelectStep from "@/components/dataset/create/BackgroundSelectStep";
import DatasetConfigurationStep from "@/components/dataset/create/DatasetConfigurationStep";
=======
import AlarmIcon from "@mui/icons-material/Alarm";
import ContrastIcon from "@mui/icons-material/Contrast";
>>>>>>> main

import Dropdown from "@/components/inputs/Dropdown";
import DropdownDetailed from "@/components/inputs/DropdownDetailed";
import InputField from "@/components/inputs/InputField";
import TagInput from "@/components/inputs/TagInput";

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
          sensor_height: 1, // ToDo
          sensor_width: 1, // ToDo
          clip_start: .1,
          clip_end: 20
        },
        resolution_x: 480, // px
        resolution_y: 480, // px
    
        model_scale: 1, //fragwürdig
        exposure: 40,
        compute_bbox: ComputeBbox.FAST,
        use_fps_keypoints: false, //muss nicht unbedgingt user-einstellbar sein
    
        use_cycles: true, // sollte immer true sein
        samples: 40, // sinnvolle obere Grenze ca. 60, unter 10 sinnlos
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
<<<<<<< HEAD
      <FormStepsPanel
        submitButtonText="Start Upload"
        formData={dataset}
        steps={steps}
        handleSubmit={handleUpload}
      />
=======
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DropdownDetailed
          options={[
            {
              title: "Fast Bounding Boxes",
              description:
                "Faster to create, but results in looser bounding Boxes",
              icon: AlarmIcon
            },
            {
              title: "Tight Bounding Boxes",
              description:
                "Slower to create, but results in tighter bounding Boxes",
              icon: ContrastIcon
            }
          ]}
        />
        <Dropdown options={[{ title: "Option 1" }, { title: "Option 2" }]} />
        <InputField placeholder="Name" />
        <TagInput placeholder="Add Tags" setTags={() => {}} />
      </div>
>>>>>>> main
    </>
  );
};

export default CreateDataset;
