
interface NetworkTableMultipleProps {
  columns: { key: string, title: string }[],
  data: { [key: string]: any }[],
  datasetId: number[],
  onSelect: (datasetId?: number[]) => void, 

}
const NetworkTableMultiple = (props: NetworkTableMultipleProps) => {

  const handleRowClick = (id: number) => {
      const index = props.datasetId.indexOf(id);
      if (index === -1) {
        props.onSelect([...props.datasetId, id]);
      } else {
        props.onSelect(props.datasetId.filter((rowId: number) => rowId !== id));
      }
  
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
            className={props.datasetId.includes(row.id) ? 'bg-slate-700' : ''}
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

export default NetworkTableMultiple;
