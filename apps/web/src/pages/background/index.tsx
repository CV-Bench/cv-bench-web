import Link from "next/link";

import ImageCard from "@/components/ImageCard";
import { useBackgroundList } from "@/hooks/background";

const BackgroundList: React.FC = () => {
  const { data: backgrounds } = useBackgroundList();

  if (!backgrounds) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <div className="bg-gray-800 p-4 flex rounded-lg text-white">
        <Link href="/background/upload">Upload Background</Link>
      </div>

      <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-4">
        {backgrounds.map((background) => (
          <ImageCard
            {...background}
            className="w-full"
            href={`/background/${background._id}`}
            name={undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundList;
