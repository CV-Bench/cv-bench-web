/* eslint-disable @next/next/no-img-element */
import { CubeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";
import { useModelList } from "@/hooks/model";
import { formatToDateString } from "@/utils/date";

const ModelList = () => {
  const { data: models } = useModelList();

  const header = [
    {
      key: "name",
      title: "Name"
    },
    {
      key: "createdAt",
      title: "Created At"
    },
    {
      key: "domainTags",
      title: "Tags"
    }
  ];

  if (!models) {
    return null;
  }

  return (
    <div className="grid grid-cols-4 text-white container mx-auto py-8 divide-x divide-slate-600 relative">
      <div className="pr-2 relative">
        <Card className="sticky top-8">
          <div className="p-4 flex space-x-4">
            <div>
              <div className="w-12 h-12 flex items-center justify-center text-slate-600">
                <CubeIcon className="w-full h-full" />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="space-y-1">
                <p className="font-medium text-lg text-slate-200">Models</p>
                <p className="text-sm text-slate-400">Models description</p>
              </div>
              <Link href="/model/upload">
                <Button>Upload Model</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-4 col-span-3 pl-2">
        {models.map(
          ({ domainTags, createdAt, updatedAt, previewImage, name, _id }) => (
            <Link
              href={`/model/${_id}`}
              className="relative p-4 rounded-lg bg-slate-800 divide-y divide-slate-600 transition-all duration-150 border border-transparent hover:border-slate-600"
            >
              <div className="w-full pb-2">
                <img
                  className="object-cover w-full h-64"
                  src={previewImage}
                  alt={name}
                />
              </div>
              <div className="p-2">
                <p className="text-sm text-slate-200">{name}</p>
              </div>
              {domainTags.length > 0 && (
                <div className="flex-wrap flex py-2">
                  {domainTags.map((tag, idx) => (
                    <div className="pr-2" key={idx}>
                      <Badge>{tag}</Badge>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-slate-400 text-sm pt-2 text-right px-2">
                <div className="flex justify-between">
                  <p className="text-xs text-slate-600">Created At</p>
                  {formatToDateString(createdAt)}
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-slate-600">Updated At</p>
                  {formatToDateString(updatedAt)}
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default ModelList;
