import { Menu } from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { MouseEventHandler } from "react";

const ProfileNavItem = ({
  item
}: {
  item: { name: string; href: string; onclick?: Function };
}) => {
  return (
    <>
      <Menu.Item key={item.name}>
        {({ active }) => (
          <Link
            href={item.href}
            onClick={item.onclick as MouseEventHandler<HTMLAnchorElement>}
            className={classNames(
              active ? "bg-gray-800" : "",
              "block px-4 py-2 text-sm text-white"
            )}
          >
            {item.name}
          </Link>
        )}
      </Menu.Item>
    </>
  );
};

export default ProfileNavItem;
