import { AccessType } from "shared-types";

import Button from "../Button";
import Card from "../Card";

import AccessTypeInput from "./AccessTypeInput";
import DividedInput from "./DividedInput";
import RadioGroupSelection from "./RadioGroupSelection";

interface ToolGeneralSettingsProps {
  handleChange: (key: "name" | "accessType", data: string | AccessType) => void;
  accessType: AccessType;
  name: string;
  showName?: boolean;
  handleUpload: () => void;
  uploadDisabled?: boolean;
  uploadButtonText?: string;
  uploadTitleText?: string;
  showDownload?: boolean;
  handleDownload?: () => void;
  showDelete?: boolean;
  handleDelete?: () => void;
}

const ToolGeneralSettings: React.FC<ToolGeneralSettingsProps> = ({
  handleChange,
  accessType,
  name,
  showName = true,
  handleUpload,
  uploadDisabled = false,
  uploadButtonText = "Upload Data",
  uploadTitleText = "Upload",
  showDownload = false,
  handleDownload,
  showDelete = false,
  handleDelete
}) => {
  const getGridParams = () => {
    if (!showDownload && !showDelete) {
      return ["grid-cols-2", ""];
    }

    if (showDownload && showDelete) {
      return ["grid-cols-6", "col-span-3"];
    }

    return ["grid-cols-4", "col-span-2"];
  };

  const [gridCols, colSpan] = getGridParams();

  return (
    <Card
      className={`grid divide-x divide-gray-600 p-4 text-slate-300 ${gridCols}`}
    >
      <div className={`pr-4 ${colSpan}`}>
        <div className="divide-y divide-gray-600">
          <p className="pb-4">General Settings</p>

          <div className="pt-4 space-y-2">
            {showName && (
              <DividedInput
                title="Name"
                value={name}
                placeholder="Name"
                id="name"
                subtitle=">= 5"
                type="text"
                onChange={(value) => handleChange("name", value)}
                isValid={(name) => name != null && String(name).length >= 5}
              />
            )}

            <AccessTypeInput
              className="mt-3"
              accessType={accessType}
              setAccessType={(val) => handleChange("accessType", val)}
            />
          </div>
        </div>
      </div>
      <div
        className={`divide-y divide-gray-600 ${showDownload ? "px-4" : "pl-4"}`}
      >
        <p className="pb-4">{uploadTitleText}</p>

        <div className="pt-4">
          <Button onClick={handleUpload} disabled={uploadDisabled}>
            {uploadButtonText}
          </Button>
        </div>
      </div>
      {showDownload && (
        <div
          className={`${showDelete ? "px-4" : "pl-4"} divide-y divide-gray-600`}
        >
          <p className="pb-4">Download</p>

          <div className="pt-4">
            <Button onClick={handleDownload}>Download</Button>
          </div>
        </div>
      )}
      {showDelete && (
        <div className="pl-4 divide-y divide-gray-600">
          <p className="pb-4">Delete</p>

          <div className="pt-4">
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ToolGeneralSettings;
