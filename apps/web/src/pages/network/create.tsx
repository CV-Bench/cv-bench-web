import FormStepsPanel, {FormStep} from "@/components/multiform/FormStepsPanel";
import * as z from "zod";
import TrainStep from "@/components/model/network/TrainStep";
import DataStep from "@/components/model/network/DataStep";
import ArchitectureStep from "@/components/model/network/ArchitectureStep";
import { useState } from 'react';
import { AccessType, PostNetwork } from "types";
import { title } from "process";
import { useDatasetList } from "@/hooks/dataset";
import { useArchtitucreList } from "@/hooks/archticture"; // not sure
import { api } from "@/network";
import { Router, useRouter } from "next/router";


const CreateNetwork = () => {
    const [formData, setFormData] = useState<
        Pick<PostNetwork, "accessType" | "domainTags" | "name" | "datasetId" | "networkArchitectureId">
    >({
        accessType: AccessType.PUBLIC,
        domainTags: [],
        name: "",
        datasetId: null, 
        networkArchitectureId: null
    });


    const onSetName = (val: string) =>
        setFormData({ ...formData, name: val });

    const onSelectTags = (val: string[]) =>
        setFormData({ ...formData, domainTags: val });

    const onSelectAccessType = (val: AccessType) =>
        setFormData({ ...formData, accessType: val });

    const onSelectDataset = (id: number | undefined) => {
        setFormData({ ...formData, datasetId: id });
    };

    const onSelectNetworkArchitecture = (id: number| undefined) => {
        setFormData({ ...formData, networkArchitectureId: id });
    };

    const { push } = useRouter();

    const handleUpload = () => {
        const postObject: PostNetwork = {
            ...formData
        };
    }

    const { data_data } = useDatasetList();
    const { arch_data } = useArchtitucreList();


    //const data_data = [{_id: 1, name: "TEst1", createdAt: "Test22", domainTags: ["11", "22", "33"], models: ["22", "22", 5]}, {_id: 2, name: "TEst2", createdAt: "Test2", domainTags: ["aa", "bb", "cc"], models: ["a", "b", 2]}, ];

    //const arch_data = [{_id: 1, name: "TEst1", createdAt: "Test22", requiredDatasetFormat: "COCO"}, {_id: 2, name: "TEst2", createdAt: "Test2", requiredDatasetFormat: "COCO"}, ];

    const data_columns = [
        { key: 'name', title: 'Name' },
        { key: 'createdAt', title: 'Creation Date' },
        { key: 'domainTags', title: 'Tags' },
        { key: 'models', title: "Models"}
    ];

    const arch_columns = [
        { key: 'name', title: 'Name' },
        { key: 'createdAt', title: 'Creation Date' },
        { key: 'requiredDatasetFormat', title: 'Data Format' },
    ];

  
    const steps: FormStep[] = [
        {
            name: "Dataset",
            description: "tbd",
            component: (
                <DataStep
                    item={formData.datasetId}
                    onSelectDataset={onSelectDataset}
                    columns={data_columns}
                    data={data_data}
                />
            ),
            validation: z.object({
                datasetId: z.number(),
            })
        },
        {
            name: "Architecture",
            description: "tbd",
            component: (
                <ArchitectureStep
                    item={formData.networkArchitectureId}
                    onSelectNetworkArchitecture={onSelectNetworkArchitecture}
                    columns={arch_columns}
                    data={arch_data}
                />
            ),
            validation: z.object({
                networkArchitectureId: z.number(),
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
                name: z.string().min(1),

            })
        }
    ];
    return (<>
        <div className="">
            <FormStepsPanel
                submitButtonText="Start Training"
                formData={formData}
                steps={steps}
                handleSubmit={handleUpload}
            />
        </div>
    </>)
}
export default CreateNetwork
