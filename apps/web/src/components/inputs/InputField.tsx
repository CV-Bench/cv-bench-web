import InputFieldProps from "@/types/components/props/InputFieldProps";

const InputField: React.FC<InputFieldProps> = ({
  className,
  ...props
}: InputFieldProps) => (
  <input
    className={`block w-full rounded-md bg-slate-700 border-none text-slate-200 text-sm placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm ${
      className ? className : ""
    }`}
    {...props}
  />
);

export default InputField;
