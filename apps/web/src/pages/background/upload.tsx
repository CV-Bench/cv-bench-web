import TagInput from "@/components/inputs/TagInput"
import InputLabel from "@/components/inputs/InputLabel"
import Card from "@/components/Card"
import Button from "@/components/Button"
import RadioGroupSelection from "@/components/inputs/RadioGroupSelection"
import ImageDragAndDrop from "@/components/inputs/ImageDragAndDrop"
import { useState } from "react";

export interface UploadBackgroundData {
  tags?: string[];
  accessType?: string;
}


const UploadBackground = () => {

  const [formData, setFormData] = useState<UploadBackgroundData>({ accessType: 'Private' });
  const [files, setFiles] = useState<any>([]);
  const onSelectTags = (val: string[]) => setFormData({ ...formData, tags: val });
  const onSelectAccessType = (val: string | number) => setFormData({ ...formData, accessType: String(val) });

  function uploadToBackend() {
      console.log(formData)
      console.log(files)
      //TODO

  };

  return (<>
      <div className="lg:h-3/4">
          <div className="lg:flex min-h-full max-h-full">
              <div className="lg:w-1/3 lg:pr-2 lg:pb-0 pb-2">
                  <Card className="flex flex-col h-full">
                      <InputLabel>Tags</InputLabel>
                      <TagInput tags={formData.tags} setTags={onSelectTags} placeholder="Tags" />
                  </Card>
              </div>
              <div className="lg:w-2/3 lg:pl-2 lg:pt-0 pt-2 min-h-full overflow-auto ">
                  <Card className="lg:max-h-full h-full">
                      <ImageDragAndDrop files={files} setFiles={setFiles} />
                  </Card>
              </div>
          </div>
      </div>
      <div className="lg:h-1/4 pt-4">
          <Card className="flex p-0  ">
              <div className="flex-1 p-4">
                  <div className="mt-3">
                      <InputLabel>Access Type</InputLabel>
                      <RadioGroupSelection values={['Private', 'Public']} selected={formData.accessType || ""} onSelect={onSelectAccessType} />
                  </div>
              </div>
              <div className="border-l border-indigo-50">
              </div>
              <div className="flex-1 p-4">
                  <InputLabel>Upload</InputLabel>
                  <Button onClick={uploadToBackend} className="m-2">Upload</Button>
              </div>
          </Card>
      </div>

  </>);
};

      export default UploadBackground;
