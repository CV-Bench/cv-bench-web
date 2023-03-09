import { useMemo } from "react";

import { formatToDateString } from "@/utils/date";
import { reorderObjects } from "@/utils/metrics";

import {
  NetworkMetrics,
  TrainMetricKeys,
  ValidationMetricKeys
} from "shared-types";

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

  const trainReordered = useMemo(() => {
    return reorderObjects<TrainMetricKeys>(train);
  }, [train]);
  const validationReordered = useMemo(() => {
    return reorderObjects<ValidationMetricKeys>(val);
  }, [val]);

  console.log(trainReordered, validationReordered);

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
          <Metric title="Iteration" data={trainReordered["iter"]} />
          <Metric title="Learning Rate" data={trainReordered["lr"]} />
          <Metric title="Loss RPN CLS" data={trainReordered["loss_rpn_cls"]} />
          <Metric
            title="Loss RPN BBox"
            data={trainReordered["loss_rpn_bbox"]}
          />
          <Metric title="Loss Cls" data={trainReordered["loss_cls"]} />
          <Metric title="Loss BBox" data={trainReordered["loss_bbox"]} />
          <Metric title="Loss" data={trainReordered["loss"]} />
          <Metric title="Acc" data={trainReordered["acc"]} />
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
          <Metric title="Iteration" data={validationReordered["iter"]} />
          <Metric title="Learning Rate" data={validationReordered["lr"]} />
          <Metric title="BBox mAP" data={validationReordered["bbox_mAP"]} />
          <Metric
            title="BBox mAP 50"
            data={validationReordered["bbox_mAP_50"]}
          />
          <Metric
            title="BBox mAP 75"
            data={validationReordered["bbox_mAP_75"]}
          />
          <Metric title="BBox mAP s" data={validationReordered["bbox_mAP_s"]} />
          <Metric title="BBoc mAP m" data={validationReordered["bbox_mAP_m"]} />
          <Metric title="BBoc mAP l" data={validationReordered["bbox_mAP_l"]} />
        </div>
      </Card>
    </div>
  );
};

export default NetworkMetricsPage;
