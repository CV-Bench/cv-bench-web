import NetworkTable from "@/components/NetworkTable";
import Card from "@/components/Card";

const DataStep = (props) => {
    return (<>
        <div className="flex w-full h-full">
            <Card className="lg:w-1/2 h-full m-2">
                <NetworkTable
                    data={props.data}
                    columns={props.columns}
                    selectedRows={props.selectedRows}
                    setSelectedRows={props.setSelectedRows} />
            </Card>
            <Card className="lg:w-1/2 h-full m-2">
                DESC
            </Card>
        </div>
    </>)
}
export default DataStep