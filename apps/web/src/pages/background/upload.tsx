import { Router, useRouter } from "next/router";
import { useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import ImageDragAndDrop from "@/components/inputs/ImageDragAndDrop";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import { api } from "@/network";

import { AccessType, PostBackground } from "types";

export interface UploadBackgroundData {
  tags?: string[];
  accessType?: string;
}

const UploadBackground = () => {
  const [formData, setFormData] = useState<
    Pick<PostBackground, "accessType" | "domainTags">
  >({
    accessType: AccessType.PUBLIC,
    domainTags: []
  });
  const [files, setFiles] = useState<
    { file: File; content: string; name: string }[]
  >([]);
  const { push } = useRouter();

  const onSelectTags = (val: string[]) =>
    setFormData({ ...formData, domainTags: val });

  const onSelectAccessType = (val: AccessType) =>
    setFormData({ ...formData, accessType: val });

  const readFile = async (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);

      reader.readAsDataURL(file);
    });
  };

  const uploadToBackend = async () => {
    const postObject: PostBackground = {
      ...formData,
      backgrounds: []
    };

    for (const file of files) {
      const result = await readFile(file.file);

      postObject.backgrounds.push({
        image: result,
        name: file.name
      });
    }

    api
      .postBackgrounds(postObject)
      .then(() => push("/background"))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="lg:h-3/4">
        <div className="lg:flex min-h-full max-h-full">
          <div className="lg:w-1/3 lg:pr-2 lg:pb-0 pb-2">
            <Card className="flex flex-col h-full">
              <InputLabel>Tags</InputLabel>
              <TagInput
                tags={formData.domainTags}
                setTags={onSelectTags}
                placeholder="Tags"
              />
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
            <AccessTypeInput
              accessType={formData.accessType || ""}
              className="mt-3"
              setAccessType={onSelectAccessType}
            />
          </div>
          <div className="border-l border-indigo-50"></div>
          <div className="flex-1 p-4">
            <InputLabel>Upload</InputLabel>
            <Button onClick={uploadToBackend} className="m-2">
              Upload
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UploadBackground;
