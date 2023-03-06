import InputFieldProps from "@/types/components/props/InputFieldProps";

const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => (
  <input
    className="block w-full mb-2 rounded-md bg-slate-700 border-none text-white placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
    {...props}
  />
);

export default InputField;
