import FormStepsPanel, {
    FormStep
} from "@/components/multiform/FormStepsPanel";
import * as z from "zod";
import TrainStep from "@/components/model/network/TrainStep";
import DataStep from "@/components/model/network/DataStep";
import { useState } from 'react';
import { AccessType, PostNetwork } from "types";


const CreateNetwork = () => {
    const [formData, setFormData] = useState<
        Pick<PostNetwork, "accessType" | "domainTags">
    >({
        accessType: AccessType.PUBLIC,
        domainTags: [],
    });

    const onSelectTags = (val: string[]) =>
        setFormData({ ...formData, domainTags: val });

    const onSelectAccessType = (val: AccessType) =>
        setFormData({ ...formData, accessType: val });


    const [selectedRows, setSelectedRows] = useState([]);


    const check = () => {
        console.log(formData)

    }

    const handleUpload = () => {
        console.log("UPLOAD")
    }

    const data = [
        { id: 1, name: 'A', age: 25, jj: 12 },
        { id: 2, name: 'B', age: 30, k: 14 },
        { id: 3, name: 'C', age: 35, ee: 12 },
    ];

    const columns = [
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
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    columns={columns}
                    data={data}
                />
            ),
            validation: z.object({
                selectedRows: z.array(z.number()).min(1),
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

                />
            ),
            validation: z.object({})
        }
    ];
    return (<>
        <div className="">
            <button onClick={check}>
                CHECK
            </button>
            <FormStepsPanel
                submitButtonText="Start Training"
                formData={{ selectedRows }}
                steps={steps}
                handleSubmit={handleUpload}
            />
        </div>
    </>)
}
export default CreateNetwork
