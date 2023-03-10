import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { addToast } from "@/components/Toast";
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

import { AccessType, GetNetwork, NotificationType } from "shared-types";

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

  const handleDelete = async () => {
    api
      .deleteDataset(network._id)
      .then(() => {
        addToast(
          "Network Deleted!",
          "Network was deleted successfully.",
          NotificationType.INFO
        );
        router.push("/network");
      })
      .catch((e) =>
        addToast(
          "Deletion Failed!",
          "Network could not be deleted.",
          NotificationType.ERROR
        )
      );
  };

  const handleUpdate = async () => {
    api
      .patchNetwork(network._id, {
        name: network.name,
        description: network.description,
        domainTags: network.domainTags,
        accessType: network.accessType
      })
      .then(() => {
        addToast(
          "Network Updated!",
          "Network was updated successfully.",
          NotificationType.SUCCESS
        );
      })
      .catch((e) =>
        addToast(
          "Update Failed!",
          "Network could not be updated.",
          NotificationType.ERROR
        )
      );
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
