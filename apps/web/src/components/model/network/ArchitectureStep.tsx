import { HomeModernIcon } from "@heroicons/react/24/outline";

import Card from "@/components/Card";
import SelectionCardHeader from "@/components/SelectionCardHeader";
import Table from "@/components/Table";
import { useNetworkArchitectureList } from "@/hooks/network";

interface ArchitectureStepProps {
  selectedNetworkArchitectureId: string;
  onSelectNetworkArchitectureId: (networkArchitectureId?: string) => void;
}

const ArchitectureStep = ({
  onSelectNetworkArchitectureId,
  selectedNetworkArchitectureId
}: ArchitectureStepProps) => {
  const { data: networkArchitectures } = useNetworkArchitectureList();

  if (!networkArchitectures) {
    return null;
  }

  return (
    <Card>
      <SelectionCardHeader
        title="Select Network Architecture"
        description="tbd"
        icon={<HomeModernIcon className="w-full h-full" />}
      />

      <Table
        emptyTableMessage="There are no datasets to select"
        data={networkArchitectures.map(({ name, _id, description }) => ({
          name,
          description,
          callback: () => onSelectNetworkArchitectureId(_id),
          className:
            selectedNetworkArchitectureId === _id ? "!bg-slate-600" : ""
        }))}
        header={[
          { key: "name", title: "Name" },
          { key: "description", title: "Description" }
        ]}
      />
    </Card>
  );
};
export default ArchitectureStep;
