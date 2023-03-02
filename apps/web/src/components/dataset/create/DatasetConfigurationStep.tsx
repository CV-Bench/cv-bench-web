import Card from "@/components/Card"
import Collapsible from "@/components/Collapsible"
import EnumOptions from "@/components/inputs/EnumOptions"
import InputField from "@/components/inputs/InputField"
import InputLabel from "@/components/inputs/InputLabel"
import MinMaxInput from "@/components/inputs/MinMaxInput"
import MinMaxSlider from "@/components/inputs/MinMaxSlider"
import SelectInput from "@/components/inputs/SelectInput"
import Workspace, { WorkspaceVisuals } from "@/components/visualization/Workspace/Workspace"
import React, { useState } from "react"
import { BlenderConfiguration, ComputeBbox, GetBackgroundList, GetModelList, PostDataset, PostDatasetConfiguration } from "shared-types"
import { string } from "zod"


export interface DatasetConfigurationStepProps {
  dataset: PostDataset,
  setDataset: (val: PostDataset) => void

  models: GetModelList;
  backgrounds: GetBackgroundList;
}

const DatasetConfigurationStep: React.FC<DatasetConfigurationStepProps> = ({ dataset, setDataset, models, backgrounds }) => {
  const [visuals, setVisuals] = useState<WorkspaceVisuals>({
    showModelBox: false,
    showCameraSphere: false,
    showRenderResolution: false,
    lockCameraToSphere: false,
    selectedModelId: models[0]?._id ?? '',
    selectedBackgroundId: backgrounds[0]?._id ?? '',
  });

  const updateVisuals = () => setVisuals({...visuals});
  const setShowCameraSphere = (val: boolean) => { visuals.showCameraSphere = val; updateVisuals(); }
  const setShowModelBox = (val: boolean) => { visuals.showModelBox = val; updateVisuals(); }
  const setLockCameraToSphere = (val: boolean) => { visuals.lockCameraToSphere = val; updateVisuals(); }
  const setShowRenderResolution = (val: boolean) => { visuals.showRenderResolution = val; updateVisuals(); }
  const setSelectedModelId = (val: string) => { visuals.selectedBackgroundId = val; updateVisuals(); }
  const setSelectedBackgroundId = (val: string) => { visuals.selectedBackgroundId = val; updateVisuals(); }
  
  const outputConfig = dataset.configuration.output;
  const randomConfig = dataset.configuration.random;
  const renderConfig = dataset.configuration.render;
  const cameraConfig = renderConfig.camera;

  const updateConfig = () => setDataset({ ...dataset });

  // Render Section
  const setModelScale = (val: number) => { renderConfig.model_scale = val; updateConfig(); }
  const setExposure = (val: number) => { renderConfig.exposure = val; updateConfig(); }
  const setResolutionX = (val: number) => { renderConfig.resolution_x = val; updateConfig(); }
  const setResolutionY = (val: number) => { renderConfig.resolution_y = val; updateConfig(); }
  const setComputeBBox = (val: ComputeBbox) => { renderConfig.compute_bbox = val; updateConfig(); }
  const setUseFpsKeypoints = (val: boolean) => { renderConfig.use_fps_keypoints = val; updateConfig(); }
  const setSamples = (val: number) => { renderConfig.samples = val; updateConfig(); }

  // Random Section
  const setMinAzi = (val: number) => { randomConfig.min_azi = val; updateConfig(); }
  const setMaxAzi = (val: number) => { randomConfig.max_azi = val; updateConfig(); }

  const setMinInc = (val: number) => { randomConfig.min_inc = val; updateConfig(); }
  const setMaxInc = (val: number) => { randomConfig.max_inc = val; updateConfig(); }

  const setMinMetallic = (val: number) => { randomConfig.min_metallic = val; updateConfig(); }
  const setMaxMetallic = (val: number) => { randomConfig.max_metallic = val; updateConfig(); }
  const setMinRoughness = (val: number) => { randomConfig.min_roughness = val; updateConfig(); }
  const setMaxRoughness = (val: number) => { randomConfig.max_roughness = val; updateConfig(); }

  const setModelMinX = (val: number) => { randomConfig.min_x_pos = val; updateConfig(); }
  const setModelMaxX = (val: number) => { randomConfig.max_x_pos = val; updateConfig(); }
  const setModelMinY = (val: number) => { randomConfig.min_y_pos = val; updateConfig(); }
  const setModelMaxY = (val: number) => { randomConfig.max_y_pos = val; updateConfig(); }
  const setModelMinZ = (val: number) => { randomConfig.min_z_pos = val; updateConfig(); }
  const setModelMaxZ = (val: number) => { randomConfig.max_z_pos = val; updateConfig(); }

  // Camera Section
  const setFov = (val: number) => { cameraConfig.lens = val; updateConfig(); }
  const setClipStart = (val: number) => { cameraConfig.clip_start = val; updateConfig(); }
  const setClipEnd = (val: number) => { cameraConfig.clip_end = val; updateConfig(); }

  // Output Section
  const setImages = (val: number) => { outputConfig.images = val; updateConfig(); }
  const setJustMerge = (val: number) => { outputConfig.just_merge = val; updateConfig(); }
  const setSkewAngleMaterial = (val: number) => { outputConfig["skew_angle:material"] = val; updateConfig(); }

  const bboxEnum = ComputeBbox;

  return (
    <div className="flex-1 flex items-stretch">
      <div className="relative w-1/4">
        <Card className="absolute w-full h-full overflow-y-auto">
          <Collapsible title="Visuals">
            <div>
              <InputLabel>Show Camera Sphere</InputLabel>
              <InputField type="checkbox" checked={visuals.showCameraSphere} onChange={(e) => setShowCameraSphere(!!(e.target as HTMLInputElement).checked)} />
            </div>
            <div>
              <InputLabel>Show Model Box</InputLabel>
              <InputField type="checkbox" checked={visuals.showModelBox} onChange={(e) => setShowModelBox(!!(e.target as HTMLInputElement).checked)} />
            </div>
            <div>
              <InputLabel>Lock Camera To Sphere</InputLabel>
              <InputField type="checkbox" checked={visuals.lockCameraToSphere} onChange={(e) => setLockCameraToSphere(!!(e.target as HTMLInputElement).checked)} />
            </div>
            <div>
              <InputLabel>Preview Render Resolution</InputLabel>
              <InputField type="checkbox" checked={visuals.showRenderResolution} onChange={(e) => setShowRenderResolution(!!(e.target as HTMLInputElement).checked)} />
            </div>
            <div>
              <InputLabel>Preview Background</InputLabel>
              <SelectInput value={visuals.selectedBackgroundId} setValue={setSelectedBackgroundId}>
                {backgrounds.map(bg => <option key={bg._id} value={bg._id}>{bg.name}</option>)}
              </SelectInput>
            </div>
            <div>
              <InputLabel>Preview Model</InputLabel>
              <SelectInput value={visuals.selectedModelId} setValue={setSelectedModelId}>
                {models.map(model => <option key={model._id} value={model._id}>{model.name}</option>)}
              </SelectInput>
            </div>
          </Collapsible>
          <Collapsible title="Output">
            <Collapsible title="Resolution">
              <div className="flex">
                <div>
                  <InputLabel>Width</InputLabel>
                  <InputField type="number" min="1" value={renderConfig.resolution_x} onChange={(e) => setResolutionX(+(e.target as HTMLInputElement).value)} />
                </div>
                <div>
                  <InputLabel>Height</InputLabel>
                  <InputField type="number" min="1" value={renderConfig.resolution_y} onChange={(e) => setResolutionY(+(e.target as HTMLInputElement).value)} />
                </div>
              </div>
            </Collapsible>
            <div>
              <InputLabel>Compute Bounding Box: ({ renderConfig.compute_bbox })</InputLabel>
              <SelectInput value={renderConfig.compute_bbox} setValue={setComputeBBox}>
                <EnumOptions enumType={bboxEnum} />
              </SelectInput>
            </div>
            <div>
              <InputLabel>Use FPS Keypoints</InputLabel>
              <InputField type="checkbox" checked={renderConfig.use_fps_keypoints} onChange={(e) => setUseFpsKeypoints(!!(e.target as HTMLInputElement).checked)} />
            </div>
            <div>
              <InputLabel>Samples ({ renderConfig.samples })</InputLabel>
              <InputField type="range" min={10} max={60} value={renderConfig.samples} onChange={(e) => setSamples(+(e.target as HTMLInputElement).value)} />
            </div>
            <div>
              <InputLabel>Images</InputLabel>
              <InputField type="number" min="1" value={outputConfig.images} onChange={(e) => setImages(+(e.target as HTMLInputElement).value)} />
            </div>
            <div>
              <InputLabel>Merge ({(outputConfig.just_merge * 100).toFixed(2)} % )</InputLabel>
              <InputField type="range" step=".01" min="0" max="100" value={outputConfig.just_merge * 100} onChange={(e) => setJustMerge(+(e.target as HTMLInputElement).value * .01)} />
            </div>
            <div>
              <InputLabel>Skew-Angle Material Relation ({(outputConfig["skew_angle:material"] * 100).toFixed(2)} % )</InputLabel>
              <InputField type="range" step=".01" min="0" max="100" value={outputConfig["skew_angle:material"] * 100} onChange={(e) => setSkewAngleMaterial(+(e.target as HTMLInputElement).value * .01)} />
            </div>
          </Collapsible>
          <Collapsible title="Lighting">
            <div>
              <InputLabel>Exposure</InputLabel>
              <InputField type="number" min="0" value={renderConfig.exposure} onChange={(e) => setExposure(+(e.target as HTMLInputElement).value)} />
            </div>
          </Collapsible>
          <Collapsible title="Camera">
            <div>
              <InputLabel>FOV: ({cameraConfig.lens} °)</InputLabel>
              <InputField type="range" min="0" max="180" value={cameraConfig.lens} onChange={(e) => setFov(+(e.target as HTMLInputElement).value)} />
            </div>
            <Collapsible className="mt-3" title="Positioning" collapsed={true}>
                <Collapsible title="Azimuth">
                  <MinMaxSlider minLimit={0} maxLimit={2 * Math.PI} min={randomConfig.min_azi} max={randomConfig.max_azi} onMinChange={setMinAzi} onMaxChange={setMaxAzi} />
                </Collapsible>
                <Collapsible className="mt-2" title="Inclination">
                  <MinMaxSlider minLimit={0} maxLimit={Math.PI} min={randomConfig.min_inc} max={randomConfig.max_inc} onMinChange={setMinInc} onMaxChange={setMaxInc} />
                </Collapsible>
            </Collapsible>
            <Collapsible title="Clipping" collapsed={true}>
              <MinMaxSlider minLimit={0.01} maxLimit={10} min={cameraConfig.clip_start} max={cameraConfig.clip_end} onMinChange={setClipStart} onMaxChange={setClipEnd} />
            </Collapsible>
          </Collapsible>
          <Collapsible title="Model">
            <div>
              <InputLabel>Scale: ({renderConfig.model_scale})</InputLabel>
              <InputField type="number" min="0" step=".01" value={renderConfig.model_scale} onChange={(e) => setModelScale(+(e.target as HTMLInputElement).value)} />
            </div>
            <Collapsible title="Positioning" collapsed={true}>
              <InputLabel>X</InputLabel>
              <MinMaxInput className="flex" min={randomConfig.min_x_pos} max={randomConfig.max_x_pos} onMinChange={setModelMinX} onMaxChange={setModelMaxX} />

              <InputLabel>Y</InputLabel>
              <MinMaxInput className="flex" min={randomConfig.min_y_pos} max={randomConfig.max_y_pos} onMinChange={setModelMinY} onMaxChange={setModelMaxY} />

              <InputLabel>Z</InputLabel>
              <MinMaxInput className="flex" min={randomConfig.min_z_pos} max={randomConfig.max_z_pos} onMinChange={setModelMinZ} onMaxChange={setModelMaxZ} />
            </Collapsible>
            <Collapsible title="Metallic" collapsed={true}>
              <MinMaxSlider minLimit={0} maxLimit={1} min={randomConfig.min_metallic} max={randomConfig.max_metallic} onMinChange={setMinMetallic} onMaxChange={setMaxMetallic} />
            </Collapsible>
            <Collapsible title="Roughness" collapsed={true}>
              <MinMaxSlider minLimit={0} maxLimit={1} min={randomConfig.min_roughness} max={randomConfig.max_roughness} onMinChange={setMinRoughness} onMaxChange={setMaxRoughness} />
            </Collapsible>
          </Collapsible>
        </Card>
      </div>
      <div className="relative w-3/4">
        <div className="absolute h-full w-full flex justify-center items-center">
          <Workspace visuals={visuals} dataset={dataset} />
        </div>
      </div>
    </div>

  )
}
export default DatasetConfigurationStep
