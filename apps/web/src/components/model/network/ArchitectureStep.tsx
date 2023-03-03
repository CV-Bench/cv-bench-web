import NetworkTableSingel from "@/components/NetworkTableSingle";
import Card from "@/components/Card";
import Description from "@/components/DescriptionComponent";

interface ArchitectureStepProps {
    networkArchitectureId: number,
    columns: { key: string, title: string }[],
    data: { [key: string]: any }[],
    onSelectNetworkArchitecture: (networkArchitectureId?: number) => void, 
  }

const ArchitectureStep = (props: ArchitectureStepProps) => {
    return (<>

        <div className="flex w-full h-full">
            <Card className="lg:w-1/2 h-full m-2">
                <Description
                    title="Architecture selection"
                    description="please select one architecture to train the data"
                    imageUrl="https://cdn-icons-png.flaticon.com/512/901/901366.png?w=1380&t=st=1677805938~exp=1677806538~hmac=b64d78bfad784e90d00907f2801947724b27baf985b5e9224bdda8e93522bac0"
                />
                <NetworkTableSingel
                    data={props.data}
                    columns={props.columns}
                    networkArchitectureId={props.networkArchitectureId}
                    onSelect={props.onSelectNetworkArchitecture}
                     />
            </Card>
            <Card className="lg:w-1/2 h-full m-2">
                DESC
            </Card>
        </div>
    </>)
}
export default ArchitectureStep