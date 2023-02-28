import Card from "@/components/Card"
import InputLabel from "@/components/inputs/InputLabel"
import TagInput from "@/components/inputs/TagInput"
import AccessTypeInput from "@/components/inputs/AccessTypeInput"
import InputField from "@/components/inputs/InputField"


const TrainStep = (props) => {
    console.log(props)

    return (<>
        TrainStep
        <div className="m-2">
            <Card className="flex flex-col h-full">
                <InputLabel>Tags</InputLabel>
                <TagInput
                    tags={props.tags}
                    setTags={props.onSelectTags}
                    placeholder="Tags"
                />
            </Card>
        </div>

        <div className="m-2">
            <Card className="flex p-0  ">
                <div className="flex-1 p-4">
                    <InputLabel>Name</InputLabel>
                    <input type="text" className="w-full block rounded-md bg-gray-700 border-none text-white placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-0 " />

                </div>
                <div className="border-l border-indigo-50"></div>
                <div className="flex-1 p-4">
                    <AccessTypeInput
                        accessType={props.accessType}
                        className="mt-3"
                        setAccessType={props.onSelectAccessType}
                    />
                </div>
            </Card>
        </div>




    </>)
}
export default TrainStep