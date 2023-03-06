import { TagsInput } from "react-tag-input-component";

import TagInputProps from "@/types/components/props/TagInputProps";

const TagInput: React.FC<TagInputProps> = ({
  placeholder,
  className,
  disabled,
  tags = [],
  setTags = () => null
}) => (
  <TagsInput
    value={tags}
    onChange={setTags}
    placeHolder={placeholder}
    disabled={disabled}
    separators={["Enter", ","]}
    classNames={{
      input: `block w-full rounded-md bg-slate-700 border-none text-white placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm ${className}`,
      tag: "block rounded-md bg-slate-700 border-none text-white placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2"
    }}
  />
);

export default TagInput;
