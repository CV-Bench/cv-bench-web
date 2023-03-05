import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface ButtonCardProps {
  title: string;
  description: string;
  href: string;
}

const ButtonCard: React.FC<ButtonCardProps> = ({
  title,
  description,
  href
}) => (
  <Link
    href={href}
    className="bg-gray-800 p-4 rounded-md relative group shadow transition-all duration-150 border border-transparent hover:border-gray-600"
  >
    <ArrowUpRightIcon className="absolute right-4 top-4 w-6 h-6 text-gray-600 group-hover:text-gray-400 transition-all duration-150" />
    <div className="space-y-2">
      <p className="font-medium text-md text-gray-200">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </Link>
);

export default ButtonCard;
