import { Switch } from "@headlessui/react";
import { useState } from "react";

import InputLabel from "./InputLabel";

interface SwitchToggleProps {
  isActive: boolean;
  text: string;
  description?: string;
  onChange: (newActive: boolean) => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({
  isActive,
  text,
  description,
  onChange
}) => {
  return (
    <InputLabel
      htmlFor={text}
      className="flex justify-between items-center text-slate-200 w-full"
    >
      <p className="text-sm">{text}</p>
      <Switch
        id={text}
        checked={isActive}
        onChange={onChange}
        className={`${
          isActive ? "bg-indigo-600" : "bg-slate-400"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">{text}</span>
        <span
          className={`${
            isActive ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-slate-200 transition`}
        />
      </Switch>
    </InputLabel>
  );
};

export default SwitchToggle;
