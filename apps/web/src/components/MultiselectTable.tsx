import { useCallback, useMemo } from "react";

import Table, { TableItem, TableProps } from "./Table";

export interface MultiselectTableProps extends TableProps {
  className?: string;

  selectedItems?: TableItem[];
  onSelectItems?: (items: TableItem[]) => void;

  selectCount?: number;
}

const MultiselectTable: React.FC<MultiselectTableProps> = ({
  selectedItems = [],
  onSelectItems,
  selectCount,
  className,
  data,
  ...props
}) => {
  const selectItem = useCallback(
    (item: TableItem) => {
      if (!onSelectItems) {
        return;
      }

      const itemIdx = selectedItems.reduce(
        (i, { _id }, index) => (item._id === _id ? index : i),
        -1
      );

      if (itemIdx > -1) {
        selectedItems.splice(itemIdx, 1);
      } else {
        if (selectCount && selectedItems.length >= selectCount) {
          selectedItems.splice(0, selectedItems.length - selectCount + 1);
        }
        selectedItems.push(item);
      }

      onSelectItems([...selectedItems]);
    },
    [onSelectItems, selectCount, selectedItems]
  );

  const newData = useMemo(() => {
    const selectedIds = selectedItems.map(({ _id }) => _id);

    return data.map((x) => ({
      ...x,
      className: selectedIds.includes(x._id) ? " !bg-slate-600" : undefined,
      callback: () => selectItem(x)
    }));
  }, [data, selectedItems, selectItem]);

  return (
    <div className={className ? ` ${className}` : ""}>
      <Table className="flex-1" data={newData} {...props} />
      <div className="bg-slate-900/70 text-center text-slate-200 p-2">
        {selectedItems.length} items selected
      </div>
    </div>
  );
};

export default MultiselectTable;
