
interface NetworkTableSingelProps {
  columns: { key: string, title: string }[],
  data: { [key: string]: any }[],
  networkArchitectureId: number,
  onSelect: (networkArchitectureId?: number) => void, 
}
const NetworkTableSingel = (props: NetworkTableSingelProps) => {

  const handleRowClick = (id: number) => {    
      props.onSelect(id);
  };

  return (<>
    <table className='bg-slate-200	w-full '>
      <thead>
        <tr >
          {props.columns.map((column) => (
            <th className='border border-black bg-slate-400' key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row) => (
          <tr
            key={row.id}
            onClick={() => handleRowClick(row.id)}
            className={props.networkArchitectureId === row.id ? 'bg-slate-700' : ''}
          >
            {props.columns.map((column) => (
              <td className='border border-black' key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </>

  );
}

export default NetworkTableSingel;
