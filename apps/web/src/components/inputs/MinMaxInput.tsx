import Collapsible from "../Collapsible";

import InputField from "./InputField";
import InputLabel from "./InputLabel";

export interface MinMaxInputProps {
  className?: string;

  min: number;
  max: number;
  step?: number;
  title: string;

  onMinChange: (min: number) => void;
  onMaxChange: (max: number) => void;
}

const MinMaxInput: React.FC<MinMaxInputProps> = ({
  className,
  min,
  title,
  max,
  onMinChange,
  onMaxChange,
  step = 0.01
}) => {
  const setMin = (value: number) => onMinChange(value < max ? value : max);
  const setMax = (value: number) => onMaxChange(value > min ? value : min);

  return (
    <Collapsible title={title} className="text-sm">
      <div className="flex space-x-2 px-2">
        <div>
          <InputLabel className="mx-2 my-1">Min</InputLabel>
          <InputField
            type="number"
            step={step}
            value={min}
            onChange={(e) => setMin(+(e.target as HTMLInputElement).value)}
          />
        </div>
        <div>
          <InputLabel className="mx-2 my-1">Max</InputLabel>
          <InputField
            type="number"
            step={step}
            value={max}
            onChange={(e) => setMax(+(e.target as HTMLInputElement).value)}
          />
        </div>
      </div>
    </Collapsible>
  );
};

export default MinMaxInput;
