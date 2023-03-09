import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon
} from "@heroicons/react/24/outline";

interface MetricProps {
  data: [number, number, number];
  title: string;
}

const Metric: React.FC<MetricProps> = ({ title, data }) => {
  const [start, prev, curr] = data;

  const changePercentage =
    prev === 0 ? 0 : Math.round(((curr - prev) / prev) * 100);

  const getChangeStyles = (changePercentage: number) => {
    if (changePercentage < 0) {
      return {
        className: "text-red-400",
        Icon: ArrowDownIcon
      };
    }

    if (changePercentage > 0) {
      return { className: "text-green-400", Icon: ArrowUpIcon };
    }

    return { className: "text-slate-400", Icon: ArrowRightIcon };
  };

  const { className, Icon } = getChangeStyles(changePercentage);

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <p className="text-slate-200 ">{title}</p>

        <p className="text-slate-500 text-sm ">Start Value: {start}</p>
      </div>
      <div className="">
        <div className="flex bg-gray-700 w-min px-4 py-2 rounded-md space-x-2">
          <p className="text-slate-200">{curr}</p>
          <div className={`${className} flex space-x-1 items-center`}>
            <Icon className="w-4" />
            <p className="text-sm">{Math.abs(changePercentage)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metric;
