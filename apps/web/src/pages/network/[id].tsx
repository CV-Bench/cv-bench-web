import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ToolGeneralSettings from "@/components/inputs/ToolGeneralSettings";
import NetworkPreviewImages from "@/components/task/NetworkPreviewImages";
import NetworkTaskInfo from "@/components/task/NetworkTaskInfo";
import TaskGeneralInfos from "@/components/task/TaskGeneralInfos";
import { useNetwork } from "@/hooks/network";
import { api } from "@/network";

import { AccessType, DataUrlFile, GetNetwork } from "shared-types";

const NetworkId = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: apiModel } = useNetwork(id?.toString() ?? "");
  const [network, setNetwork] = useState<GetNetwork>();

  useEffect(() => {
    if (apiModel) {
      setNetwork(apiModel);
    }
  }, [apiModel]);

  if (!network) {
    return <></>;
  }

  const handleChange = (
    key: "domainTags" | "name" | "accessType",
    value: string[] | string | AccessType
  ) => setNetwork({ ...network, [key]: value });

  const downloadNetwork = () => {};

  const handleDelete = async () => {
    await api.deleteNetwork(network._id);
    router.push("/network");
  };

  const handleUpdate = async () => {
    await api.patchNetwork(network._id, {
      name: network.name,
      description: network.description,
      domainTags: network.domainTags,
      accessType: network.accessType
    });
  };

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="grid grid-cols-4 gap-4">
        <TaskGeneralInfos
          name={network.name}
          accessType={network.accessType}
          createdAt={network.createdAt}
          updatedAt={network.updatedAt}
        />
        <Card className="p-4 divide-y divide-slate-600 col-span-3">
          <p className="text-slate-200 pb-4">Specific Infos</p>
          <div className="py-4">
            <NetworkTaskInfo {...network} />
          </div>
        </Card>
      </div>

      <NetworkPreviewImages taskId={network._id} />

      <Card className="p-4 justify-around">
        <div>
          <InputLabel>Tags</InputLabel>
          <TagInput
            tags={network.domainTags}
            setTags={(newTags) => handleChange("domainTags", newTags)}
          />
        </div>
      </Card>

      <ToolGeneralSettings
        name={network.name}
        accessType={network.accessType}
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

export default NetworkId;
