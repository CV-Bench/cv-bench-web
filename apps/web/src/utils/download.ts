export const download = async (data: Response, fileName: string) => {
  try {
    const blob = await data.blob();

    const newBlob = new Blob([blob]);

    const blobUrl = window.URL.createObjectURL(newBlob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    // @ts-ignore
    link.parentNode.removeChild(link);

    // clean up Url
    window.URL.revokeObjectURL(blobUrl);

    return true;
  } catch (e) {
    console.log(e);

    return false;
  }
};
