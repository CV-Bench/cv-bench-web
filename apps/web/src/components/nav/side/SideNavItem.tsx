import classNames from "classnames";
import { ForwardRefExoticComponent, SVGProps } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import Link from "next/link";

const SideNavItem = ({
  item,
  active
}: {
  item: {
    name: string;
    href: string;
    icon: SvgIconComponent;
  };
  active: boolean;
}) => {
  return (
    <>
      <Link
        key={item.name}
        href={item.href}
        className={classNames(
          active
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white",
          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
        )}
      >
        <item.icon
          className={classNames(
            active
              ? "text-gray-300"
              : "text-gray-400 group-hover:text-gray-300",
            "mr-4 flex-shrink-0 h-6 w-6"
          )}
          aria-hidden="true"
        />
        {item.name}
      </Link>
    </>
  );
};

export default SideNavItem;
