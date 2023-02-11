import Dropdown from "@/components/nav/inputs/Dropdown";
import DropdownDetailed from "@/components/nav/inputs/DropdownDetailed";
import TagInput from "@/components/nav/inputs/TagInput";
import TextField from "@/components/nav/inputs/TextField";
import AlarmIcon from "@mui/icons-material/Alarm";
import ContrastIcon from "@mui/icons-material/Contrast";

const CreateDataset = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DropdownDetailed
          options={[
            {
              title: "Fast Bounding Boxes",
              description:
                "Faster to create, but results in looser bounding Boxes",
              icon: AlarmIcon
            },
            {
              title: "Tight Bounding Boxes",
              description:
                "Slower to create, but results in tighter bounding Boxes",
              icon: ContrastIcon
            }
          ]}
        />
        <Dropdown options={[{ title: "Option 1" }, { title: "Option 2" }]} />
        <TextField placeholder="Name"/>
        <TagInput placeholder="Add Tags"/>
      </div>
    </>
  );
};

export default CreateDataset;
