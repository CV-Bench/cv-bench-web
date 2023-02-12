import { SvgIconComponent } from "@mui/icons-material";

type DropdownDetailedProps = {
  options: DropdownDetailedOption[];
};

type DropdownDetailedOption = {
    title: string;
    description: string;
    icon: SvgIconComponent;
};

export default DropdownDetailedProps;
