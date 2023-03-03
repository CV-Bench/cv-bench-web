import React from "react";

import MultiselectTable from "@/components/MultiselectTable";
import Table, { TableHeader, TableItem } from "@/components/Table";
import ModelPreview from "@/components/visualization/ModelPreview";
import { useModel, useModelList } from "@/hooks/model";

import { DataUrlFile, GetModelList } from "shared-types";

export interface ModelSelectStepProps {
  selectedModels: GetModelList;
  onSelectModels: (val: GetModelList) => void;
}

const ModelSelectStep: React.FC<ModelSelectStepProps> = ({
  selectedModels,
  onSelectModels
}) => {
  const { data: models } = useModelList();
  const previewModel =
    selectedModels.length > 0
      ? selectedModels[selectedModels.length - 1]
      : null;

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
        <MultiselectTable
          className="w-1/2"
          data={data}
          header={header}
          selectedItems={selectedModels}
          onSelectItems={(val) => onSelectModels(val as GetModelList)}
        />
        <div className="w-1/2 flex justify-center items-center">
          {previewModel && <img src={previewModel.previewImage} />}
        </div>
      </div>
    </>
  );
};
export default ModelSelectStep;
