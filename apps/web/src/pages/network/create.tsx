import { Router, useRouter } from "next/router";
import { title } from "process";
import { useState } from "react";
import * as z from "zod";

import ArchitectureStep from "@/components/model/network/ArchitectureStep";
import DataStep from "@/components/model/network/DataStep";
import TrainStep from "@/components/model/network/TrainStep";
import FormStepsPanel, {
  FormStep
} from "@/components/multiform/FormStepsPanel";
import { useDatasetList } from "@/hooks/dataset";
import { api } from "@/network";

import { AccessType, PostNetwork } from "shared-types";

const CreateNetwork = () => {
  const [formData, setFormData] = useState<
    Pick<
      PostNetwork,
      | "accessType"
      | "domainTags"
      | "name"
      | "datasetId"
      | "networkArchitectureId"
    >
  >({
    accessType: AccessType.PUBLIC,
    domainTags: [],
    name: "",
    datasetId: null,
    networkArchitectureId: null
  });

  const onSetName = (val: string) => setFormData({ ...formData, name: val });

  const onSelectTags = (val: string[]) =>
    setFormData({ ...formData, domainTags: val });

  const onSelectAccessType = (val: AccessType) =>
    setFormData({ ...formData, accessType: val });

  const onSelectDataset = (id?: string) => {
    setFormData({ ...formData, datasetId: id });
  };

  const onSelectNetworkArchitecture = (id: string | undefined) => {
    setFormData({ ...formData, networkArchitectureId: id });
  };

  const { push } = useRouter();

  const handleUpload = () => {
    const postObject: PostNetwork = {
      ...formData
    };
  };


  const steps: FormStep[] = [
    {
      name: "Dataset",
      description: "tbd",
      component: (
        <DataStep
          item={formData.datasetId}
          selectedDatasetId={formData.datasetId}
          onSelectDatasetId={onSelectDataset}
        />
      ),
      validation: z.object({
        datasetId: z.string()
      })
    },
    {
      name: "Architecture",
      description: "tbd",
      component: (
        <ArchitectureStep
          selectedNetworkArchitectureId={formData.networkArchitectureId}
          onSelectNetworkArchitectureId={onSelectNetworkArchitecture}
        />
      ),
      validation: z.object({
        networkArchitectureId: z.string()
      })
    },
    {
      name: "Train",
      description: "tbd",
      component: (
        <TrainStep
          tags={formData.domainTags}
          onSelectTags={onSelectTags}
          accessType={formData.accessType}
          onSelectAccessType={onSelectAccessType}
          name={formData.name}
          onSetName={onSetName}
        />
      ),
      validation: z.object({
        name: z.string().min(1)
      })
    }
  ];
  return (
    <>
      <div className="">
        <FormStepsPanel
          submitButtonText="Start Training"
          formData={formData}
          steps={steps}
          handleSubmit={handleUpload}
        />
      </div>
    </>
  );
};
export default CreateNetwork;
