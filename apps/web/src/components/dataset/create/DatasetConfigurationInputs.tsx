import Collapsible from "@/components/Collapsible";
import EnumOptions from "@/components/inputs/EnumOptions";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import MinMaxInput from "@/components/inputs/MinMaxInput";
import MinMaxSlider from "@/components/inputs/MinMaxSlider";
import SelectInput from "@/components/inputs/SelectInput";
import SwitchToggle from "@/components/inputs/Switch";

import { BlenderConfiguration, ComputeBbox } from "shared-types";

export interface DatasetConfigurationInputsProps {
  config: BlenderConfiguration;
  setConfig: (val: BlenderConfiguration) => void;
}

const DatasetConfigurationInputs: React.FC<DatasetConfigurationInputsProps> = ({
  config,
  setConfig
}) => {
  const outputConfig = config.output;
  const randomConfig = config.random;
  const renderConfig = config.render;
  const cameraConfig = renderConfig.camera;

  const updateConfiguration = () => setConfig({ ...config });

  // Render Section
  const setModelScale = (val: number) => {
    renderConfig.model_scale = val;
    updateConfiguration();
  };
  const setExposure = (val: number) => {
    renderConfig.exposure = val;
    updateConfiguration();
  };
  const setResolutionX = (val: number) => {
    renderConfig.resolution_x = val;
    updateConfiguration();
  };
  const setResolutionY = (val: number) => {
    renderConfig.resolution_y = val;
    updateConfiguration();
  };
  const setComputeBBox = (val: ComputeBbox) => {
    renderConfig.compute_bbox = val;
    updateConfiguration();
  };
  const setUseFpsKeypoints = (val: boolean) => {
    renderConfig.use_fps_keypoints = val;
    updateConfiguration();
  };
  const setSamples = (val: number) => {
    renderConfig.samples = val;
    updateConfiguration();
  };

  // Random Section
  const setMinAzi = (val: number) => {
    randomConfig.min_azi = val;
    updateConfiguration();
  };
  const setMaxAzi = (val: number) => {
    randomConfig.max_azi = val;
    updateConfiguration();
  };

  const setMinInc = (val: number) => {
    randomConfig.min_inc = val;
    updateConfiguration();
  };
  const setMaxInc = (val: number) => {
    randomConfig.max_inc = val;
    updateConfiguration();
  };

  const setMinDistractors = (val: number) => {
    randomConfig.min_distractors = val;
    updateConfiguration();
  };
  const setMaxDistractors = (val: number) => {
    randomConfig.max_distractors = val;
    updateConfiguration();
  };

  const setMinMetallic = (val: number) => {
    randomConfig.min_metallic = val;
    updateConfiguration();
  };
  const setMaxMetallic = (val: number) => {
    randomConfig.max_metallic = val;
    updateConfiguration();
  };
  const setMinRoughness = (val: number) => {
    randomConfig.min_roughness = val;
    updateConfiguration();
  };
  const setMaxRoughness = (val: number) => {
    randomConfig.max_roughness = val;
    updateConfiguration();
  };

  const setModelMinX = (val: number) => {
    randomConfig.min_x_pos = val;
    updateConfiguration();
  };
  const setModelMaxX = (val: number) => {
    randomConfig.max_x_pos = val;
    updateConfiguration();
  };
  const setModelMinY = (val: number) => {
    randomConfig.min_y_pos = val;
    updateConfiguration();
  };
  const setModelMaxY = (val: number) => {
    randomConfig.max_y_pos = val;
    updateConfiguration();
  };
  const setModelMinZ = (val: number) => {
    randomConfig.min_z_pos = val;
    updateConfiguration();
  };
  const setModelMaxZ = (val: number) => {
    randomConfig.max_z_pos = val;
    updateConfiguration();
  };

  // Camera Section
  const setFov = (val: number) => {
    cameraConfig.lens = val;
    updateConfiguration();
  };
  const setClipStart = (val: number) => {
    cameraConfig.clip_start = val;
    updateConfiguration();
  };
  const setClipEnd = (val: number) => {
    cameraConfig.clip_end = val;
    updateConfiguration();
  };

  // Output Section
  const setSizeTrain = (val: number) => {
    outputConfig.size_train = val;
    updateConfiguration();
  };
  const setSizeVal = (val: number) => {
    outputConfig.size_val = val;
    updateConfiguration();
  };
  const setJustMerge = (val: number) => {
    outputConfig.just_merge = val;
    updateConfiguration();
  };
  const setSkewAngleMaterial = (val: number) => {
    outputConfig["skew_angle:material"] = val;
    updateConfiguration();
  };

  const bboxEnum = ComputeBbox;

  return (
    <>
      <div className="pb-2">
        <Collapsible title="Output" className="px-2">
          <div className="space-y-2">
            <Collapsible title="Resolution" className="text-sm">
              <div className="flex space-x-2 px-2">
                <div>
                  <InputLabel>Width</InputLabel>
                  <InputField
                    type="number"
                    min="1"
                    value={renderConfig.resolution_x}
                    onChange={(e) =>
                      setResolutionX(+(e.target as HTMLInputElement).value)
                    }
                  />
                </div>
                <div>
                  <InputLabel>Height</InputLabel>
                  <InputField
                    type="number"
                    min="1"
                    value={renderConfig.resolution_y}
                    onChange={(e) =>
                      setResolutionY(+(e.target as HTMLInputElement).value)
                    }
                  />
                </div>
              </div>
            </Collapsible>
            <div>
              <InputLabel>
                Compute Bounding Box: ({renderConfig.compute_bbox})
              </InputLabel>
              <SelectInput
                value={renderConfig.compute_bbox}
                setValue={setComputeBBox}
              >
                <EnumOptions enumType={bboxEnum} />
              </SelectInput>
            </div>
            <SwitchToggle
              text="Use FPS Keypoints"
              onChange={setUseFpsKeypoints}
              isActive={renderConfig.use_fps_keypoints}
            />
            {/* <div>
            <InputLabel></InputLabel>
            <InputField
              type="checkbox"
              checked={.}
              onChange={(e) =>
                (!!(e.target as HTMLInputElement).checked)
              }
            />
          </div> */}
            <div>
              <InputLabel>Samples ({renderConfig.samples})</InputLabel>
              <InputField
                type="range"
                min={10}
                max={60}
                value={renderConfig.samples}
                onChange={(e) =>
                  setSamples(+(e.target as HTMLInputElement).value)
                }
              />
            </div>
            <div className="flex space-x-2">
              <div>
                <InputLabel># of Training images</InputLabel>
                <InputField
                  type="number"
                  min="1"
                  value={outputConfig.size_train}
                  onChange={(e) =>
                    setSizeTrain(+(e.target as HTMLInputElement).value)
                  }
                />
              </div>
              <div>
                <InputLabel># of Validation images</InputLabel>
                <InputField
                  type="number"
                  min="1"
                  value={outputConfig.size_val}
                  onChange={(e) =>
                    setSizeVal(+(e.target as HTMLInputElement).value)
                  }
                />
              </div>
            </div>
            <div>
              <InputLabel>
                Merge ({(outputConfig.just_merge * 100).toFixed(2)} % )
              </InputLabel>
              <InputField
                type="range"
                step=".01"
                min="0"
                max="100"
                value={outputConfig.just_merge * 100}
                onChange={(e) =>
                  setJustMerge(+(e.target as HTMLInputElement).value * 0.01)
                }
              />
            </div>
            <MinMaxInput
              title="Distractors"
              className="flex"
              min={randomConfig.min_distractors}
              max={randomConfig.max_distractors}
              onMinChange={setMinDistractors}
              onMaxChange={setMaxDistractors}
              step={1}
            />
            <div>
              <InputLabel>
                Skew-Angle Material Relation (
                {(outputConfig["skew_angle:material"] * 100).toFixed(2)} % )
              </InputLabel>
              <InputField
                type="range"
                step=".01"
                min="0"
                max="100"
                value={outputConfig["skew_angle:material"] * 100}
                onChange={(e) =>
                  setSkewAngleMaterial(
                    +(e.target as HTMLInputElement).value * 0.01
                  )
                }
              />
            </div>
          </div>
        </Collapsible>
      </div>
      <Collapsible title="Lighting" className="px-2">
        <div>
          <InputLabel>Exposure</InputLabel>
          <InputField
            type="number"
            min="0"
            value={renderConfig.exposure}
            onChange={(e) => setExposure(+(e.target as HTMLInputElement).value)}
          />
        </div>
      </Collapsible>
      <Collapsible title="Camera" className="px-2">
        <div className="space-y-2">
          <div>
            <InputLabel>FOV: ({cameraConfig.lens} °)</InputLabel>
            <InputField
              type="range"
              min="0"
              max="180"
              value={cameraConfig.lens}
              onChange={(e) => setFov(+(e.target as HTMLInputElement).value)}
            />
          </div>
          <Collapsible className="text-sm" title="Positioning">
            <div className="px-2 space-y-2">
              <Collapsible title="Azimuth">
                <MinMaxSlider
                  minLimit={0}
                  maxLimit={2 * Math.PI}
                  min={randomConfig.min_azi}
                  max={randomConfig.max_azi}
                  onMinChange={setMinAzi}
                  onMaxChange={setMaxAzi}
                />
              </Collapsible>
              <Collapsible className="text-sm" title="Inclination">
                <MinMaxSlider
                  minLimit={0}
                  maxLimit={Math.PI}
                  min={randomConfig.min_inc}
                  max={randomConfig.max_inc}
                  onMinChange={setMinInc}
                  onMaxChange={setMaxInc}
                />
              </Collapsible>
            </div>
          </Collapsible>
          <Collapsible title="Clipping" className="text-sm">
            <MinMaxSlider
              minLimit={0.01}
              maxLimit={10}
              min={cameraConfig.clip_start}
              max={cameraConfig.clip_end}
              onMinChange={setClipStart}
              onMaxChange={setClipEnd}
            />
          </Collapsible>
        </div>
      </Collapsible>
      <Collapsible title="Model" className="px-2">
        <div>
          <InputLabel>Scale: ({renderConfig.model_scale})</InputLabel>
          <InputField
            type="number"
            min="0"
            step=".01"
            value={renderConfig.model_scale}
            onChange={(e) =>
              setModelScale(+(e.target as HTMLInputElement).value)
            }
          />
        </div>
        <Collapsible title="Positioning" className="text-sm">
          <div className="px-2 space-y-2">
            <MinMaxInput
              title="X Position"
              className="flex"
              min={randomConfig.min_x_pos}
              max={randomConfig.max_x_pos}
              onMinChange={setModelMinX}
              onMaxChange={setModelMaxX}
            />

            <MinMaxInput
              title="Y Position"
              className="flex"
              min={randomConfig.min_y_pos}
              max={randomConfig.max_y_pos}
              onMinChange={setModelMinY}
              onMaxChange={setModelMaxY}
            />

            <MinMaxInput
              title="Z Position"
              className="flex"
              min={randomConfig.min_z_pos}
              max={randomConfig.max_z_pos}
              onMinChange={setModelMinZ}
              onMaxChange={setModelMaxZ}
            />
          </div>
        </Collapsible>
        <Collapsible title="Metallic" className="text-sm">
          <MinMaxSlider
            minLimit={0}
            maxLimit={1}
            min={randomConfig.min_metallic}
            max={randomConfig.max_metallic}
            onMinChange={setMinMetallic}
            onMaxChange={setMaxMetallic}
          />
        </Collapsible>
        <Collapsible title="Roughness" className="text-sm">
          <MinMaxSlider
            minLimit={0}
            maxLimit={1}
            min={randomConfig.min_roughness}
            max={randomConfig.max_roughness}
            onMinChange={setMinRoughness}
            onMaxChange={setMaxRoughness}
          />
        </Collapsible>
      </Collapsible>
    </>
  );
};

export default DatasetConfigurationInputs;
