/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ToolGeneralSettings from "@/components/inputs/ToolGeneralSettings";
import { useBackground } from "@/hooks/background";
import { api } from "@/network";

import { AccessType, PatchBackground } from "shared-types";

const BackgroundId: React.FC = () => {
  const { query, push } = useRouter();
  const { id } = query as { [key: string]: string };

  const { data: background } = useBackground(id || "");

  const {
    name,
    domainTags = [],
    accessType = AccessType.PRIVATE,
    previewImage
  } = background || {};

  const [formData, setFormData] = useState<PatchBackground>({
    accessType,
    domainTags
  });

  const handleChangeData = (
    key: keyof PatchBackground,
    val: string | string[] | AccessType
  ) => setFormData({ ...formData, [key]: val });

  if (!background) {
    return null;
  }

  const handleUpdate = () => {
    api
      .patchBackground(id, formData)
      .then(() => {})
      .catch((e) => console.error(e));
  };

  const handleDownload = () => {
    if (!previewImage || !name) {
      return;
    }

    var a = document.createElement("a");
    a.href = previewImage;
    a.download = name;
    a.click();
  };

  const handleDelete = () => {
    api
      .deleteBackground(id)
      .then(() => push("/background"))
      .catch((e) => console.error(e));
  };

  return (
    <div className="container mx-auto py-8 space-y-4">
      <div className="lg:flex min-h-full max-h-full">
        <div className="lg:w-1/3 lg:pr-2 lg:pb-0 pb-2">
          <Card className="flex flex-col h-full p-4">
            <InputLabel>Tags</InputLabel>
            <TagInput
              tags={domainTags}
              setTags={(newTags: string[]) =>
                handleChangeData("domainTags", newTags)
              }
              placeholder="Tags"
            />
          </Card>
        </div>
        <div className="lg:w-2/3 lg:pl-2 lg:pt-0 pt-2 min-h-full overflow-auto ">
          <Card className="lg:max-h-full h-full">
            <div className="h-full w-full flex justify-center items-center">
              <img className="object-content " src={previewImage} alt={name} />
            </div>
          </Card>
        </div>
      </div>

      <ToolGeneralSettings
        accessType={formData.accessType}
        showName={false}
        handleChange={(_, value: string | AccessType) =>
          handleChangeData("accessType", value)
        }
        name=""
        handleUpload={handleUpdate}
        uploadButtonText="Update"
        showDelete
        handleDelete={handleDelete}
        showDownload
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default BackgroundId;
