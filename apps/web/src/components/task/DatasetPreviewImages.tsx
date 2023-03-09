/* eslint-disable @next/next/no-img-element */
import { useDatasetPreviews } from "@/hooks/dataset";

import Card from "../Card";

interface DatasetPreviewImagesProps {
  taskId: string;
}

const DatasetPreviewImages: React.FC<DatasetPreviewImagesProps> = ({
  taskId
}) => {
  const { data: datasetPreviewList } = useDatasetPreviews(taskId);

  if (!datasetPreviewList || datasetPreviewList.length <= 0) {
    return null;
  }

  return (
    <Card className="p-4 divide-y divide-slate-600">
      <p className="text-slate-200 pb-4">Preview Images</p>
      <div className="py-4 grid grid-cols-6 gap-4">
        {datasetPreviewList.map(({ image }) => (
          <div className="flex items-center ">
            <img
              src={image}
              className="w-full h-full object-cover"
              alt="Dataset Preview Image"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DatasetPreviewImages;
