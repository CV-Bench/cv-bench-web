import Link from "next/link";
import Table, { TableHeader, TableItem } from "@/components/Table";
import { useDatasetList } from "@/hooks/dataset";

const DatasetList = () => {
  const { data: datasets } = useDatasetList();
  const data: TableItem[] =
    datasets?.map((dataset) => {
      return {
        ...dataset,
        domainTags: dataset.domainTags.join(", "),
        href: `/dataset/${dataset._id}`
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
        <Link href="/dataset/create">Create Dataset</Link>
      </div>
      <Description
        title="Dataset"
        description="An overview of the datasets"
        imageUrl="https://cdn-icons-png.flaticon.com/512/622/622343.png?w=1480&t=st=1678131040~exp=1678131640~hmac=4e17810b6e6fb21ef5444bf5c5e8469f4e6bd21e63f02b330407d69ddde3c160"
      />
      <div className=" text-white">
        <Table data={data} header={header} />
      </div>
    </>
  );
};

export default DatasetList;
