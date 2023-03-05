import { useTaskList } from "@/hooks/task";

import Button from "../Button";
import Table from "../Table";

const DashboardTable = () => {
  const data = [
    { id: 1, name: "A", age: 25, jj: 12 },
    { id: 2, name: "B", age: 30, k: 14 },
    { id: 3, name: "C", age: 35, ee: 12 }
  ];
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "age", title: "Age" }
  ];

  const { data: tasks } = useTaskList();

  console.log("TASKS", tasks);

  return (
    // <Table />
    null
  );
};

export default DashboardTable;
