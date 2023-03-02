import MultiselectTable from "@/components/MultiselectTable";
import Table, { TableHeader, TableItem } from "@/components/Table";
import ModelPreview from "@/components/visualization/ModelPreview";
import { useModel, useModelList } from "@/hooks/model";
import React from "react"
import { DataUrlFile, GetModelList } from "shared-types"


export interface ModelSelectStepProps {
  selectedModels: GetModelList;
  onSelectModels: (val: GetModelList) => void;
}

const ModelSelectStep: React.FC<ModelSelectStepProps> = ({ selectedModels, onSelectModels  }) => {
  const { data: models } = useModelList();
  const previewId = (selectedModels.length > 0) ? selectedModels[selectedModels.length - 1]._id : ''
  const { data: selectedModel } = useModel(previewId);

  const data: TableItem[] = models ?? [];
  const header: TableHeader[] = [
    {
      key: "name",
      title: "Name"
    },
    {
      key: "domainTags",
      title: "Tags"
    }
  ];

  return (
    <>
      <div className="flex-1 flex items-stretch text-white">
        <MultiselectTable className="w-1/2" data={data} header={header} selectedItems={selectedModels} onSelectItems={(val) => onSelectModels(val as GetModelList)} />
        <div className="w-1/2">
          <ModelPreview model={selectedModel?.modelObject} modelAssets={selectedModel?.modelAssets} />
        </div>
      </div>
    </>
  )
}
export default ModelSelectStep
