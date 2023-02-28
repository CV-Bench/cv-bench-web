import InputField from "./InputField";
import InputLabel from "./InputLabel";

export interface MinMaxInputProps {
  className?: string;

  min: number;
  max: number;

  onMinChange: (min: number) => void;
  onMaxChange: (max: number) => void;
}

const MinMaxInput: React.FC<MinMaxInputProps> = ({ className, min, max, onMinChange, onMaxChange }) => {

  const setMin = (value: number) => onMinChange(value < max ? value : max);
  const setMax = (value: number) => onMaxChange(value > min ? value : min);

  return (
    <div className={'flex items-center ' +className}>
      <InputLabel className="mx-2 my-1">Min</InputLabel>
      <InputField type="number" step=".01" value={min} onChange={e => setMin(+(e.target as HTMLInputElement).value)} />
      <InputLabel className="mx-2 my-1">Max</InputLabel>
      <InputField type="number" step=".01" value={max} onChange={e => setMax(+(e.target as HTMLInputElement).value)} />
    </div>
  )
}

export default MinMaxInput;
