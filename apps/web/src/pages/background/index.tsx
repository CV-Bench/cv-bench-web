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
    <div className="grid grid-cols-4 text-white container mx-auto py-8 divide-x divide-slate-600 relative">
      <div className="pr-2 relative">
        <Card className="sticky top-8">
          <div className="p-4 flex space-x-4">
            <div>
              <div className="w-12 h-12 flex items-center justify-center text-slate-600">
                <PhotoIcon className="w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="space-y-1">
                <p className="font-medium text-lg text-slate-200">
                  Backgrounds
                </p>
                <p className="text-sm text-slate-400"></p>
              </div>
              <Link href="/background/upload">
                <Button>Upload Background</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4 col-span-3 pl-2">
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
