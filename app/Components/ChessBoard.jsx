"use client"
import React, { useState } from 'react';
import Square from './Square';
import ColumnNameRow from './ColumnNameRow';
import initialPositions from '@/public/Data/initialPosition';
import * as handle from '@/utils/functions/handleFunctions';
import './styles/chessBoard.css';
import RowNumberColumn from './RowNumberColumn';
import ChessTimer from './ChessTimer';

const Chessboard = () => {
  const isEven = (n) => n % 2 === 0;

  const [highlightedSquareId, setHighlightedSquareId] = useState([]);
  const [markSquareIds, setMarkSquareIds] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [squares, setSquares] = useState(initialPositions);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [currentPlayer , setCurrentPlayer] = useState("white");

  
  const columnNames = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const rowNumbers = [8, 7, 6, 5, 4, 3, 2, 1];

  const handleDragStart = (e, current_position) => {
    setDraggedPiece(current_position);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetSquareId) => {
    e.preventDefault();
    if (draggedPiece && markSquareIds.includes(targetSquareId) && (!squares[targetSquareId] || squares[targetSquareId].color !== currentPlayer)) {
      const newSquares = { ...squares };
      newSquares[targetSquareId] = squares[draggedPiece];
      newSquares[draggedPiece] = null;
      setSquares(newSquares);
      setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
      setDraggedPiece(null);
      setHighlightedSquareId([draggedPiece,targetSquareId])
      setMarkSquareIds([])
      setLastMove(draggedPiece + targetSquareId);
    }
  };

  const handleHighlight = (e, square_id) => {
    if (typeof squares[square_id] === "string") {
      let player = squares[square_id].split("").slice(0,5).join("")
      console.log(player)
      if (squares[square_id] && player === currentPlayer) {
        handle.handleHighlight(e, square_id, setHighlightedSquareId, setMarkSquareIds, lastMove,squares);
      } else {
        setHighlightedSquareId([]);
        setMarkSquareIds([]);
      }
    }
  };
  

  return (
    <>
    <ChessTimer></ChessTimer>
    <div className="chessBoard">
      <ColumnNameRow />
      <div className="board">
        <RowNumberColumn />
        {columnNames.map((columnName, columnIndex) => (
          <div key={columnName} className="squareColumn">
            {rowNumbers.map((rowNumber) => {
              const square_id = columnName + rowNumber;
              const piece = squares[square_id];
              const squareIsEven = isEven(rowNumber);
              const columnIsEven = isEven(columnIndex + 1);

              const color = (columnIsEven && squareIsEven) || (!columnIsEven && !squareIsEven) ? 'dark' : 'light';

              return (
                <Square
                  key={square_id}
                  square_id={square_id}
                  marked={markSquareIds.includes(square_id)}
                  piece={piece}
                  color={color}
                  isHighlighted={highlightedSquareId.includes(square_id)}
                  onMouseDown={(piece)? (e) => handleHighlight(e, square_id) : ()=>{ setHighlightedSquareId([]) ,  setMarkSquareIds([])}}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragStart={handleDragStart}
                />
              );
            })}
          </div>
        ))}
        <RowNumberColumn />
      </div>
      <ColumnNameRow />
    </div>
    </>
  );
};


export default Chessboard;
