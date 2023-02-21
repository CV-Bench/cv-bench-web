import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler, useRef } from "react";
import Card from "../Card";

export interface SelectedFile {
  filename: string;
  data: string;
}

export interface FileInputProps {
  className?: string;
  multiple?: boolean;
  accept: string[];
  title: string;
  selectedFiles?: SelectedFile[];
  setSelectedFiles: (val: SelectedFile[]) => void;
}

const FileInput: React.FC<FileInputProps> = ({className, title, accept, multiple, setSelectedFiles, selectedFiles=[]}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const acceptTypes = accept.join(',');

  const addFiles = (...files: SelectedFile[]) => {
    if (multiple) {
      setSelectedFiles([...selectedFiles, ...files]);
      return;
    }
    setSelectedFiles([...files]);
  }

  const removeFile = (file: SelectedFile) => {
    selectedFiles.splice(selectedFiles.indexOf(file), 1);
    setSelectedFiles([...selectedFiles]);
  }

  const onClick = () => fileInputRef.current?.click();
  const onSelectFile: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.target.files && ev.target.files.length > 0) {
      const filesToLoad = Array.from(ev.target.files).map(file => new Promise<SelectedFile>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (result) => {
          resolve({
            filename: file.name,
            data: result.target?.result as string
          });
        }
        reader.onabort = () => reject();
        reader.readAsDataURL(file);
      }))
      const selectedFiles = await Promise.all(filesToLoad);
      addFiles(...selectedFiles);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return(          
    <Card className={`transition-all bg-indigo-900 p-0 ${className}`}>
      <div className="text-white text-center">
        <div className="bg-indigo-700 cursor-pointer hover:bg-indigo-800 rounded-t-lg p-2" onClick={onClick}>
          {title}
        </div>
        {
          selectedFiles.length == 0 &&
          <div className="text-sm p-2">
            Click or drag & drop your files ({accept.join(' / ')})
          </div>
        }
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
    </Card>
  );
}

export default FileInput;