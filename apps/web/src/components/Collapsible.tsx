import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";

import { classNames } from "@/utils/strings";

export interface CollapsibleProps {
  children: ReactNode;
  className?: string;
  title?: string;
  expanded?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = (props) => {
  const [collapsed, setCollapsed] = useState(props.expanded ? false : true);

  const combinedClassName = classNames(
    "text-slate-200 flex-1 flex flex-col divide-y divide-slate-700 ",
    props.className
  );

  return (
    <div className={combinedClassName}>
      <div
        className="flex justify-between items-center text-slate-200 transition-all duration-150 hover:text-slate-400"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div>{props.title && <h2 className="py-2">{props.title}</h2>}</div>
        {collapsed && <PlusCircleIcon className="h-5 w-5" />}
        {!collapsed && <MinusCircleIcon className="h-5 w-5" />}
      </div>
      {!collapsed && <div className="py-2">{props.children}</div>}
    </div>
  );
};

export default Collapsible;
