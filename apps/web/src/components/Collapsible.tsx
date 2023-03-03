import { classNames } from "@/utils/strings";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { ReactNode, useState } from "react";

export interface CollapsibleProps {
  children: ReactNode;
  className?: string;
  title?: string;
  expanded?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = (props) => {
  const [collapsed, setCollapsed] = useState(props.expanded ? false : true);

  const combinedClassName = classNames(
    "text-white flex-1 rounded-lg shadow flex flex-col border border-white my-2",
    props.className
  );

  return (
    <div className={combinedClassName}>
      <div className="flex justify-between items-center" onClick={() => setCollapsed(!collapsed)}>
        <div>{props.title && <h2 className="p-2">{props.title}</h2>}</div>
        {collapsed && <PlusCircleIcon className="h-8 p-1" />}
        {!collapsed && <MinusCircleIcon className="h-8 p-1" />}
      </div>
      {!collapsed && <div className="p-2 border-t border-white">
        {props.children}
      </div>}
    </div>
  );
};

export default Collapsible;
