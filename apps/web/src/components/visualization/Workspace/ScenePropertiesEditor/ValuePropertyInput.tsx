import { MinMaxProperty, SceneProperties, ValueProperty } from "../Workspace";

export interface ValuePropertyInputProps {
  label: string;
  property: ValueProperty;
  onChange: (val: ValueProperty) => void;
}

const ValuePropertyInput: React.FC<ValuePropertyInputProps> = ({
  label,
  property,
  onChange
}) => {
  const setValue = (val: number) => {
    property.value = val;
    onChange(property);
  };

  const type =
    typeof property.minHint === "number" && typeof property.maxHint === "number"
      ? "range"
      : "number";

  return (
    <div className="mb-2 p-2">
      <div>
        <label className="text-white">{label}</label>
        <input
          className="w-full"
          type={type}
          value={property.value}
          step={0.01}
          min={property.minHint}
          max={property.maxHint}
          onChange={(e) => setValue(+e.target.value)}
        />
      </div>
    </div>
  );
};

export default ValuePropertyInput;
