import { api } from "@/network";
import { useState } from "react";
import { DataType } from "shared-types";
import Button from "./Button";

export interface DownloadButtonProps {
  dataId: string;
  dataType: DataType;

  s3Key?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ dataId, dataType, s3Key }) => {
  const [downloadRequested, setDownloadRequested] = useState<boolean>(false);
  const downloadLink = s3Key ? `/download/${dataType}/${dataId}` : '';
  
  const requestDownload = () => {
    api.download(dataType, dataId).then(x => console.log(x)).catch(err => console.error(err))
    setDownloadRequested(true);
  }

  return (<>
    {!s3Key && <Button disabled={downloadRequested} onClick={requestDownload}>{downloadRequested ? 'Download Requested' : 'Request Download'}</Button>}
    {s3Key && <a href={downloadLink}><Button>Download</Button></a>}
  </>);
}

export default DownloadButton;