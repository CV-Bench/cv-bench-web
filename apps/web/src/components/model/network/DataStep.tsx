import NetworkTableSingel from "@/components/NetworkTableSingle";
import Card from "@/components/Card";
import Description from "@/components/DescriptionComponent";

interface DataStepProps {
    item: number,
    columns: { key: string, title: string }[],
    data: { [key: string]: any }[],
    onSelectDataset: (datasetId?: number) => void,
}

const DataStep = (props: DataStepProps) => {
    return (<>

        <div className="flex w-full h-full">
            <Card className="lg:w-full h-full m-2">
                <Description
                    title="Dataset selection"
                    description="please select one or more data sets to train on them"
                    imageUrl="https://cdn-icons-png.flaticon.com/512/250/250235.png?w=1380&t=st=1677803698~exp=1677804298~hmac=71898ce48517582048decfbbc3b05c4c80ad3e59d513bbccea4a922801f3eb0e"
                />
                <NetworkTableSingel
                    data={props.data}
                    columns={props.columns}
                    item={props.item}
                    onSelect={props.onSelectDataset}
                />
            </Card>

        </div>
    </>)
}
export default DataStep