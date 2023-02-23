import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Fragment } from "react";
import NotificationNav from "./NotificationNav";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarRoutes = [
  {
    title: "Dashboard",
    href: "/",
    matcher: /^\/(#.*)?$/
  },
  {
    title: "Models",
    href: "/model",
    matcher: /^\/model(\/.*)?$/
  },
  {
    title: "Backgrounds",
    href: "/background",
    matcher: /^\/background(\/.*)?$/
  },
  {
    title: "Datasets",
    href: "/dataset",
    matcher: /^\/dataset(\/.*)?$/
  },
  {
    title: "Networks",
    href: "/network",
    matcher: /^\/network(\/.*)?$/
  }
];

const ProfileDropdownRoutes = [
  {
    title: "Profile",
    href: "/profile",
    matcher: /^\/profile(\/.*)?$/
  },
  {
    title: "Sign out",
    href: "/signout",
    matcher: /^\/signout(\/.*)?$/
  }
];

const Navbar = () => {
  const route = useRouter();

  const activeNavbarRoute = NavbarRoutes.findIndex(({ matcher }) =>
    route.pathname.match(matcher)
  );

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {NavbarRoutes.map(({ href, title, matcher }, index) => (
                    <Link
                      href={href}
                      key={title}
                      className={`inline-flex items-center ${
                        activeNavbarRoute === index
                          ? "border-b-2 border-indigo-500 text-gray-900"
                          : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }  px-1 pt-1 text-sm font-medium `}
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <NotificationNav />

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {ProfileDropdownRoutes.map(({ href, title }) => (
                        <Menu.Item key={title}>
                          {({ active }) => (
                            <a
                              href={href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {title}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {NavbarRoutes.map(({ href, title }, index) => (
                <Disclosure.Button
                  as="a"
                  key={index}
                  href={href}
                  className={`block border-l-4 ${
                    activeNavbarRoute === index
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  }  py-2 pl-3 pr-4 text-base font-medium `}
                >
                  {title}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4 justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      tom@example.com
                    </div>
                  </div>
                </div>
                <NotificationNav />
              </div>
              <div className="mt-3 space-y-1">
                {ProfileDropdownRoutes.map(({ href, title }, index) => (
                  <Disclosure.Button
                    as={Link}
                    key={index}
                    href={href}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    {title}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
