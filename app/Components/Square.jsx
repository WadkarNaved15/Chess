import React from 'react';
import Piece from './Piece';
import './styles/Square.css';

const Square = ({
  square_id,
  piece,
  color,
  onClick,
  marked,
  isHighlighted,
  onDragOver,
  onDrop,
  onDragStart,
  onMouseDown
}) => {
  return (
    <div
      className={`square ${isHighlighted ? (color === 'dark' ? 'dark-highlighted' : 'light-highlighted') : `${color}`} ${marked ? 'pointer' : ""}`}
      id={square_id}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, square_id)}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      {marked && <div className={`${piece ? 'circlemark' : 'marked'}`}></div>}
      {piece && <Piece piece_name={piece} current_position={square_id} onDragStart={onDragStart} />}
    </div>
  );
};

export default React.memo(Square);
