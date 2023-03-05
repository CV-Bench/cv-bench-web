interface DividedInputProps {
  title: string;
  subtitle?: string;
  id: string;
  value: string | number;
  onChange: (newValue: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  isValid?: (newValue: string | number) => boolean;
}

const DividedInput: React.FC<DividedInputProps> = ({
  title,
  subtitle,
  id,
  value,
  onChange,
  type = "number",
  placeholder,
  disabled = false,
  isValid = () => true
}) => (
  <div className="grid grid-cols-2 group">
    <label
      htmlFor={id}
      className="uppercase transition-all duration-150 flex items-center space-x-2 group-hover:text-gray-200 text-sm text-gray-400"
    >
      <p>{title}</p>
      <p className="text-xs text-gray-600">{subtitle}</p>
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={({ target }) => onChange(target.value)}
      className={`appearance-none block px-4 py-1 rounded-lg text-sm bg-gray-800 placeholder-gray-400 text-gray-100 focus:outline-none sm:text-sm transition-all duration-150 ring-0 active:ring-0 ring-transparent border  ${
        isValid(value)
          ? "border-gray-600 focus:border-indigo-800 hover:border-indigo-600"
          : "border-red-600 hover:border-orange-600"
      }`}
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);

export default DividedInput;
