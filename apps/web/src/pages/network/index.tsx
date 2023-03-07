import { CircleStackIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";
import { useNetworkList } from "@/hooks/network";
import { formatToDateString } from "@/utils/date";

const NetworkList = () => {
  const { data: networks } = useNetworkList();

  if (!networks) {
    return null;
  }

  return (
    <div className="mx-auto container py-8">
      <Card>
        <TableHeader
          title="Create Network"
          description="An overview of the networks"
          icon={<CircleStackIcon />}
        >
          <Link href="/network/create">
            <Button>Create new Network</Button>
          </Link>
        </TableHeader>
        <Table
          data={networks.map(
            ({ name, _id, createdAt, domainTags, accessType }) => ({
              name,
              createdAt: formatToDateString(createdAt),
              accessType: <Badge variant={accessType} />,
              domainTags: domainTags.join(", ").slice(0, 20),
              href: `/network/${_id}`
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

export default NetworkList;
