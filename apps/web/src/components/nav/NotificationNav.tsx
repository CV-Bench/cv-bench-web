import { BellIcon } from "@heroicons/react/24/outline";

const NotificationNav = () => (
  <button
    type="button"
    className="rounded-full p-1 text-slate-200 hover:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-slate-600"
  >
    <span className="sr-only">View notifications</span>
    <BellIcon className="h-6 w-6" aria-hidden="true" />
  </button>
);

export default NotificationNav;
