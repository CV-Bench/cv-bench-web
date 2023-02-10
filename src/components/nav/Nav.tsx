import { Fragment, useState } from "react";
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

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <SideNavContainer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

        <div className="flex flex-col md:pl-64">
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
            {/* CHILDREN WILL GO HERE */}
            {/* {children} */}
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-white">
                  Dashboard
                </h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  <div className="h-96 rounded-lg border-4 border-dashed border-white" />
                </div>
                {/* /End replace */}
              </div>
            </div>
            {/* END OF WHERE CHILDREN GO */}
          </main>
        </div>
      </div>
    </>
  );
};

export default Nav;
