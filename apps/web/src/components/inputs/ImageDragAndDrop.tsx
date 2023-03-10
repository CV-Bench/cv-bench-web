import { ArrowUpTrayIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";

import ImageThumbnail from "./ImageThumbnail";

interface ImageDragAndDropProps {
  files: any[];
  setFiles: Function;
}

const ImageDragAndDrop: React.FC<ImageDragAndDropProps> = ({
  files,
  setFiles
}) => {
  const handleCloseClick = (index: number) => {
    setFiles(files.filter((file, i) => i !== index));
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const acceptedTypes = ["image/jpeg", "image/png"];
    const newFiles = [...event.dataTransfer.files]
      .filter((file) => acceptedTypes.includes(file.type))
      .map((file) => ({
        content: URL.createObjectURL(file),
        name: file.name,
        file
      }));
    setFiles([...files, ...newFiles]);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleFileInputChange = (event: any) => {
    const acceptedTypes = ["image/jpeg", "image/png"];

    const newFiles = [...event.target.files]
      .filter((file) => acceptedTypes.includes(file.type))
      .map((file) => ({
        content: URL.createObjectURL(file),
        name: file.name,
        file
      }));
    setFiles([...files, ...newFiles]);
  };

  const handleDivClick = (event: any) => {
    const target = event.target as Element;
    if (target.tagName !== "IMG") {
      const fileInput = document.getElementById("file-input-imageDragAndDrop");
      if (fileInput) {
        fileInput.click();
      }
    }
  };

  return (
    <>
      <div
        onClick={handleDivClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="h-full w-full flex flex-wrap  max-h-full overflow-y-auto"
      >
        {files.length === 0 ? (
          <div className="flex justify-center items-center h-full w-full space-x-2 transition-all duration-150 text-slate-200 hover:text-slate-400">
            <ArrowUpTrayIcon className=" w-6 h-6" />
            <p>Drop background(s) here OR click to preview your files</p>
          </div>
        ) : (
          <div className="grid-cols-5 grid gap-4 w-full">
            {files.map((file, index) => (
              <ImageThumbnail
                key={index}
                index={index}
                source={file.content}
                handleCloseClick={handleCloseClick}
              />
            ))}
          </div>
        )}
      </div>
      <input
        id="file-input-imageDragAndDrop"
        type="file"
        multiple
        accept="image/jpeg,image/png"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </>
  );
};

export default ImageDragAndDrop;
