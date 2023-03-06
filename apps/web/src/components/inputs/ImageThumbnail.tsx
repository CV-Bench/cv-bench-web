/* eslint-disable @next/next/no-img-element */
import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";

interface ImageThumbnailProps {
  source: string;
  index: number;
  handleCloseClick: Function;
}

const ImageThumbnail = (props: ImageThumbnailProps) => {
  const [showClose, setShowClose] = React.useState(false);

  const handleMouseEnter = () => {
    setShowClose(true);
  };

  const handleMouseLeave = () => {
    setShowClose(false);
  };

  return (
    <div className="relative w-full">
      {showClose && (
        <XMarkIcon className="absolute top-0 left-0 text-slate-400 w-8 h-8" />
      )}
      <img
        className="hover:opacity-50 hover:cursor-pointer object-scale-down w-full h-40"
        src={props.source}
        height={90}
        width={90}
        alt={"s"}
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => props.handleCloseClick(props.index)}
      />
    </div>
  );
};

export default ImageThumbnail;
