import { RemoveCircleOutlineRounded } from "@mui/icons-material";
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
  const [network, setNetwork] = useState<PostNetwork>({
    accessType: AccessType.PUBLIC,
    domainTags: [],
    name: "",
    datasetId: null,
    networkArchitectureId: null
  });
  const { push } = useRouter();

  const onSelectDataset = (id?: string) => {
    setNetwork({ ...network, datasetId: id });
  };

  const onSelectNetworkArchitecture = (id: string | undefined) => {
    setNetwork({ ...network, networkArchitectureId: id });
  };

  const handleChange = (
    key: "domainTags" | "name" | "accessType",
    value: string[] | string | AccessType
  ) => setNetwork({ ...network, [key]: value });

  const handleUpload = () => {
    api
      .postNetworks(network)
      .then((result) => push("/task/" + result._id))
      .catch((e) => console.error(e));
  };

  const steps: FormStep[] = [
    {
      name: "Dataset",
      description: "tbd",
      component: (
        <DataStep
          item={network.datasetId}
          selectedDatasetId={network.datasetId}
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
          selectedNetworkArchitectureId={network.networkArchitectureId}
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
          tags={network.domainTags}
          accessType={network.accessType}
          name={network.name}
          handleChange={handleChange}
          handleUpload={handleUpload}
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
          formData={network}
          steps={steps}
          handleSubmit={handleUpload}
        />
      </div>
    </>
  );
};
export default CreateNetwork;
