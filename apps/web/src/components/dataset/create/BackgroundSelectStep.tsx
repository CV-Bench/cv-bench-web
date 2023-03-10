import React, { useEffect, useState } from "react";

import ImageCard from "@/components/ImageCard";
import MultiselectTable from "@/components/MultiselectTable";
import Table, { TableHeader, TableItem } from "@/components/Table";
import TagInput from "@/components/inputs/TagInput";
import ModelPreview from "@/components/visualization/ModelPreview";
import { useBackgroundList } from "@/hooks/background";
import { useModel, useModelList } from "@/hooks/model";

import { DataUrlFile, GetBackgroundList, GetModelList } from "shared-types";

export interface BackgroundSelectStepProps {
  selectedBackgroundTags: string[];
  onSelectBackgroundTags: (val: string[]) => void;

  selectedBackgrounds: GetBackgroundList;
  onSelectBackgrounds: (val: GetBackgroundList) => void;
}

const BackgroundSelectStep: React.FC<BackgroundSelectStepProps> = ({
  selectedBackgrounds,
  onSelectBackgrounds,
  selectedBackgroundTags,
  onSelectBackgroundTags
}) => {
  const { data: backgrounds } = useBackgroundList(selectedBackgroundTags);

  useEffect(() => {
    if (backgrounds) {
      onSelectBackgrounds(backgrounds);
    }
  }, [backgrounds]);

  return (
    <>
      <TagInput
        tags={selectedBackgroundTags}
        setTags={onSelectBackgroundTags}
      />
      <div className="grid lg:grid-cols-5 sm:grid-cols-1 gap-4">
        {backgrounds &&
          backgrounds.map((background) => (
            <ImageCard
              key={background._id}
              {...background}
              href=""
              name={undefined}
            />
          ))}
      </div>
    </>
  );
};
export default BackgroundSelectStep;
