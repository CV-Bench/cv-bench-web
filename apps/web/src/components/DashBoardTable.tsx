import Button from "./Button";

const DashboardTable = () => {  
  const data = [
    { id: 1, name: 'A', age: 25, jj: 12 },
    { id: 2, name: 'B', age: 30, k: 14 },
    { id: 3, name: 'C', age: 35, ee: 12 },
];
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' }
];

  return (
    <div style={{ position: 'relative' }}>
      <table className='bg-slate-200 w-full'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th className='border border-black bg-slate-400' key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
            >
              {columns.map((column) => (
                <td className='border border-black' key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="">
      <Button
        style={{ position: 'absolute', bottom: '10px', right: '10px', margin: '10' }}
        onClick={() => console.log('Button clicked')}
      >
        Show all tasks
      </Button>
      </div>
      
    </div>
  );
};

export default DashboardTable;
