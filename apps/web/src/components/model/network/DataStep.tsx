import { CircleStackIcon } from "@heroicons/react/24/outline";

import Badge from "@/components/Badge";
import Card from "@/components/Card";
import SelectionCardHeader from "@/components/SelectionCardHeader";
import Table from "@/components/Table";
import { useDatasetList } from "@/hooks/dataset";
import { formatToDateString } from "@/utils/date";

interface DataStepProps {
  item: number;

  selectedDatasetId: string;
  onSelectDatasetId: (datasetId?: string) => void;
}

const DataStep = ({ selectedDatasetId, onSelectDatasetId }: DataStepProps) => {
  const { data: datasets } = useDatasetList();

  if (!datasets) {
    return null;
  }

  return (
    <Card>
      <SelectionCardHeader
        title="Select Dataset"
        description="tbd"
        linkHref="/dataset/create"
        linkText="Upload new Dataset"
        icon={<CircleStackIcon className="w-full h-full" />}
      />

      <Table
        emptyTableMessage="There are no datasets to select"
        data={datasets.map(
          ({ name, _id, createdAt, domainTags, accessType }) => ({
            name,
            createdAt: formatToDateString(createdAt),
            accessType: <Badge variant={accessType} />,
            domainTags: domainTags.join(", ").slice(0, 20),
            callback: () => onSelectDatasetId(_id),
            className: selectedDatasetId === _id ? "!bg-slate-600" : ""
          })
        )}
        header={[
          { key: "name", title: "Name" },
          { key: "createdAt", title: "Creation Date" },
          { key: "domainTags", title: "Tags" }
        ]}
      />
    </Card>
  );
};
export default DataStep;
