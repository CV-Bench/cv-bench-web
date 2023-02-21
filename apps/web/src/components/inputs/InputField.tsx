import InputFieldProps from "@/types/components/props/InputFieldProps";

const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
    return(<>
        <input
          className="block w-full rounded-md bg-gray-700 border-none text-white placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
          {...props}
        />
    </>);
}

export default InputField;