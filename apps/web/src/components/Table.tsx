import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface TableItem {
  callback?: () => void;
  href?: string;
  _id?: string;
  className?: string;
  [key: string]: any;
}

export interface TableHeader {
  title: string;
  key: string;
}

export interface ShowMoreButton {
  text: string;
  href: string;
}

export interface TableProps {
  className?: string;
  data: TableItem[];
  emptyTableMessage?: string;
  header: TableHeader[];
  minItems?: number;
  showMoreButton?: ShowMoreButton;
}

const TableItemLink: React.FC<{
  href: string;
  children: React.ReactNode;
  className: string;
}> = ({ href, children, className }) => (
  <Link legacyBehavior href={href}>
    <a className={className}>{children}</a>
  </Link>
);

const TableItemButton: React.FC<{
  children: React.ReactNode;
  className: string;
  callback?: () => void;
}> = ({ callback, className, children }) => (
  <button
    className={className}
    onClick={callback ? () => callback() : () => {}}
  >
    {children}
  </button>
);

const Table: React.FC<TableProps> = ({
  className,
  header,
  data,
  showMoreButton,
  minItems = 0,
  emptyTableMessage
}) => {
  const tableCols = header.length;
  const keys = header.map(({ key }) => key);

  const [stateData, setStateData] = useState(data);

  useEffect(() => {
    if (minItems && minItems > 0) {
      console.log(minItems);

      const appendItems = new Array(minItems).fill({});
      const newStateData = [...data, ...appendItems].slice(0, minItems);

      setStateData(newStateData);
    } else {
      setStateData(data);
    }
  }, [minItems, data]);

  const safeList =
    "grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6";

  return (
    <div className={(className ? ` ${className}` : '')}>
      <div
        className={`grid grid-cols-${tableCols} bg-gray-900  divide-x divide-gray-600`}
      >
        {header.map(({ title }, index) => (
          <p className="uppercase font-bold text-sm py-2 px-4" key={index}>
            {title}
          </p>
        ))}
      </div>
      <div className="relative ">
        {showMoreButton && (
          <div className="absolute h-full flex justify-center items-end w-full bg-gradient-to-b from-transparent to-gray-800">
            <div className="pb-8">
              <Link legacyBehavior href={showMoreButton.href}>
                <a className="text-indigo-400 text-base hover:text-indigo-500 transition-all duration-150">
                  {showMoreButton.text}
                </a>
              </Link>
            </div>
          </div>
        )}
        <div>
          {
            // className="h-24 overflow-y-scroll"
          }
          {stateData.map((items, index) => {
            const children = keys.map((key, index) => (
              <div className={`px-4 py-2`} key={index}>
                {items[key] ? (
                  items[key]
                ) : (
                  <p className="text-transparent select-none">.</p>
                )}
              </div>
            ));
            const className = `text-gray-200 grid grid-cols-${tableCols} divide-x divide-gray-600 text-left w-full hover:bg-gray-700 transition-all duration-150 bg-gray-800 ${
              items.className ? items.className : ""
            }`;

            if (items.href) {
              return (
                <TableItemLink
                  href={items.href}
                  className={className}
                  key={index}
                >
                  {children}
                </TableItemLink>
              );
            }

            return (
              <TableItemButton
                callback={items.callback}
                className={className}
                key={index}
              >
                {children}
              </TableItemButton>
            );
          })}
        </div>
        {stateData.length <= 0 && (
          <div className="h-96 flex items-center justify-center">
            <p className="text-lg font-semibold">
              There is currently no data to show here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
