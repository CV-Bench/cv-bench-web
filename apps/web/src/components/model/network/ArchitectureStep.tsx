import Card from "@/components/Card";
import Description from "@/components/DescriptionComponent";
import MultiselectTable from "@/components/MultiselectTable";
import { TableItem } from "@/components/Table";
import { useNetworkArchitectureList } from "@/hooks/network";

interface ArchitectureStepProps {
  selectedNetworkArchitectureId: string;
  onSelectNetworkArchitectureId: (networkArchitectureId?: string) => void;
}

const ArchitectureStep = (props: ArchitectureStepProps) => {
  const { data: arch_data } = useNetworkArchitectureList();

  const arch_columns = [
    { key: "name", title: "Name" },
    { key: "createdAt", title: "Creation Date" },
    { key: "requiredDatasetFormat", title: "Data Format" }
  ];

  const selectedDatasets = arch_data?.filter(
    (x) => x._id == props.selectedNetworkArchitectureId
  ) ?? [];
  const onSelectDataset = (val: TableItem[]) =>
    props.onSelectNetworkArchitectureId(val[0]?._id);

  return (
    <>
      <div className="flex w-full h-full">
        <Card className="lg:w-full h-full m-2">
          <Description
            title="Architecture selection"
            description="please select one architecture to train the data"
            imageUrl="https://cdn-icons-png.flaticon.com/512/901/901366.png?w=1380&t=st=1677805938~exp=1677806538~hmac=b64d78bfad784e90d00907f2801947724b27baf985b5e9224bdda8e93522bac0"
          />
          <MultiselectTable
            selectCount={1}
            selectedItems={selectedDatasets}
            onSelectItems={onSelectDataset}
            data={arch_data ?? []}
            header={arch_columns}
          />
        </Card>
      </div>
    </>
  );
};
export default ArchitectureStep;
