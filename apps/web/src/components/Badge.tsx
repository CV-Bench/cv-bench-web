import { TaskStatus, TaskType } from "shared-types";

type BadgeVariant = TaskStatus | TaskType | "default";

type BadgeSize = "sm" | "lg";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children?: React.ReactNode;
}

const getBadgeVariantStyle = (variant: BadgeVariant) => {
  return "border border-gray-200 text-gray-200";
};

const getBadgeSizeStyle = (size: BadgeSize) => {
  switch (size) {
    default:
    case "sm": {
      return "px-2.5 py-0.5 text-xs";
    }
    case "lg": {
      return "px-3 py-0.5 text-sm";
    }
  }
};

const capitalizeFirst = (str: string) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
};

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "sm",
  children
}) => {
  const variantClassname = getBadgeVariantStyle(variant);
  const sizeClassname = getBadgeSizeStyle(size);

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantClassname} ${sizeClassname}`}
    >
      {children || capitalizeFirst(variant)}
    </span>
  );
};

export default Badge;
