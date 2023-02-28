import { classNames } from "@/utils/strings";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { ReactNode, useState } from "react";

export interface CollapsibleProps {
  children: ReactNode;
  className?: string;
  title?: string;
  collapsed?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = (props) => {
  const [collapsed, setCollapsed] = useState(props.collapsed ? true : false);

  const combinedClassName = classNames(
    "text-white flex-1 rounded-lg shadow flex flex-col border border-white my-2",
    props.className
  );

  return (
    <div className={combinedClassName}>
      <div className="flex justify-between items-center" onClick={() => setCollapsed(!collapsed)}>
        <div>{props.title && <h2 className="p-2 text-xl">{props.title}</h2>}</div>
        {collapsed && <PlusCircleIcon className="h-12 p-2" />}
        {!collapsed && <MinusCircleIcon className="h-12 p-2" />}
      </div>
      {!collapsed && <div className="p-2 border-t border-white">
        {props.children}
      </div>}
    </div>
  );
};

export default Collapsible;
