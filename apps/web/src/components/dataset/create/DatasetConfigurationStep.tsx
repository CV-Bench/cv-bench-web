import Button from "@/components/Button"
import Card from "@/components/Card"
import InputLabel from "@/components/inputs/InputLabel"
import SelectInput from "@/components/inputs/SelectInput"
import { useModal } from "@/components/modal/ModalProvider"
import { ActiveModals } from "@/components/modal/ModalProvider/types"
import Workspace, { WorkspaceVisuals } from "@/components/visualization/Workspace/Workspace"
import { useDatasetConfiguration, useDatasetConfigurationList } from "@/hooks/datasetConfiguration"

import React, { useEffect, useState } from "react"
import { BlenderConfiguration, CamLensUnit, ComputeBbox, ConfigurationType, GetBackgroundList, GetDatasetConfiguration, GetModelList, PostDataset, PostDatasetConfiguration } from "shared-types"
import { string } from "zod"
import DatasetConfigurationInputs from "./DatasetConfigurationInputs"
import DatasetConfigurationModal from "./DatasetConfigurationModal"
import DatasetConfigurationVisuals from "./DatasetConfigurationVisuals"


export interface DatasetConfigurationStepProps {
  dataset: PostDataset,
  setDataset: (val: PostDataset) => void

  models: GetModelList;
  backgrounds: GetBackgroundList;
}

const DatasetConfigurationStep: React.FC<DatasetConfigurationStepProps> = ({ dataset, setDataset, models, backgrounds }) => {
  const { data: datasetConfigs, mutate: mutateDatasetConfigs } = useDatasetConfigurationList();

  const [visuals, setVisuals] = useState<WorkspaceVisuals>({
    showModelBox: false,
    showCameraSphere: false,
    showRenderResolution: false,
    lockCameraToSphere: false,
    selectedModelId: models[0]?._id ?? '',
    selectedBackgroundId: backgrounds[0]?._id ?? '',
  });
  
  const defaultConfig: PostDatasetConfiguration =  {
    configurationType: ConfigurationType.BLENDER,
    name: '',
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
  } 

  const [config, setConfig] = useState<PostDatasetConfiguration>(defaultConfig)

  const setSelectedConfigId = (configurationId?: string) => {
    configurationId = configurationId == "null" ? undefined : configurationId;
    setDataset({...dataset, configurationId: configurationId });
  };

  useEffect(() => {
    const selectedConfig = datasetConfigs?.find(x => x._id == dataset.configurationId);
    if (selectedConfig) {
      const { _id, ...patchModel } = selectedConfig!;
      setConfig(structuredClone(patchModel));
    }
    else {
      setConfig(defaultConfig);
    }
  }, [dataset.configurationId]);

  const selectedConfig = datasetConfigs?.find(x => x._id == dataset.configurationId);
  const configHasChanged = !dataset.configurationId || JSON.stringify(config.configuration) != JSON.stringify(selectedConfig?.configuration);

  const updateConfig = (configuration: BlenderConfiguration) => setConfig({ ...config, configuration });

  const [isConfigModalOpen, setIsConfigModalOpen] = useModal(ActiveModals.DatasetConfiguration);

  const onConfigModalClose = () => {
    mutateDatasetConfigs();
    setIsConfigModalOpen(false);
  }

  return (
    <div className="flex-1 flex items-stretch">
      <DatasetConfigurationModal 
      dataset={dataset}
      setDataset={setDataset}
      configuration={config}
      setConfiguration={setConfig}
      isOpen={isConfigModalOpen} 
      onClose={onConfigModalClose} />

      <div className="w-1/4 flex flex-col">
        <div className="px-3 pb-3 border-b border-white">
          <InputLabel>Configuration</InputLabel>
          <SelectInput value={dataset.configurationId} setValue={setSelectedConfigId}>
            <option value="null">New</option>
            { datasetConfigs?.map(config => <option key={config._id} value={config._id}>{config.name}</option> ) }
          </SelectInput>
        </div>
        <div className="relative flex-1">
          <Card className="absolute w-full h-full flex-1 overflow-y-auto">
            <DatasetConfigurationVisuals models={models} backgrounds={backgrounds} visuals={visuals} setVisuals={setVisuals} />
            <DatasetConfigurationInputs config={config.configuration} setConfig={updateConfig} />
          </Card>
        </div>

        <div className="p-3">
          {configHasChanged && <Button className="w-full" color="red" onClick={() => setIsConfigModalOpen(true)}>Save Changes</Button>}
        </div>
      </div>
      <div className="relative w-3/4">
        <div className="absolute h-full w-full flex justify-center items-center">
          <Workspace visuals={visuals} configuration={config.configuration} />
        </div>
      </div>
    </div>

  )
}
export default DatasetConfigurationStep
