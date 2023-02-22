import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import ModelPreview from "@/components/visualization/ModelPreview";

const ModelId = () => {

    return(<>
      <div className="h-full flex flex-col text-white">
        <div className="flex-1 flex">
          <Card className="mr-2 w-1/4 flex flex-col justify-around">
            <div>
              <InputLabel>3D Model</InputLabel>
              <Card className="bg-indigo-800">
                <ul>
                  <li>Model.Ply</li>
                </ul>
              </Card>
            </div>
            <div>
            <InputLabel>Materials & Textures</InputLabel>
              <Card className="bg-indigo-800">
                <ul>
                  <li>Model.Mtl</li>
                </ul>
              </Card>
            </div>
            <div>
              <InputLabel>Tags</InputLabel>
              <TagInput setTags={() => console.log("Set")} />
            </div>
          </Card>
          <Card className="flex-1 ml-2 w-3/4">
            <ModelPreview model="/big_dolph.ply" />
          </Card>
        </div>
        <Card className="mt-4 flex">
          <div className="flex-1 pr-4">
            <div>
              <InputLabel>Name</InputLabel>
              <InputField type="text" />
            </div>
            <AccessTypeInput className="mt-3" accessType="Public" setAccessType={() => null} />
          </div>
          <div className="border-l border-white -my-4"></div>
          <div className="flex-1 px-4">
            <InputLabel>Update</InputLabel>
            <Button>Update</Button>
          </div>
          <div className="border-l border-white -my-4"></div>
          <div className="flex-1 px-4">
            <InputLabel>Download</InputLabel>
            <Button>Download</Button>
          </div>
          <div className="border-l border-white -my-4"></div>
          <div className="flex-1 px-4">
            <InputLabel>Delete</InputLabel>
            <Button>Delete</Button>
          </div>
        </Card>
      </div>
    </>);
}

export default ModelId;