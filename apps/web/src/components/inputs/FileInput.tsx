import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler, DragEventHandler, useRef } from "react";
import { DataUrlFile } from "types";



export interface FileInputProps {
  className?: string;
  multiple?: boolean;
  accept: string[];
  selectedFiles?: DataUrlFile[];
  setSelectedFiles: (val: DataUrlFile[]) => void;
}

const FileInput: React.FC<FileInputProps> = ({ className, accept, multiple, setSelectedFiles, selectedFiles = [] }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const acceptTypes = accept.join(',');

  const addFiles = (...files: DataUrlFile[]) => {
    if (multiple) {
      setSelectedFiles([...selectedFiles, ...files]);
      return;
    }
    setSelectedFiles([...files]);
  }

  const removeFile = (file: DataUrlFile) => {
    selectedFiles.splice(selectedFiles.indexOf(file), 1);
    setSelectedFiles([...selectedFiles]);
  }

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => event.preventDefault();

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    loadFiles(event.dataTransfer.files);
  };

  const handleClick = () => fileInputRef.current?.click();

  const loadFiles = async (files: FileList) => {
    const filesToLoad = Array.from(files).map(file => new Promise<DataUrlFile>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (result) => {
        resolve({
          filename: file.name,
          dataUrl: result.target?.result as string
        });
      }
      reader.onabort = () => reject();
      reader.readAsDataURL(file);
    }))
    const selectedFiles = await Promise.all(filesToLoad);
    addFiles(...selectedFiles);
  }

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.target.files && ev.target.files.length > 0) {
      await loadFiles(ev.target.files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className={`rounded-lg bg-indigo-800 text-white ${className} overflow-hidden`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>

      <div onClick={handleClick} className={`text-center ${(selectedFiles.length == 0 ? 'min-h-[6rem]' : 'min-h-[3rem]')} rounded-lg flex justify-center items-center cursor-pointer transition-all duration-500 bg-indigo-600 hover:bg-indigo-400`}>
        Click or drag & drop your files ({accept.join(' / ')})
      </div>

      <div className="text-white text-center">
        {
          selectedFiles.length > 0 &&
          <div className="text-sm p-2">
            <ul className="flex flex-col items-center">
              {selectedFiles.map((file, idx) => (
                <li className="flex" key={idx}>{file.filename} <XMarkIcon onClick={() => removeFile(file)} className="h-6 w-6" /></li>
              ))}
            </ul>
          </div>
        }

      </div>
      <input ref={fileInputRef} accept={acceptTypes} type="file" onChange={onSelectFile} multiple={multiple} hidden />
    </div>
  );
}

export default FileInput;