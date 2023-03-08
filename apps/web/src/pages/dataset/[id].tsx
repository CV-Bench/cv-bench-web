import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import DownloadButton from "@/components/DownloadButton";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import { useDataset, useDatasetPreviews } from "@/hooks/dataset";
import { api } from "@/network";

import { AccessType, DataType, GetDataset } from "shared-types";

const DatasetId = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: apiModel } = useDataset(id?.toString() ?? "");
  const { data: previewImages } = useDatasetPreviews(id || "");
  const [dataset, setDataset] = useState<GetDataset>();

  useEffect(() => {
    if (apiModel) {
      setDataset(apiModel);
    }
  }, [apiModel]);

  if (!dataset) {
    return <></>;
  }

  const setTags = (val: string[]) =>
    setDataset({ ...dataset, domainTags: val });
  const setName = (val: string) => setDataset({ ...dataset, name: val });
  const setAccessType = (val: AccessType) =>
    setDataset({ ...dataset, accessType: val });

  const deleteDataset = async () => {
    await api.deleteDataset(dataset._id);
    router.push("/dataset");
  };

  const updateDataset = async () => {
    await api.patchDataset(dataset._id, {
      name: dataset.name,
      description: dataset.description,
      domainTags: dataset.domainTags,
      accessType: dataset.accessType
    });
    router.push("/dataset");
  };

  return (
    <>
      <div className="h-full flex flex-col text-white container mx-auto">
        <div className="flex-1 flex">
          <Card className="mr-2 w-1/4 flex flex-col justify-around">
            <div>
              <InputLabel>Tags</InputLabel>
              <TagInput tags={dataset.domainTags} setTags={setTags} />
            </div>
          </Card>
          <Card className="flex-1 ml-2 w-3/4">
            {previewImages?.map((image) => (
              <img key={image._id} src={image.image} alt="Preview Image" />
            ))}
          </Card>
        </div>
        <Card className="mt-4 flex">
          <div className="flex-1 pr-4">
            <div>
              <InputLabel>Name</InputLabel>
              <InputField
                type="text"
                value={dataset.name}
                onChange={(ev) =>
                  setName((ev.target as HTMLInputElement).value)
                }
              />
            </div>
            <AccessTypeInput
              className="mt-3"
              accessType={dataset.accessType}
              setAccessType={setAccessType}
            />
          </div>
          <div className="border-l border-white -my-4"></div>
          <div className="flex-1 px-4">
            <InputLabel>Update</InputLabel>
            <Button onClick={updateDataset}>Update</Button>
          </div>
          <div className="border-l border-white -my-4"></div>
          <div className="flex-1 px-4">
            <InputLabel>Download</InputLabel>
            <DownloadButton
              dataType={DataType.DATASET}
              dataId={dataset._id}
              s3Key={dataset.s3Key}
            />
          </div>
          <div className="border-l border-white -my-4"></div>
          <div className="flex-1 px-4">
            <InputLabel>Delete</InputLabel>
            <Button onClick={deleteDataset}>Delete</Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default DatasetId;
