import InputField from "./InputField";
import InputLabel from "./InputLabel";

export interface MinMaxSliderProps {
  className?: string;
  minLimit: number;
  maxLimit: number;

  min: number;
  max: number;

  onMinChange: (min: number) => void;
  onMaxChange: (max: number) => void;
}

const MinMaxSlider: React.FC<MinMaxSliderProps> = ({
  className,
  min,
  max,
  minLimit,
  maxLimit,
  onMinChange,
  onMaxChange
}) => {
  const setMin = (value: number) => onMinChange(value < max ? value : max);
  const setMax = (value: number) => onMaxChange(value > min ? value : min);

  return (
    <div className="space-y-2">
      <div>
        <InputLabel>Min: {min}</InputLabel>
        <InputField
          type="range"
          step=".01"
          min={minLimit}
          max={maxLimit}
          value={min}
          onChange={(e) => setMin(+(e.target as HTMLInputElement).value)}
        />
      </div>
      <div>
        <InputLabel>Max: {max}</InputLabel>
        <InputField
          type="range"
          step=".01"
          min={minLimit}
          max={maxLimit}
          value={max}
          onChange={(e) => setMax(+(e.target as HTMLInputElement).value)}
        />
      </div>
    </div>
  );
};

export default MinMaxSlider;
