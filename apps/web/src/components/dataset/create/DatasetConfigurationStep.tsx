import Card from "@/components/Card"
import Collapsible from "@/components/Collapsible"
import InputField from "@/components/inputs/InputField"
import InputLabel from "@/components/inputs/InputLabel"
import MinMaxInput from "@/components/inputs/MinMaxInput"
import MinMaxSlider from "@/components/inputs/MinMaxSlider"
import Workspace from "@/components/visualization/Workspace/Workspace"
import React, { useState } from "react"
import { BlenderConfiguration, CamLensUnit, ComputeBbox, ConfigurationType, GetModelList, PostDatasetConfiguration } from "types"


export interface DatasetConfigurationStepProps {
  selectedModels: GetModelList,
  config: BlenderConfiguration,
  setConfig: (val: BlenderConfiguration) => void
}

const DatasetConfigurationStep: React.FC<DatasetConfigurationStepProps> = ({ selectedModels, config, setConfig }) => {
  const [visuals, setVisuals] = useState({
    showModelBox: false,
    showCameraSphere: false,
    showCameraFrustum: false,
  })

  const updateVisuals = () => setVisuals({...visuals});
  const setShowCameraSphere = (val: boolean) => { visuals.showCameraSphere = val; updateVisuals(); }
  const setShowModelBox = (val: boolean) => { visuals.showModelBox = val; updateVisuals(); }
  const setShowCameraFrustum = (val: boolean) => { visuals.showCameraFrustum = val; updateVisuals(); }

  const randomConfig = config.random;
  const renderConfig = config.render;
  const cameraConfig = renderConfig.camera;

  const update = () => setConfig({ ...config });
  const setMinAzi = (val: number) => { randomConfig.min_azi = val; update(); }
  const setMaxAzi = (val: number) => { randomConfig.max_azi = val; update(); }

  const setMinInc = (val: number) => { randomConfig.min_inc = val; update(); }
  const setMaxInc = (val: number) => { randomConfig.max_inc = val; update(); }

  const setModelScale = (val: number) => { renderConfig.model_scale = val; update(); }

  const setMinMetallic = (val: number) => { randomConfig.min_metallic = val; update(); }
  const setMaxMetallic = (val: number) => { randomConfig.max_metallic = val; update(); }
  const setMinRoughness = (val: number) => { randomConfig.min_roughness = val; update(); }
  const setMaxRoughness = (val: number) => { randomConfig.max_roughness = val; update(); }

  const setModelMinX = (val: number) => { randomConfig.min_x_pos = val; update(); }
  const setModelMaxX = (val: number) => { randomConfig.max_x_pos = val; update(); }
  const setModelMinY = (val: number) => { randomConfig.min_y_pos = val; update(); }
  const setModelMaxY = (val: number) => { randomConfig.max_y_pos = val; update(); }
  const setModelMinZ = (val: number) => { randomConfig.min_z_pos = val; update(); }
  const setModelMaxZ = (val: number) => { randomConfig.max_z_pos = val; update(); }

  const setFov = (val: number) => { cameraConfig.lens = val; update(); }
  const setWidth = (val: number) => { cameraConfig.sensor_width = val; update(); }
  const setHeight = (val: number) => { cameraConfig.sensor_height = val; update(); }
  const setClipStart = (val: number) => { cameraConfig.clip_start = val; update(); }
  const setClipEnd = (val: number) => { cameraConfig.clip_end = val; update(); }
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
              <InputLabel>Show Camera Frustum</InputLabel>
              <InputField type="checkbox" checked={visuals.showCameraFrustum} onChange={(e) => setShowCameraFrustum(!!(e.target as HTMLInputElement).checked)} />
            </div>
          </Collapsible>
          <Collapsible title="Camera">
            <div>
              <InputLabel>FOV: ({cameraConfig.lens} °)</InputLabel>
              <InputField type="range" min="0" max="180" value={cameraConfig.lens} onChange={(e) => setFov(+(e.target as HTMLInputElement).value)} />
            </div>
            <div>
              <InputLabel>Sensor Width: ({cameraConfig.sensor_width} mm)</InputLabel>
              <InputField type="number" min="0" value={cameraConfig.sensor_width} onChange={(e) => setWidth(+(e.target as HTMLInputElement).value)} />
            </div>
            <div>
              <InputLabel>Sensor Height: ({cameraConfig.sensor_height} mm)</InputLabel>
              <InputField type="number" min="0" value={cameraConfig.sensor_height} onChange={(e) => setHeight(+(e.target as HTMLInputElement).value)} />
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
              <MinMaxSlider minLimit={0} maxLimit={20} min={cameraConfig.clip_start} max={cameraConfig.clip_end} onMinChange={setClipStart} onMaxChange={setClipEnd} />
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
        <div className="absolute h-full w-full">
          <Workspace {...visuals} configuration={config} selectedModels={selectedModels} />
        </div>
      </div>
    </div>

  )
}
export default DatasetConfigurationStep