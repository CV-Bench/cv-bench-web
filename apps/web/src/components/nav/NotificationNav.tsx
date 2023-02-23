import { BellIcon } from "@heroicons/react/24/outline";

const NotificationNav = () => (
  <button
    type="button"
    className="rounded-full bg-gray-700 p-1 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
  >
    <span className="sr-only">View notifications</span>
    <BellIcon className="h-6 w-6" aria-hidden="true" />
  </button>
);

export default NotificationNav;
