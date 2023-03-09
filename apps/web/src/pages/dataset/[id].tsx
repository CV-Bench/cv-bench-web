import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Card from "@/components/Card";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ToolGeneralSettings from "@/components/inputs/ToolGeneralSettings";
import DatasetPreviewImages from "@/components/task/DatasetPreviewImages";
import DatasetTaskInfo from "@/components/task/DatasetTaskInfo";
import TaskGeneralInfos from "@/components/task/TaskGeneralInfos";
import { useDataset } from "@/hooks/dataset";
import { api } from "@/network";

import { AccessType, GetDataset } from "shared-types";

const DatasetId = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: apiDataset } = useDataset(id?.toString() ?? "");
  const [dataset, setDataset] = useState<GetDataset>();

  useEffect(() => {
    if (apiDataset) {
      setDataset(apiDataset);
    }
  }, [apiDataset]);

  if (!dataset) {
    return <></>;
  }

  const handleChange = (
    key: "domainTags" | "name" | "accessType",
    value: string[] | string | AccessType
  ) => setDataset({ ...dataset, [key]: value });

  const handleDelete = async () => {
    await api.deleteDataset(dataset._id);
    router.push("/dataset");
  };

  const handleUpdate = async () => {
    await api.patchDataset(dataset._id, {
      name: dataset.name,
      description: dataset.description,
      domainTags: dataset.domainTags,
      accessType: dataset.accessType
    });
    router.push("/dataset");
  };

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="grid grid-cols-4 gap-4">
        <TaskGeneralInfos
          name={dataset.name}
          accessType={dataset.accessType}
          createdAt={dataset.createdAt}
          updatedAt={dataset.updatedAt}
        />
        <Card className="p-4 divide-y divide-slate-600 col-span-3">
          <p className="text-slate-200 pb-4">Specific Infos</p>
          <div className="py-4">
            <DatasetTaskInfo {...dataset} showTags={false} />
          </div>
        </Card>
      </div>
      <DatasetPreviewImages taskId={dataset._id} />
      <Card className="p-4 justify-around">
        <div>
          <InputLabel>Tags</InputLabel>
          <TagInput
            tags={dataset.domainTags}
            setTags={(newTags) => handleChange("domainTags", newTags)}
          />
        </div>
      </Card>
      <ToolGeneralSettings
        name={dataset.name}
        accessType={dataset.accessType}
        handleChange={handleChange}
        uploadButtonText="Update"
        handleUpload={handleUpdate}
        // showDownload
        // handleDownload={}

        showDelete
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default DatasetId;
