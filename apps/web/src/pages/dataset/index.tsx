import { CircleStackIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";
import { useDatasetList } from "@/hooks/dataset";
import { formatToDateString } from "@/utils/date";

const DatasetList = () => {
  const { data: datasets } = useDatasetList();

  if (!datasets) {
    return null;
  }

  const data =
    datasets?.map((dataset) => {
      return {
        ...dataset,
        domainTags: dataset.domainTags.join(", "),
        href: `/dataset/${dataset._id}`
      };
    }) ?? [];

  return (
    <div className="mx-auto container py-8">
      <Card>
        <TableHeader
          title="Create Dataset"
          description="An overview of the datasets"
          icon={<CircleStackIcon />}
        >
          <Link href="/dataset/create">
            <Button>Create new Dataset</Button>
          </Link>
        </TableHeader>
        <Table
          data={datasets.map(
            ({ name, _id, createdAt, domainTags, accessType }) => ({
              name,
              createdAt: formatToDateString(createdAt),
              accessType: <Badge variant={accessType} />,
              domainTags: domainTags.join(", ").slice(0, 20),
              href: `/dataset/${_id}`
            })
          )}
          header={[
            {
              key: "name",
              title: "Name"
            },
            {
              key: "createdAt",
              title: "Date of creation"
            },
            {
              key: "domainTags",
              title: "Tags"
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default DatasetList;
