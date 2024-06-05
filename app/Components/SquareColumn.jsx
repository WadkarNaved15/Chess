"use client"

import React, { useState } from 'react';
import Square from './Square';
import initialPositions from '@/public/Data/initialPosition';
import './styles/SquareColumn.css';

const SquareColumn = ({ column_name }) => {
  const isEven = (n) => n % 2 === 0;
  

  const [highlightedSquareId, setHighlightedSquareId] = useState(null);

  const handleHighlight = (e,square_id) => {
    if(e.target.tagName.toLowerCase()==="img"){
      
    setHighlightedSquareId(square_id);
  }else{
    setHighlightedSquareId(null)
  }
  };

  const columnIsEven = isEven(column_name.charCodeAt(0) - 96);

  const squaresJSX = Array.from({ length: 8 }, (_, index) => {
    const row = 8 - index;
    const square_id = column_name + row;
    const piece = initialPositions[square_id];
    const squareIsEven = isEven(row);

    const color = (columnIsEven && squareIsEven) || (!columnIsEven && !squareIsEven) ? 'dark' : 'light';

    return (
      <Square
        key={square_id}
        square_id={square_id}
        piece={piece}
        color={color}
        isHighlighted={highlightedSquareId === square_id}
        onClick={(e) => handleHighlight(e,square_id)}
      />
    );
  });

  return <div className="squareColumn">{squaresJSX}</div>;
};

export default React.memo(SquareColumn);
