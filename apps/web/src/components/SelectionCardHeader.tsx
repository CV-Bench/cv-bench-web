import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SelectionCardHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkHref?: string;
  linkText?: string;
}

const SelectionCardHeader: React.FC<SelectionCardHeaderProps> = ({
  icon,
  title,
  description,
  linkHref,
  linkText
}) => {
  return (
    <div className="flex p-4 space-x-4">
      <div>
        <div className="w-12 h-12 flex items-center justify-center text-xl font-bold text-indigo-600">
          {icon}
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="font-medium text-lg">{title}</p>
          <p className="text-sm">{description}</p>
        </div>

        {linkHref && (
          <Link
            href={linkHref}
            className="flex items-center space-x-2 text-slate-400 hover:text-slate-200 transition-all duration-150"
          >
            <PlusIcon className="w-4 h-4" />
            <p className="text-sm">{linkText}</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SelectionCardHeader;
