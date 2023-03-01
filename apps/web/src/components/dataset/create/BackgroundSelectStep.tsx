import BackgroundCard from "@/components/inputs/BackgroundCard";
import TagInput from "@/components/inputs/TagInput";
import MultiselectTable from "@/components/MultiselectTable";
import Table, { TableHeader, TableItem } from "@/components/Table";
import ModelPreview from "@/components/visualization/ModelPreview";
import { useBackgroundList } from "@/hooks/background";
import { useModel, useModelList } from "@/hooks/model";
import React, { useState } from "react"
import { DataUrlFile, GetBackgroundList, GetModelList } from "shared-types"


export interface BackgroundSelectStepProps {
  selectedBackgroundTags?: string[];
  onSelectBackgroundTags: (val: string[]) => void;
}

const BackgroundSelectStep: React.FC<BackgroundSelectStepProps> = ({ selectedBackgroundTags, onSelectBackgroundTags  }) => {

  const { data: backgrounds } = useBackgroundList(selectedBackgroundTags);

  return (
    <>
      <TagInput tags={selectedBackgroundTags} setTags={onSelectBackgroundTags} />
      <div className="grid lg:grid-cols-5 sm:grid-cols-1">
        {backgrounds && backgrounds.map((background) => (
          <BackgroundCard key={background._id} {...background} />
        ))}
      </div>

    </>
  )
}
export default BackgroundSelectStep
