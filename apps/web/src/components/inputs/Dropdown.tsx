import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Fragment, useState } from "react";

import DropdownProps from "@/types/components/props/DropdownProps";

const Dropdown = ({ options }: DropdownProps) => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <>
      <Menu as="div" className="relative inline-block text-left m-2">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none">
            {selected.title}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {options.map((option) => (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        setSelected(option);
                      }}
                      className={classNames(
                        active ? "bg-slate-800" : "",
                        "block px-4 py-2 text-sm w-full text-white"
                      )}
                    >
                      {option.title}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default Dropdown;
