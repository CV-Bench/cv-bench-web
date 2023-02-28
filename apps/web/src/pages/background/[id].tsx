/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import { useBackground } from "@/hooks/background";
import { api } from "@/network";

import { AccessType, PatchBackground } from "types";

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
    val: string[] | AccessType
  ) => setFormData({ ...formData, [key]: val });

  if (!background) {
    return null;
  }

  const handleUpdate = () => {
    console.log(id, formData);

    api
      .patchBackground(id, formData)
      .then(() => console.log("Worked"))
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
    <>
      <div className="lg:h-3/4">
        <div className="lg:flex min-h-full max-h-full">
          <div className="lg:w-1/3 lg:pr-2 lg:pb-0 pb-2">
            <Card className="flex flex-col h-full">
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
                <img
                  className="object-content "
                  src={previewImage}
                  alt={name}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="lg:h-1/4 pt-4">
        <Card className="flex p-0  ">
          <div className="flex-1 p-4">
            <AccessTypeInput
              className="mt-3"
              accessType={formData.accessType || ""}
              setAccessType={(val: AccessType) =>
                handleChangeData("accessType", val)
              }
            />
          </div>
          <div className="border-l border-indigo-50"></div>
          <div className="flex-1 p-4">
            <InputLabel>Update</InputLabel>
            <Button onClick={handleUpdate} className="m-2">
              Update
            </Button>
          </div>

          <div className="border-l border-indigo-50"></div>
          <div className="flex-1 p-4">
            <InputLabel>Download</InputLabel>
            <Button onClick={handleDownload} className="m-2">
              Download
            </Button>
          </div>

          <div className="border-l border-indigo-50"></div>
          <div className="flex-1 p-4">
            <InputLabel>Delete</InputLabel>
            <Button onClick={handleDelete} className="m-2">
              Delete
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BackgroundId;
