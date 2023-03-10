import { formatToDateString } from "@/utils/date";

import { NetworkMetrics, TrainMetrics, ValidationMetrics } from "shared-types";

import Card from "../Card";

import Metric from "./Metric";

interface NetworkMeticsProps {
  metrics: NetworkMetrics;
  timestamp: number;
}

const NetworkMetricsPage: React.FC<NetworkMeticsProps> = ({
  metrics,
  timestamp
}) => {
  const { train, val } = metrics;

  const getTrainMetric = (key: keyof TrainMetrics) =>
    train ? train[key] : ([0, 0, 0] as [number, number, number]);
  const getValMetric = (key: keyof ValidationMetrics) =>
    val ? val[key] : ([0, 0, 0] as [number, number, number]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 divide-y divide-slate-600">
        <div className="space-x-4 flex items-center pb-4 justify-between">
          <p className="text-slate-200">Training Metrics</p>
          <p className="text-slate-400 text-sm">
            Last updated: {formatToDateString(new Date(timestamp * 1000))}
          </p>
        </div>
        <div className="space-y-2 pt-4">
          <Metric title="Iteration" data={getTrainMetric("iter")} />
          <Metric title="Learning Rate" data={getTrainMetric("lr")} />
          <Metric title="Loss RPN CLS" data={getTrainMetric("loss_rpn_cls")} />
          <Metric
            title="Loss RPN BBox"
            data={getTrainMetric("loss_rpn_bbox")}
          />
          <Metric title="Loss Cls" data={getTrainMetric("loss_cls")} />
          <Metric title="Loss BBox" data={getTrainMetric("loss_bbox")} />
          <Metric title="Loss" data={getTrainMetric("loss")} />
          <Metric title="Acc" data={getTrainMetric("acc")} />
        </div>
      </Card>
      <Card className="p-4 divide-y divide-slate-600">
        <div className="space-x-4 flex items-center pb-4 justify-between">
          <p className="text-slate-200">Validation Metrics</p>
          <p className="text-slate-400 text-sm">
            Last updated: {formatToDateString(new Date(timestamp * 1000))}
          </p>
        </div>
        <div className="space-y-2 pt-4">
          <Metric title="Iteration" data={getValMetric("iter")} />
          <Metric title="Learning Rate" data={getValMetric("lr")} />
          <Metric title="BBox mAP" data={getValMetric("bbox_mAP")} />
          <Metric title="BBox mAP 50" data={getValMetric("bbox_mAP_50")} />
          <Metric title="BBox mAP 75" data={getValMetric("bbox_mAP_75")} />
          <Metric title="BBox mAP s" data={getValMetric("bbox_mAP_s")} />
          <Metric title="BBoc mAP m" data={getValMetric("bbox_mAP_m")} />
          <Metric title="BBoc mAP l" data={getValMetric("bbox_mAP_l")} />
        </div>
      </Card>
    </div>
  );
};

export default NetworkMetricsPage;
