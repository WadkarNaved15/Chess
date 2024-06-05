import "./styles/RowNumberColumn.css"

const RowNumberColumn = () => {
    const rowNumbers = Array.from({ length: 8 }, (_, index) => 8 - index);
  
    return (
      <div className="rowNumberColumn">
        {rowNumbers.map((row, index) => (
          <div key={index}>{row}</div>
        ))}
      </div>
    );
  };

  export default RowNumberColumn;