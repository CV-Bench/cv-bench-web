import classNames from "classnames";
import { ForwardRefExoticComponent, SVGProps } from "react";
import { SvgIconComponent } from "@mui/icons-material";

const SideNavItem = ({
  item
}: {
  item: {
    name: string;
    href: string;
    icon: SvgIconComponent;
    current: boolean;
  };
}) => {
  return (
    <>
      <a
        key={item.name}
        href={item.href}
        className={classNames(
          item.current
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
        )}
      >
        <item.icon
          className={classNames(
            item.current
              ? "text-gray-300"
              : "text-gray-400 group-hover:text-gray-300",
            "mr-4 flex-shrink-0 h-6 w-6"
          )}
          aria-hidden="true"
        />
        {item.name}
      </a>
    </>
  );
};

export default SideNavItem;
