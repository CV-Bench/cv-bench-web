/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { formatToDateString } from "@/utils/date";

import { BackgroundDb } from "types";

const BackgroundCard: React.FC<BackgroundDb> = ({
  _id,
  previewImage,
  name,
  domainTags,
  accessType,
  createdAt
}) => (
  <Link
    href={`/background/${_id}`}
    className="relative  m-5 border-2 border-white rounded-lg bg-gray-800"
  >
    <div className="w-full p-4 border-b-2 ">
      <img className="object-content " src={previewImage} alt="" />
    </div>
    <div className="p-3 mb-6 flex-wrap flex">
      {domainTags.map((_d) => (
        <span className="bg-gray-200 flex-shrink rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {_d}
        </span>
      ))}
    </div>
    <div className="absolute text-white right-2 bottom-1">
      {formatToDateString(createdAt)}
    </div>
  </Link>
);

export default BackgroundCard;
