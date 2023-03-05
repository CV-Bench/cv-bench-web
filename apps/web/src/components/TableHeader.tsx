interface TableHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  description,
  children,
  icon
}) => (
  <div className="p-4 flex space-x-4 border-b border-gray-600 ">
    <div>
      <div className="w-8 h-8 flex items-center justify-center text-gray-600">
        {icon}
      </div>
    </div>
    <div className="flex flex-col space-y-4">
      <div className="space-y-1">
        <p className="font-medium text-lg text-gray-200">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      {children}
    </div>
  </div>
);

export default TableHeader;
