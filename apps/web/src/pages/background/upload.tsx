import { useRouter } from "next/router";
import { useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { addToast } from "@/components/Toast";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import ImageDragAndDrop from "@/components/inputs/ImageDragAndDrop";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ToolGeneralSettings from "@/components/inputs/ToolGeneralSettings";
import { api } from "@/network";

import { AccessType, NotificationType, PostBackground } from "shared-types";

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
  const [uploadDisabled, setUploadDisabled] = useState(false);

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

    addToast(
      "Upload Started!",
      "This can take a while, please be patient.",
      NotificationType.INFO
    );

    setUploadDisabled(true);

    api
      .postBackgrounds(postObject)
      .then(() => {
        addToast(
          "Upload were Successful!",
          "One or more backgrounds were uploaded successfully.",
          NotificationType.SUCCESS
        );
        push("/background");
      })
      .catch((e) => {
        addToast(
          "Upload Failed!",
          "Something went wrong while uploading one or more backgrounds.",
          NotificationType.ERROR
        );
        setUploadDisabled(false);
      });
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
        uploadDisabled={formData.domainTags.length <= 0 || uploadDisabled}
        handleChange={handleChange}
        uploadButtonText="Update"
        uploadTitleText="Update"
        handleUpload={handleUpdate}
      />
    </div>
  );
};

export default UploadBackground;
