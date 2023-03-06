import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MinusCircleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "react-hot-toast";

import { NotificationType, ToastAppearance } from "shared-types";

export const addToast = (
  title: string,
  description: string,
  type: ToastAppearance,
  href?: string
) =>
  toast.custom((t) => (
    <Toast
      title={title}
      description={description}
      appearance={type}
      visible={t.visible}
      href={href}
    />
  ));

const getAppearanceStyles = (appearance: ToastAppearance) => {
  switch (appearance) {
    default:
    case NotificationType.SUCCESS:
      return {
        className: "text-green-400",
        icon: CheckCircleIcon
      };
    case NotificationType.ERROR:
      return {
        className: "text-red-600",
        icon: MinusCircleIcon
      };
    case NotificationType.WARNING:
      return {
        className: "text-orange-600",
        icon: ExclamationTriangleIcon
      };
    case NotificationType.INFO:
      return {
        className: "text-blue-600",
        icon: InformationCircleIcon
      };
  }
};

interface ToastProps {
  appearance: ToastAppearance;
  title: string;
  description: string;
  visible: boolean;
  href?: string;
}

const Toast: React.FC<ToastProps> = ({
  appearance,
  visible,
  title,
  description,
  href
}) => {
  const { className, icon: Icon } = getAppearanceStyles(appearance);

  return (
    <Link
      href={href || ""}
      className={`relative mb-2 flex shadow-lg rounded-md max-w-xs ${className} rounded-lg overflow-hidden bg-slate-800 py-2 pl-2 pr-8 items-start space-x-2 ${
        visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <Icon className="w-6 h-6" />
      <div>
        <p className="text-md font-medium text-slate-200">{title}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </Link>
  );
};

export default Toast;
