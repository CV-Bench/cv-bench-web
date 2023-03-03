/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { formatToDateString } from "@/utils/date";

export interface ImageCardProps {
  previewImage: string;
  domainTags: string[];
  createdAt: Date;
  href: string;
  name?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  previewImage,
  domainTags,
  name,
  createdAt,
  href
}) => (
  <Link
    href={href}
    className="relative max-w-[160px]  m-5 border-2 border-white rounded-lg bg-gray-800"
  >
    <div className="w-full p-4 border-b-2 ">
      <img className="object-contain " src={previewImage} alt="" />
    </div>
    <div className="p-3 flex-wrap flex">
      {domainTags.map((_d, idx) => (
        <span
          key={idx}
          className="bg-gray-200 flex-shrink rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {_d}
        </span>
      ))}
    </div>
    <div className="mx-2">{name}</div>
    <div className="text-white m-2">{formatToDateString(createdAt)}</div>
  </Link>
);

export default ImageCard;
