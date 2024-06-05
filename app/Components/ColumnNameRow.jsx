import "./styles/ColumnNameRow.css"


const ColumnNameRow = () => {
    const columnNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
    return (
      <div className="columnNameRow">
        {columnNames.map((column, index) => (
          <div key={index}>{column}</div>
        ))}
      </div>
    );
  };

  export default ColumnNameRow;