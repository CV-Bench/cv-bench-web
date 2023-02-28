function NetworkTable(props) {

  const handleRowClick = (id) => {
    const index = props.selectedRows.indexOf(id);    
    if (index === -1) {
        props.setSelectedRows([...props.selectedRows, id]);
    } else {
        props.setSelectedRows(props.selectedRows.filter((rowId) => rowId !== id));
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
            className={props.selectedRows.includes(row.id) ? 'bg-slate-700' : ''}
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

export default NetworkTable;
