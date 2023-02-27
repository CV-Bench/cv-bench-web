import { RadioGroup } from "@headlessui/react";

import { classNames } from "../../utils/strings";
import { AccessType } from "types";

interface RadioGroupSelectionProps {
  values: string[] | number[];
  selected: string;

  onSelect: (value: string | number) => void;
}

const RadioGroupSelection: React.FC<RadioGroupSelectionProps> = ({
  values,
  selected,
  onSelect
}) => (
  <div>
    <RadioGroup value={selected} onChange={onSelect}>
      <div className="text-sm text-gray-100">
        {values.map((option, i) => (
          <RadioGroup.Option
            key={i}
            value={option}
            className={classNames(
              option === selected ? "bg-indigo-800 z-10 border-indigo-800" : "",
              i === 0 ? "rounded-l-md" : "",
              i === values.length - 1 ? "rounded-r-md" : "",
              "inline-flex cursor-pointer border w-1/2 border-gray-600 transition-colors ease-in duration-150 items-center hover:border-indigo-600 px-4 py-2"
            )}
          >
            {option}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  </div>
);

export default RadioGroupSelection;
