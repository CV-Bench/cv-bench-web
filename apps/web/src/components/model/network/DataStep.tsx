import Card from "@/components/Card";
import Description from "@/components/DescriptionComponent";
import MultiselectTable from "@/components/MultiselectTable";
import { TableItem } from "@/components/Table";
import { useDatasetList } from "@/hooks/dataset";

interface DataStepProps {
  item: number;

  selectedDatasetId: string;
  onSelectDatasetId: (datasetId?: string) => void;
}

const DataStep = (props: DataStepProps) => {
  const { data: data_data } = useDatasetList();

  const data_columns = [
    { key: "name", title: "Name" },
    { key: "createdAt", title: "Creation Date" },
    { key: "domainTags", title: "Tags" },
    { key: "models", title: "Models" }
  ];

  const selectedDatasets = data_data?.filter(
    (x) => x._id == props.selectedDatasetId
  ) ?? [];
  const onSelectDataset = (val: TableItem[]) =>
    props.onSelectDatasetId(val[0]?._id);

  return (
    <>
      <div className="flex w-full h-full">
        <Card className="lg:w-full h-full m-2">
          <Description
            title="Dataset selection"
            description="please select one or more data sets to train on them"
            imageUrl="https://cdn-icons-png.flaticon.com/512/250/250235.png?w=1380&t=st=1677803698~exp=1677804298~hmac=71898ce48517582048decfbbc3b05c4c80ad3e59d513bbccea4a922801f3eb0e"
          />
          <MultiselectTable
            selectCount={1}
            selectedItems={selectedDatasets}
            onSelectItems={onSelectDataset}
            data={data_data ?? []}
            header={data_columns}
          />
        </Card>
      </div>
    </>
  );
};
export default DataStep;
