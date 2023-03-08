/* eslint-disable @next/next/no-img-element */
import { useBackgroundList } from "@/hooks/background";
import { useModelList } from "@/hooks/model";

import { DatasetDb } from "shared-types";

import Collapsible from "../Collapsible";
import ImageCard from "../ImageCard";
import InputField from "../inputs/InputField";
import InputLabel from "../inputs/InputLabel";
import TagInput from "../inputs/TagInput";

export interface DatasetTaskInfoProps
  extends Pick<
    DatasetDb,
    "modelIds" | "distractorIds" | "domainTags" | "backgroundIds"
  > {
  showTags?: boolean;
}

const DatasetTaskInfo: React.FC<DatasetTaskInfoProps> = ({
  modelIds,
  distractorIds,
  domainTags,
  backgroundIds,
  showTags = true
}) => {
  const { data: backgrounds } = useBackgroundList(undefined, backgroundIds);
  const { data: models } = useModelList(modelIds);
  const { data: distractors } = useModelList(distractorIds);

  return (
    <>
      <Collapsible title={`Models (${modelIds.length})`} className="text-sm">
        <div className="grid grid-cols-4">
          {models?.map((model) => (
            <ImageCard
              key={model._id}
              {...model}
              href={`/model/${model._id}`}
            />
          ))}
        </div>
      </Collapsible>
      <Collapsible
        title={`Distractors (${distractorIds.length})`}
        className="text-sm"
      >
        <div className="grid grid-cols-6">
          {distractors?.map((model) => (
            <ImageCard
              key={model._id}
              {...model}
              href={`/model/${model._id}`}
              name={undefined}
            />
          ))}
        </div>
      </Collapsible>
      <Collapsible
        title={`Backgrounds (${backgroundIds.length})`}
        className="text-sm"
      >
        <div className="grid grid-cols-6 gap-4">
          {backgrounds?.map((bg) => (
            <ImageCard
              key={bg._id}
              {...bg}
              href={`/background/${bg._id}`}
              name={undefined}
            />
          ))}
        </div>
      </Collapsible>
      {showTags && (
        <div>
          <InputLabel>Tags</InputLabel>
          <TagInput disabled={true} tags={domainTags} />
        </div>
      )}
    </>
  );
};

export default DatasetTaskInfo;
