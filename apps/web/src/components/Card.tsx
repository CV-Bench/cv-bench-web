import { ReactNode } from "react";

import { classNames } from "@/utils/strings";

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = (props) => {
  const combinedClassName = classNames(
    "bg-gray-800 rounded-lg p-4 shadow",
    props.className
  );

  return (
    <div {...props} className={combinedClassName}>
      {props.title && <h2 className="pb-2">{props.title}</h2>}
      {props.children}
    </div>
  );
};

export default Card;
