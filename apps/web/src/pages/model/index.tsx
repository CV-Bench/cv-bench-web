import { CubeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";
import { useModelList } from "@/hooks/model";
import { formatToDateString } from "@/utils/date";

const ModelList = () => {
  const { data: models } = useModelList();

  const header = [
    {
      key: "name",
      title: "Name"
    },
    {
      key: "createdAt",
      title: "Created At"
    },
    {
      key: "domainTags",
      title: "Tags"
    }
  ];

  if (!models) {
    return null;
  }

  return (
    <div className="h-full flex flex-col text-white container mx-auto py-8">
      <Card>
        <TableHeader
          title="Models"
          description="Models description"
          icon={<CubeIcon />}
        >
          <Link href="/model/upload">
            <Button>Upload new Model</Button>
          </Link>
        </TableHeader>

        <Table
          data={models.map(({ createdAt, name, _id, domainTags }) => ({
            name,
            createdAt: formatToDateString(createdAt),
            domainTags: domainTags.join(", ").slice(0, 20),
            href: `/model/${_id}`
          }))}
          header={header}
        />
      </Card>
    </div>
  );
};

export default ModelList;
