import FormStepsPanel, {
    FormStep
} from "@/components/multiform/FormStepsPanel";
import * as z from "zod";
import TrainStep from "@/components/model/network/TrainStep";
import DataStep from "@/components/model/network/DataStep";
import ArchitectureStep from "@/components/model/network/ArchitectureStep";
import { useState } from 'react';
import { AccessType, PostNetwork } from "types";


const CreateNetwork = () => {
    const [formData, setFormData] = useState<
        Pick<PostNetwork, "accessType" | "domainTags" | "name" | "datasetId" | "networkArchitectureId">
    >({
        accessType: AccessType.PUBLIC,
        domainTags: [],
        name: "",
        datasetId: []
    });


    const onSetName = (val: string) =>
        setFormData({ ...formData, name: val });

    const onSelectTags = (val: string[]) =>
        setFormData({ ...formData, domainTags: val });

    const onSelectAccessType = (val: AccessType) =>
        setFormData({ ...formData, accessType: val });

    const onSelectDataset = (id: number[] | undefined) => {
        setFormData({ ...formData, datasetId: id });
    };

    const onSelectNetworkArchitecture = (id: number| undefined) => {
        setFormData({ ...formData, networkArchitectureId: id });
    };

    const handleUpload = () => {
        console.log(formData)
    }

    const data_data = [
        { id: 1, name: 'A', age: 25, jj: 12 },
        { id: 2, name: 'B', age: 30, k: 14 },
        { id: 3, name: 'C', age: 35, ee: 12 },
    ];

    const columns_data = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Name' },
        { key: 'age', title: 'Age' }
    ];

    const data_arch = [
        { id: 1, name: 'A', age: 25, jj: 12 },
        { id: 2, name: 'B', age: 30, k: 14 },
        { id: 3, name: 'C', age: 35, ee: 12 },
    ];

    const columns_arch = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Name' },
        { key: 'age', title: 'Age' }
    ];
    const steps: FormStep[] = [
        {
            name: "Dataset",
            description: "tbd",
            component: (
                <DataStep
                    datasetId={formData.datasetId}
                    onSelectDataset={onSelectDataset}
                    columns={columns_data}
                    data={data_data}
                />
            ),
            validation: z.object({
                datasetId: z.array(z.number()).min(1),
            })
        },
        {
            name: "Architecture",
            description: "tbd",
            component: (
                <ArchitectureStep
                    networkArchitectureId={formData.networkArchitectureId}
                    onSelectNetworkArchitecture={onSelectNetworkArchitecture}
                    columns={columns_arch}
                    data={data_arch}
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
