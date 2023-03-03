import { GetTask, TaskDatasetInfo } from "shared-types";
import InputField from "../inputs/InputField";
import InputLabel from "../inputs/InputLabel";
import TagInput from "../inputs/TagInput";

export interface DatasetTaskInfoProps {
    task: GetTask;
}

const DatasetTaskInfo: React.FC<DatasetTaskInfoProps> = ({ task }) => {
    const info = task.info as TaskDatasetInfo;
    return (
    <div className="pl-3">  
        <div>
            <InputLabel>Name</InputLabel>
            <InputField type="text" readOnly value={info.name} />
        </div>
        <div>
            <InputLabel>Access Type</InputLabel>
            <InputField type="text" readOnly value={info.accessType} />
        </div>
        <div>
            <InputLabel>Model IDs ({info.modelIds.length})</InputLabel>
            <InputField type="text" readOnly value={info.modelIds.join(', ')} />
        </div>
        <div>
            <InputLabel>Distractor IDs ({info.distractorIds.length})</InputLabel>
            <InputField type="text" readOnly value={info.distractorIds.join(', ')} />
        </div>
        <div>
            <InputLabel>Background IDs ({info.backgrounds.length})</InputLabel>
            <InputField type="text" readOnly value={info.backgrounds.join(', ')} />
        </div>
        <div>
            <InputLabel>Tags</InputLabel>
            <TagInput disabled={true} tags={info.domainTags} />
        </div>
    </div>
    )
};

export default DatasetTaskInfo;