import { MinMaxProperty, SceneProperties } from "../Workspace";

export interface MinMaxPropertyInputProps {
  label: string;
  property: MinMaxProperty;
  onChange: (val: MinMaxProperty) => void
}

const MinMaxPropertyInput: React.FC<MinMaxPropertyInputProps> = ({ label, property, onChange }) => {
  const setMinProperty = (min: number) => {
    if (min < property.max) {
      property.min = min;
      onChange(property);
    }
  }
  const setMaxProperty = (max: number) => {
    if (max > property.min) {
      property.max = max;
      onChange(property);
    }
  }
  const type = (typeof property.minHint === 'number' && typeof property.maxHint === 'number') ? 'range' : 'number';

  return (<div className="mb-2 p-2 flex">
    <div className="flex-1">
      <label className="block text-white">Min {label}</label>
      <input className="w-full" type={type} value={property.min} step={.01} min={property.minHint} max={property.maxHint} onChange={(e) => setMinProperty(+e.target.value)} />
    </div>
    <div className="flex-1 ml-2">
      <label className="block text-white">Max {label}</label>
      <input className="w-full" type={type} value={property.max} step={.01} min={property.minHint} max={property.maxHint} onChange={(e) => setMaxProperty(+e.target.value)} />
    </div>
  </div>)
}

export default MinMaxPropertyInput;