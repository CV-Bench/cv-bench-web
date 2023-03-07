/* eslint-disable @next/next/no-img-element */
import { CubeIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

import Card from "@/components/Card";
import MultiselectTable from "@/components/MultiselectTable";
import SelectionCardHeader from "@/components/SelectionCardHeader";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";
import ModelPreview from "@/components/visualization/ModelPreview";
import { useModel, useModelList } from "@/hooks/model";
import { formatToDateString } from "@/utils/date";

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

  if (!models) {
    return null;
  }

  return (
    <>
      <div className="flex items-start text-white space-x-4">
        <Card className="w-1/2">
          <SelectionCardHeader
            title="Select Model"
            description="tbd"
            linkHref="/model/upload"
            linkText="Upload new Model"
            icon={<CubeIcon className="w-full h-full" />}
          />

          <MultiselectTable
            data={models.map(({ name, createdAt, domainTags, ...rest }) => ({
              name,
              createdAtFormat: formatToDateString(createdAt),
              domainTagsConcat: domainTags.join(", ").slice(0, 10),
              createdAt,
              domainTags,
              ...rest
            }))}
            header={[
              {
                key: "name",
                title: "Name"
              },
              {
                key: "domainTagsConcat",
                title: "Tags"
              },
              {
                key: "createdAtFormat",
                title: "Created At"
              }
            ]}
            selectedItems={selectedModels}
            onSelectItems={(val) => onSelectModels(val as GetModelList)}
          />
        </Card>
        <Card className="w-1/2 flex justify-center items-center h-96 p-2">
          {previewModel ? (
            <img
              className="object-cover h-full"
              src={previewModel.previewImage}
              alt={previewModel.name}
            />
          ) : (
            <div className="text-slate-400 text-sm">
              Select a model to see the preview.
            </div>
          )}
        </Card>
      </div>
    </>
  );
};
export default ModelSelectStep;
