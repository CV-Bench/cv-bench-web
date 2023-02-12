import TextFieldProps from "@/types/components/props/TextFieldProps";

const TextField = ({placeholder, type}:TextFieldProps) => {
    return(<>
        <input
          type={type? type : "text"}
          className="block w-full rounded-md bg-gray-700 border-none text-white placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm m-2"
          placeholder={placeholder}
        />
    </>);
}

export default TextField;