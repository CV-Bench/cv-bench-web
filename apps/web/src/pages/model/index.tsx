import Button from "@/components/Button";
import Card from "@/components/Card";
import Table, { TableHeader, TableItem } from "@/components/Table";
import { useModelList } from "@/hooks/model";
import Link from "next/link";

const ModelList = () => {
  const { data: models } = useModelList();
  const data: TableItem[] =
    models?.map((model) => {
      return {
        ...model,
        domainTags: model.domainTags.join(", "),
        href: `/model/${model._id}`
      };
    }) ?? [];
  const header: TableHeader[] = [
    {
      key: "_id",
      title: "ID"
    },
    {
      key: "name",
      title: "Name"
    },
    {
      key: "domainTags",
      title: "Tags"
    }
  ];

  return (
    <div className="h-full flex flex-col text-white container mx-auto">
      <Card className="flex justify-between items-center">
        <div>
          <h1 className=" text-3xl">Models</h1>
          <span>Models description</span>
        </div>
        <Link href="/model/upload">
          <Button>Upload</Button>
        </Link>
      </Card>

      <Table data={data} header={header} />
    </div>
  );
};

export default ModelList;
