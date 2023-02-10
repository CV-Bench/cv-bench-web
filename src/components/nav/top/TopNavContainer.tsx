import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import NotificationNav from "./NotificationNav";
import ProfileNav from "./ProfileNav";

const TopNavContainer = () => {
  return (
    <>
      <div className="flex flex-1 justify-between px-4 bg-gray-800">
        <div className="flex flex-1">
          <form className="flex w-full md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-500 focus-within:text-gray-400">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-white placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm bg-gray-800"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <NotificationNav/>

          <ProfileNav />
        </div>
      </div>
    </>
  );
};

export default TopNavContainer;
