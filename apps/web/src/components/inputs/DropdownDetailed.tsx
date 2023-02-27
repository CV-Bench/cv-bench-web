import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { Fragment, useState } from "react";

import DropdownDetailedProps from "@/types/components/props/DropdownDetailedProps";

const DropdownDetailed = ({ options }: DropdownDetailedProps) => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="relative">
              <div className="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm m-2">
                <div className="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm">
                  <div className="inline-flex items-center rounded-l-md border border-transparent bg-indigo-500 py-2 pl-3 pr-4 text-white shadow-sm">
                    <selected.icon className={"h-5 w-5"} />
                    <p className="ml-2.5 text-sm font-medium">
                      {selected.title}
                    </p>
                  </div>
                  <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-indigo-500 p-2 text-sm font-medium text-white hover:bg-indigo-600">
                    <span className="sr-only">Change published status</span>
                    <ChevronDownIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </Listbox.Button>
                </div>
              </div>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute left-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-500 overflow-hidden rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.title}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-500" : "",
                          "cursor-pointer select-none p-4 text-sm text-white"
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <div className="flex flex-col">
                          <div className="flex justify-between">
                            <p
                              className={
                                selected ? "font-semibold" : "font-normal"
                              }
                            >
                              {option.title}
                            </p>
                            {selected ? (
                              <span className={"text-white"}>
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </div>
                          <p className={"mt-2 text-gray-200"}>
                            {option.description}
                          </p>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
};

export default DropdownDetailed;
