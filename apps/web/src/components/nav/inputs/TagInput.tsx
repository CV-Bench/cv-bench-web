import TagInputProps from "@/types/components/props/TagInputProps";
import { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const TagInput = ({ placeholder }: TagInputProps) => {
  const [selected, setSelected] = useState([] as string[]);
  return (
    <>
      <TagsInput
        value={selected}
        onChange={setSelected}
        placeHolder={placeholder}
        separators={["Enter", ","]}
        classNames={{
          input:
            "block w-full rounded-md bg-gray-700 border-none text-white placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm",
        tag: "block rounded-md bg-gray-700 border-none text-white placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2"
        }}
      />
    </>
  );
};

export default TagInput;
