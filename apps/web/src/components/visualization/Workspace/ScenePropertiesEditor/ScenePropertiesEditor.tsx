import { SceneProperties } from "../Workspace";

import MinMaxPropertyInput from "./MinMaxPropertyInput";
import ValuePropertyInput from "./ValuePropertyInput";

export interface ScenePropertiesEditorProps {
  properties: SceneProperties;
  setProperties: (val: SceneProperties) => void;
}

const ScenePropertiesEditor: React.FC<ScenePropertiesEditorProps> = ({
  properties,
  setProperties
}) => {
  const onPropertyChange = () => setProperties({ ...properties });

  return (
    <div className="absolute top-0 right-0 bg-indigo-800 z-50">
      <MinMaxPropertyInput
        label="Object X"
        property={properties.objX}
        onChange={onPropertyChange}
      />
      <MinMaxPropertyInput
        label="Object Y"
        property={properties.objY}
        onChange={onPropertyChange}
      />
      <MinMaxPropertyInput
        label="Object Z"
        property={properties.objZ}
        onChange={onPropertyChange}
      />

      <MinMaxPropertyInput
        label="Azimuth"
        property={properties.camAzi}
        onChange={onPropertyChange}
      />

      <MinMaxPropertyInput
        label="Inclination"
        property={properties.camInc}
        onChange={onPropertyChange}
      />

      <MinMaxPropertyInput
        label="Radius"
        property={properties.camRadius}
        onChange={onPropertyChange}
      />

      <ValuePropertyInput
        label="FOV"
        property={properties.camFov}
        onChange={onPropertyChange}
      />

      <MinMaxPropertyInput
        label="Clip Planes"
        property={properties.camClip}
        onChange={onPropertyChange}
      />
    </div>
  );
};

export default ScenePropertiesEditor;
