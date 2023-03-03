import Collapsible from "@/components/Collapsible";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import SelectInput from "@/components/inputs/SelectInput";
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
    visuals.selectedBackgroundId = val;
    updateVisuals();
  };
  const setSelectedBackgroundId = (val: string) => {
    visuals.selectedBackgroundId = val;
    updateVisuals();
  };

  return (
    <>
      <Collapsible title="Visuals">
        <div>
          <InputLabel>Show Camera Sphere</InputLabel>
          <InputField
            type="checkbox"
            checked={visuals.showCameraSphere}
            onChange={(e) =>
              setShowCameraSphere(!!(e.target as HTMLInputElement).checked)
            }
          />
        </div>
        <div>
          <InputLabel>Show Model Box</InputLabel>
          <InputField
            type="checkbox"
            checked={visuals.showModelBox}
            onChange={(e) =>
              setShowModelBox(!!(e.target as HTMLInputElement).checked)
            }
          />
        </div>
        <div>
          <InputLabel>Lock Camera To Sphere</InputLabel>
          <InputField
            type="checkbox"
            checked={visuals.lockCameraToSphere}
            onChange={(e) =>
              setLockCameraToSphere(!!(e.target as HTMLInputElement).checked)
            }
          />
        </div>
        <div>
          <InputLabel>Preview Render Resolution</InputLabel>
          <InputField
            type="checkbox"
            checked={visuals.showRenderResolution}
            onChange={(e) =>
              setShowRenderResolution(!!(e.target as HTMLInputElement).checked)
            }
          />
        </div>
        <div>
          <InputLabel>Preview Background</InputLabel>
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
          <InputLabel>Preview Model</InputLabel>
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
      </Collapsible>
    </>
  );
};

export default DatasetConfigurationVisuals;
