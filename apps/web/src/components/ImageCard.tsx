/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { formatToDateString } from "@/utils/date";

import Badge from "./Badge";

export interface ImageCardProps {
  previewImage: string;
  domainTags: string[];
  createdAt: Date;
  href: string;
  name?: string;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  previewImage,
  domainTags,
  createdAt,
  href
}) => (
  <Link
    href={href}
    className={`relative p-4 rounded-lg bg-slate-800 divide-y divide-slate-600 transition-all duration-150 border border-transparent hover:border-slate-600 ${
      className ? className : ""
    }`}
  >
    <div className="w-full pb-2">
      <img className="object-contain w-full" src={previewImage} alt="" />
    </div>
    {domainTags && domainTags.length > 0 && (
      <div className="flex-wrap flex py-2">
        {domainTags.map((tag, idx) => (
          <div className="pr-2" key={idx}>
            <Badge>{tag}</Badge>
          </div>
        ))}
      </div>
    )}
    {name && (
      <div className="py-2 text-slate-200 text-sm">
        <p>{name}</p>
      </div>
    )}
    <div className="text-slate-400 text-sm pt-2 text-right">
      {formatToDateString(createdAt)}
    </div>
  </Link>
);

export default ImageCard;
