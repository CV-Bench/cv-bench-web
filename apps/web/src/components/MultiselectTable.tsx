import { useEffect, useState } from "react";
import Table, { TableItem, TableProps } from "./Table";

export interface MultiselectTableProps extends TableProps {
  className?: string;
  title?: string;

  selectedItems?: TableItem[];
  onSelectItems?: (items: TableItem[]) => void;
}

const MultiselectTable: React.FC<MultiselectTableProps> = ({ selectedItems = [], onSelectItems, className, ...props}) => {

  const selectItem = (item: TableItem) => {
    const itemIdx = selectedItems.indexOf(item);
    if (itemIdx > -1) {
      selectedItems.splice(itemIdx, 1);
    }
    else {
      selectedItems.push(item);
    }
    onSelectItems?.call(this, [...selectedItems]);
  }

  const highlightedClassName = ' font-bolder';

  props.data.forEach(x => {
    x.callback = () => selectItem(x);
    if (selectedItems.includes(x)) {
      x.className += highlightedClassName;
    }
    else {
      x.className = x.className?.replaceAll(highlightedClassName, '');
    }
  });

  return (
    <div className={"flex flex-col" + (className ? ` ${className}` : '')}>
        <Table className="flex-1 bg-gray-700/50" {...props} />
        <div className="bg-gray-900 text-center p-2">{selectedItems.length} items selected</div>
    </div>
  );
};

export default MultiselectTable;
