
export function getMarkedArrayWPawn(originalArray, lastMove,squares) { 
  let resultArray;
  let firstArray = [...originalArray]; 
  firstArray[1] = (parseInt(originalArray[1], 10) + 1).toString(); 
  let firstString = firstArray.join(''); 
  let secondArray = [...firstArray];
  secondArray[1] = (parseInt(firstArray[1], 10) + 1).toString();
  let secondString = secondArray.join('');
  let leftDiagonal=[],rightDiagonal=[];
    rightDiagonal[0] = firstArray[0].charCodeAt(0) + 1
    rightDiagonal[1] = firstArray[1]
    rightDiagonal[0] = String.fromCharCode(rightDiagonal[0]) 
    let rightString = rightDiagonal.join("")
    leftDiagonal[0] = firstArray[0].charCodeAt(0) - 1
    leftDiagonal[1] = firstArray[1]
    leftDiagonal[0] = String.fromCharCode(leftDiagonal[0]) 
    let leftString = leftDiagonal.join("")
    console.log(leftString)
    
  if (originalArray[1] === '2') {
     resultArray = [firstString, secondString];
     } else {
       resultArray = [firstString]; 
      } 
  if(squares[rightString]){
  if(squares[rightString].includes("black")){
      resultArray.push(rightString)
      }}
  if(squares[leftString]){
  if(squares[leftString].includes("black")){
        resultArray.push(leftString)
      }}
  if (originalArray[1] === '5') { 
    const lastMoveFrom = lastMove.slice(0, 2); 
    const lastMoveTo = lastMove.slice(2, 4); 
     if (lastMoveFrom[1] === '7' && lastMoveTo[1] === '5') {
      const pawnFile = originalArray[0];
      const lastMoveFile = lastMoveTo[0];
       if (Math.abs(pawnFile.charCodeAt(0) - lastMoveFile.charCodeAt(0)) === 1) { 
        const enPassantSquare = lastMoveTo[0] + '6'; 
        resultArray.push(enPassantSquare);
       }
      }
     } 
       return resultArray;
      }

  
      export function getMarkedArrayBPawn(originalArray, lastMove,squares) { 
        let resultArray;
        let firstArray = [...originalArray]; 
        firstArray[1] = (parseInt(originalArray[1], 10) - 1).toString(); 
        let firstString = firstArray.join(''); 
        let secondArray = [...firstArray];
        secondArray[1] = (parseInt(firstArray[1], 10) - 1).toString();
        let secondString = secondArray.join('');
        let leftDiagonal=[],rightDiagonal=[];
          rightDiagonal[0] = firstArray[0].charCodeAt(0) + 1
          rightDiagonal[1] = firstArray[1]
          rightDiagonal[0] = String.fromCharCode(rightDiagonal[0]) 
          let rightString = rightDiagonal.join("")
          leftDiagonal[0] = firstArray[0].charCodeAt(0) - 1
          leftDiagonal[1] = firstArray[1]
          leftDiagonal[0] = String.fromCharCode(leftDiagonal[0]) 
          let leftString = leftDiagonal.join("")
          console.log(leftString)
          
        if (originalArray[1] === '7') {
           resultArray = [firstString, secondString];
           } else {
             resultArray = [firstString]; 
            } 
        if(squares[rightString]){
        if(squares[rightString].includes("white")){
            resultArray.push(rightString)
            }}
        if(squares[leftString]){
        if(squares[leftString].includes("white")){
              resultArray.push(leftString)
            }}
        if (originalArray[1] === '4') { 
          const lastMoveFrom = lastMove.slice(0, 2); 
          const lastMoveTo = lastMove.slice(2, 4); 
           if (lastMoveFrom[1] === '2' && lastMoveTo[1] === '4') {
            const pawnFile = originalArray[0];
            const lastMoveFile = lastMoveTo[0];
             if (Math.abs(pawnFile.charCodeAt(0) - lastMoveFile.charCodeAt(0)) === 1) { 
              const enPassantSquare = lastMoveTo[0] + '3'; 
              resultArray.push(enPassantSquare);
             }
            }
           } 
             return resultArray;
            }
      

export function getMarkedArrayKnight(originalArray,color,squares) {
    const possibleMoves = [
        [1, 2], [1, -2], [-1, 2], [-1, -2], 
        [2, 1], [2, -1], [-2, 1], [-2, -1]
    ];

    // Convert the letter at index 0 to a number (e.g., 'a' -> 1, 'b' -> 2)
    const column = originalArray[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    const row = parseInt(originalArray[1], 10);

    let resultArray = possibleMoves.map(move => {
        let newColumn = column + move[0];
        let newRow = row + move[1];
        let newColumnChar = String.fromCharCode(newColumn + 'a'.charCodeAt(0) - 1);
        let piece =squares[(newColumnChar + newRow.toString())]
        let newPosition = newColumnChar + newRow.toString()
        if(!piece){
            return newPosition;
        }else {
            return piece.includes(color)?null : newPosition;
        }
    });

    return  resultArray;
}


export function getMarkedArrayBishop(originalArray, color, squares) {
  const possibleMoves = [
    [-1, -1], [-1, 1], [1, -1], [1, 1],  // All four diagonal directions
  ];

  // Convert the letter at index 0 to a number (e.g., 'a' -> 1, 'b' -> 2)
  const column = originalArray[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  const row = parseInt(originalArray[1], 10);

  let resultArray = [];
  for (let move of possibleMoves) {
    let newColumn = column + move[0];
    let newRow = row + move[1];

    // Check if new position is within chessboard bounds (1-8)
    while (newColumn >= 1 && newColumn <= 8 && newRow >= 1 && newRow <= 8) {
      let newColumnChar = String.fromCharCode(newColumn + 'a'.charCodeAt(0) - 1);
      let newPosition = newColumnChar + newRow.toString();
      let piece = squares[newPosition];

      if (!piece) {
        resultArray.push(newPosition); // Empty square
      } else if (piece.includes(color)) {
        break; // Stop if encountering own piece
      } else {
        resultArray.push(newPosition); // Opponent's piece (capture)
        break; // Stop after capture
      }

      newColumn += move[0]; // Move to the next diagonal position
      newRow += move[1];
    }
  }

  return resultArray;
}


export function getMarkedArrayRook(originalArray, color, squares) {
  const possibleMoves = [
    [0, 1],  // Up (rank)
    [1, 0],  // Right (file)
    [0, -1], // Down (rank)
    [-1, 0], // Left (file)
  ];

  // Convert the letter at index 0 to a number (e.g., 'a' -> 1, 'b' -> 2)
  const column = originalArray[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  const row = parseInt(originalArray[1], 10);

  let resultArray = [];
  for (let move of possibleMoves) {
    let newColumn = column + move[0];
    let newRow = row + move[1];

    // Check if new position is within chessboard bounds (1-8)
    while (newColumn >= 1 && newColumn <= 8 && newRow >= 1 && newRow <= 8) {
      let newColumnChar = String.fromCharCode(newColumn + 'a'.charCodeAt(0) - 1);
      let newPosition = newColumnChar + newRow.toString();
      let piece = squares[newPosition];

      if (!piece) {
        resultArray.push(newPosition); // Empty square
      } else if (piece.includes(color)) {
        break; // Stop if encountering own piece
      } else {
        resultArray.push(newPosition); // Opponent's piece (capture)
        break; // Stop after capture
      }

      newColumn += move[0]; // Move to the next position in the same direction
      newRow += move[1];
    }
  }

  return resultArray;
}




export function getMarkedArrayQueen(originalArray, color, squares) {
  const possibleMoves = [
    [0, 1],  // Up (rank)
    [1, 0],  // Right (file)
    [0, -1], // Down (rank)
    [-1, 0], // Left (file)
    [1, 1],  // Up-right diagonal
    [1, -1], // Up-left diagonal
    [-1, 1], // Down-right diagonal
    [-1, -1], // Down-left diagonal
  ];

  // Convert the letter at index 0 to a number (e.g., 'a' -> 1, 'b' -> 2)
  const column = originalArray[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  const row = parseInt(originalArray[1], 10);

  let resultArray = [];
  for (let move of possibleMoves) {
    let newColumn = column + move[0];
    let newRow = row + move[1];

    // Check if new position is within chessboard bounds (1-8)
    while (newColumn >= 1 && newColumn <= 8 && newRow >= 1 && newRow <= 8) {
      let newColumnChar = String.fromCharCode(newColumn + 'a'.charCodeAt(0) - 1);
      let newPosition = newColumnChar + newRow.toString();
      let piece = squares[newPosition];

      if (!piece) {
        resultArray.push(newPosition); // Empty square
      } else if (piece.includes(color)) {
        break; // Stop if encountering own piece
      } else {
        resultArray.push(newPosition); // Opponent's piece (capture)
        break; // Stop after capture
      }

      newColumn += move[0]; // Move to the next position in the same direction
      newRow += move[1];
    }
  }

  return resultArray;
}


export function getMarkedArrayKing(originalArray, color, squares) {
  const possibleMoves = [
    [1, 1],  // Up-right
    [1, 0],  // Right
    [1, -1], // Down-right
    [0, -1], // Down
    [-1, -1], // Down-left
    [-1, 0],  // Left
    [-1, 1], // Up-left
    [0, 1],  // Up
  ];

  // Convert the letter at index 0 to a number (e.g., 'a' -> 1, 'b' -> 2)
  const column = originalArray[0].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  const row = parseInt(originalArray[1], 10);

  let resultArray = [];
  for (let move of possibleMoves) {
    let newColumn = column + move[0];
    let newRow = row + move[1];

    // Check if new position is within chessboard bounds (1-8)
    if (newColumn < 1 || newColumn > 8 || newRow < 1 || newRow > 8) {
      continue;
    }

    let newColumnChar = String.fromCharCode(newColumn + 'a'.charCodeAt(0) - 1);
    let newPosition = newColumnChar + newRow.toString();
    let piece = squares[newPosition];

    // Check for valid king move (empty square or opponent's piece)
    if (!piece || (piece !== color && piece !== ' ')) {
      resultArray.push(newPosition);
    }
  }

  return resultArray;
}
