import { Fragment, ReactElement, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import SideNavContainer from "./side/SideNavContainer";
import ProfileNav from "./top/ProfileNav";
import TopNavContainer from "./top/TopNavContainer";

const NavLayout = ({children}:{children:ReactElement<any, any>}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <SideNavContainer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        <div className="md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow ">
            <button
              type="button"
              className="border-r border-gray-600 px-4 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden bg-gray-800"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <TopNavContainer />
          </div>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default NavLayout;
