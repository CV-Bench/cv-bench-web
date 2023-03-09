/* eslint-disable @next/next/no-img-element */
import { useNetworkPreviews } from "@/hooks/network";

import Card from "../Card";

interface NetworkPreviewImagesProps {
  taskId: string;
}

const NetworkPreviewImages: React.FC<NetworkPreviewImagesProps> = ({
  taskId
}) => {
  const { data: networkPreviewList } = useNetworkPreviews(taskId);

  if (!networkPreviewList || networkPreviewList.length <= 0) {
    return null;
  }

  return (
    <Card className="p-4 divide-y divide-slate-600">
      <p className="text-slate-200 pb-4">Preview Images</p>
      <div className="py-4 grid grid-cols-6 gap-4">
        {networkPreviewList.map(({ image }) => (
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

export default NetworkPreviewImages;
