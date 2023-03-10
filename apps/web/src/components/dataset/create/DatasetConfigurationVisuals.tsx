import Collapsible from "@/components/Collapsible";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import SelectInput from "@/components/inputs/SelectInput";
import SwitchToggle from "@/components/inputs/Switch";
import { WorkspaceVisuals } from "@/components/visualization/Workspace/Workspace";

import { GetBackgroundList, GetModelList } from "shared-types";

export interface DatasetConfigurationVisualsProps {
  backgrounds: GetBackgroundList;
  models: GetModelList;

  visuals: WorkspaceVisuals;
  setVisuals: (val: WorkspaceVisuals) => void;
}

const DatasetConfigurationVisuals: React.FC<
  DatasetConfigurationVisualsProps
> = ({ visuals, setVisuals, backgrounds, models }) => {
  const updateVisuals = () => setVisuals({ ...visuals });
  const setShowCameraSphere = (val: boolean) => {
    visuals.showCameraSphere = val;
    updateVisuals();
  };
  const setShowModelBox = (val: boolean) => {
    visuals.showModelBox = val;
    updateVisuals();
  };
  const setLockCameraToSphere = (val: boolean) => {
    visuals.lockCameraToSphere = val;
    updateVisuals();
  };
  const setShowRenderResolution = (val: boolean) => {
    visuals.showRenderResolution = val;
    updateVisuals();
  };
  const setSelectedModelId = (val: string) => {
    visuals.selectedModelId = val;
    updateVisuals();
  };
  const setSelectedBackgroundId = (val: string) => {
    visuals.selectedBackgroundId = val;
    updateVisuals();
  };

  return (
    <Collapsible title="Visuals" className="px-2">
      <div className="space-y-2">
        <SwitchToggle
          text="Show Camera Sphere"
          onChange={setShowCameraSphere}
          isActive={visuals.showCameraSphere}
        />
        <SwitchToggle
          text="Show Model Box"
          onChange={setShowModelBox}
          isActive={visuals.showModelBox}
        />
        <SwitchToggle
          text="Lock Camera To Sphere"
          onChange={setLockCameraToSphere}
          isActive={visuals.lockCameraToSphere}
        />
        <SwitchToggle
          text="Preview Render Resolution"
          onChange={setShowRenderResolution}
          isActive={visuals.showRenderResolution}
        />
        <div>
          <InputLabel className="text-sm">Preview Background</InputLabel>
          <SelectInput
            value={visuals.selectedBackgroundId}
            setValue={setSelectedBackgroundId}
          >
            {backgrounds.map((bg) => (
              <option key={bg._id} value={bg._id}>
                {bg.name}
              </option>
            ))}
          </SelectInput>
        </div>
        <div>
          <InputLabel className="text-sm">Preview Model</InputLabel>
          <SelectInput
            value={visuals.selectedModelId}
            setValue={setSelectedModelId}
          >
            {models.map((model) => (
              <option key={model._id} value={model._id}>
                {model.name}
              </option>
            ))}
          </SelectInput>
        </div>
      </div>
    </Collapsible>
  );
};

export default DatasetConfigurationVisuals;
