import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import AccessTypeInput from "@/components/inputs/AccessTypeInput";
import InputField from "@/components/inputs/InputField";
import InputLabel from "@/components/inputs/InputLabel";
import TagInput from "@/components/inputs/TagInput";
import { api } from "@/network";

import { AccessType, DataUrlFile, GetNetwork } from "shared-types";
import { useNetwork } from "@/hooks/network";

const NetworkId = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: apiModel } = useNetwork(id?.toString() ?? "");
  const [network, setNetwork] = useState<GetNetwork>();

  useEffect(() => {
    if (apiModel) {
      setNetwork(apiModel);
    }
  }, [apiModel]);

  if (!network) {
    return <></>;
  }

  const setTags = (val: string[]) => setNetwork({ ...network, domainTags: val });
  const setName = (val: string) => setNetwork({ ...network, name: val });
  const setAccessType = (val: AccessType) =>
    setNetwork({ ...network, accessType: val });


  const downloadNetwork = () => {
    
  };

  const deleteNetwork = async () => {
    await api.deleteNetwork(network._id);
    router.push("/network");
  };

  const updateNetwork = async () => {
    await api.patchNetwork(network._id, {
      name: network.name,
      description: network.description,
      domainTags: network.domainTags,
      accessType: network.accessType
    });
    router.push("/network");
  };

  return (
    <>
      <div className="h-full flex flex-col text-white container mx-auto">
        <div className="flex-1 flex">
          <Card className="mr-2 w-1/4 flex flex-col justify-around">
            <div>
              <InputLabel>Tags</InputLabel>
              <TagInput tags={network.domainTags} setTags={setTags} />
            </div>
          </Card>
          <Card className="flex-1 ml-2 w-3/4">

          </Card>
        </div>
        <Card className="mt-4 flex">
          <div className="flex-1 pr-4">
            <div>
              <InputLabel>Name</InputLabel>
              <InputField
                type="text"
                value={network.name}
                onChange={(ev) =>
                  setName((ev.target as HTMLInputElement).value)
                }
              />
            </div>
            <AccessTypeInput
              className="mt-3"
              accessType={network.accessType}
              setAccessType={setAccessType}
            />
          </div>
          <div className="border-l border-white -my-4"></div>
          <div className="flex-1 px-4">
            <InputLabel>Update</InputLabel>
            <Button onClick={updateNetwork}>Update</Button>
          </div>
          <div className="border-l border-white -my-4"></div>
          <div className="flex-1 px-4">
            <InputLabel>Download</InputLabel>
            <Button onClick={downloadNetwork}>Download</Button>
          </div>
          <div className="border-l border-white -my-4"></div>
          <div className="flex-1 px-4">
            <InputLabel>Delete</InputLabel>
            <Button onClick={deleteNetwork}>Delete</Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default NetworkId;
