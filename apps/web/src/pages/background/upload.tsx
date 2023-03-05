import { useRouter } from "next/router";
import { useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import ImageDragAndDrop from "@/components/inputs/ImageDragAndDrop";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ToolGeneralSettings from "@/components/inputs/ToolGeneralSettings";
import { api } from "@/network";

import { AccessType, PostBackground } from "shared-types";

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

  const readFile = async (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);

      reader.readAsDataURL(file);
    });
  };

  const handleChange = (
    key: "accessType" | "name",
    data: string | AccessType
  ) => setFormData({ ...formData, [key]: data });

  const handleUpdate = async () => {
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
    <div className="container mx-auto py-8 space-y-4">
      <div className="lg:flex">
        <div className="lg:w-1/3 lg:pr-2 lg:pb-0 pb-2">
          <Card className="flex flex-col h-full p-4 space-y-1">
            <InputLabel>Tags</InputLabel>
            <TagInput
              tags={formData.domainTags}
              setTags={onSelectTags}
              placeholder="Tags"
            />
          </Card>
        </div>
        <div className="lg:w-2/3 lg:pl-2 lg:pt-0 pt-2 min-h-full overflow-auto ">
          <Card className="p-4 h-full">
            <ImageDragAndDrop files={files} setFiles={setFiles} />
          </Card>
        </div>
      </div>

      <ToolGeneralSettings
        accessType={formData.accessType}
        showName={false}
        name=""
        uploadDisabled={formData.domainTags.length <= 0}
        handleChange={handleChange}
        uploadButtonText="Update"
        uploadTitleText="Update"
        handleUpload={handleUpdate}
      />
    </div>
  );
};

export default UploadBackground;
