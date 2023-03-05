import { PhotoIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import Button from "@/components/Button";
import Card from "@/components/Card";
import ImageCard from "@/components/ImageCard";
import TableHeader from "@/components/TableHeader";
import { useBackgroundList } from "@/hooks/background";

const BackgroundList: React.FC = () => {
  const { data: backgrounds } = useBackgroundList();

  if (!backgrounds) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <Card>
        <div className="p-4 flex space-x-4">
          <div>
            <div className="w-8 h-8 flex items-center justify-center text-gray-600">
              <PhotoIcon />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="space-y-1">
              <p className="font-medium text-lg text-gray-200">Backgrounds</p>
              <p className="text-sm text-gray-400"></p>
            </div>
            <Link href="/background/upload">
              <Button>Upload Background</Button>
            </Link>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-4">
        {backgrounds.map((background, i) => (
          <ImageCard
            {...background}
            className="w-full"
            key={i}
            href={`/background/${background._id}`}
            name={undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundList;
