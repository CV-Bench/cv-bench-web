/* eslint-disable @next/next/no-img-element */
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

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
    <div className="relative m-5 ">
      {showClose && <CloseIcon className="absolute top-0 left-0 bg-white" />}
      <img
        className="hover:opacity-5 hover:cursor-pointer object-scale-down h-40 w-40"
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
