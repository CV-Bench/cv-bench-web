/* eslint-disable @next/next/no-img-element */
import { useBackgroundList } from "@/hooks/background";
import { useModelList } from "@/hooks/model";

import { GetTask, TaskDatasetInfo } from "shared-types";

import Collapsible from "../Collapsible";
import ImageCard from "../ImageCard";
import InputField from "../inputs/InputField";
import InputLabel from "../inputs/InputLabel";
import TagInput from "../inputs/TagInput";

export interface DatasetTaskInfoProps {
  task: GetTask;
}

const DatasetTaskInfo: React.FC<DatasetTaskInfoProps> = ({ task }) => {
  const info = task.info as TaskDatasetInfo;

  const { data: backgrounds } = useBackgroundList(
    undefined,
    info.backgroundIds
  );
  const { data: models } = useModelList(info.modelIds);
  const { data: distractors } = useModelList(info.distractorIds);

  return (
    <>
      <div>
        <InputLabel>Access Type</InputLabel>
        <InputField type="text" readOnly value={info.accessType} />
      </div>
      <Collapsible title={`Models (${info.modelIds.length})`}>
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
      <Collapsible title={`Distractors (${info.distractorIds.length})`}>
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
      <Collapsible title={`Backgrounds (${info.backgroundIds.length})`}>
        <div className="grid grid-cols-6">
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
      <div>
        <InputLabel>Tags</InputLabel>
        <TagInput disabled={true} tags={info.domainTags} />
      </div>
    </>
  );
};

export default DatasetTaskInfo;
