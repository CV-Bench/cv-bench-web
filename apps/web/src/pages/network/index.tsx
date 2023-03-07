import Link from "next/link";
import Description from "@/components/DescriptionComponent";
import Table, { TableHeader, TableItem } from "@/components/Table";
import { useNetworkList } from "@/hooks/network";

const NetworkList = () => {
  const { data: networks } = useNetworkList();
  const data: TableItem[] =
    networks?.map((network) => {
      return {
        ...network,
        domainTags: network.domainTags.join(", "),
        href: `/network/${network._id}`
      };
    }) ?? [];
  const header: TableHeader[] = [
    {
      key: "name",
      title: "Name"
    },
    {
      key: "createdAt",
      title: "Date of creation"
    }, {
      key: "domainTags",
      title: "Tags"
    }
  ];
  return (
    <>
      <div className="bg-slate-800 p-4 flex rounded-lg text-white">
        <Link href="/network/create">Create Network</Link>
      </div>
      <Description
        title="Network"
        description="An overview of the networks"
        imageUrl="https://img.freepik.com/vektoren-kostenlos/platine-baum-symbol_98292-3922.jpg?w=1480&t=st=1678130088~exp=1678130688~hmac=7609be3686a372bab9a2ade15efa1a307197d21220c3bcf542f13cedc411e800"
      />
      <div className=" text-white">
        <Table data={data} header={header} />
      </div>

    </>
  );
};

export default NetworkList;
