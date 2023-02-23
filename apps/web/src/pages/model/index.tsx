import Table, { TableHeader, TableItem } from "@/components/Table";
import { useModelList } from "@/hooks/model";

const ModelList = () => {
  // GET MODEL LIST WITH
  const { data: models } = useModelList();

  console.log("MODELS", models);
  const data: TableItem[] = [{ id: '0', name: 'TEST', href: '/model/1' }];
  const header: TableHeader[] = [
    {
      key: 'id',
      title: 'ID'
    },
    {
      key: 'name',
      title: 'Name'
    }
  ];


  return (
    <div className="h-full text-white">
      <Table data={data} header={header}/>
    </div>
  )
}

export default ModelList;
