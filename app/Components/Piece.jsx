"use client"
import "./styles/Piece.css"
import React from "react";


export function Piece({piece_name,current_position,onDragStart}){

    const getImg = () => {
        // Check if the type contains a number
        const hasNumber = /\d/.test(piece_name);
        
        if (hasNumber) {
            const baseType = piece_name.slice(0, -1)
            switch (baseType) {
                case 'whitePawn':
                    return "./assets/pieces/white/pawn.png";

                case 'blackPawn':
                    return "/assets/pieces/black/pawn.png";
                
                case 'whiteKnight':
                    return "/assets/pieces/white/knight.png";

                case 'blackKnight':
                    return "/assets/pieces/black/knight.png";

                case 'whiteBishop':
                    return "/assets/pieces/white/bishop.png";

                case 'blackBishop':
                    return "/assets/pieces/black/bishop.png";
                
                case 'blackRook':
                    return "/assets/pieces/black/rook.png";

                case 'whiteRook':
                    return "/assets/pieces/white/rook.png";
                case 'blackQueen':
                    return "/assets/pieces/black/queen.png";
                case 'whiteueen':
                    return "/assets/pieces/white/queen.png";
                default:
                    return "";
            }
        } else {
            switch (piece_name) {
                case 'whiteKing':
                    return "/assets/pieces/white/king.png";
                case 'whiteQueen':
                    return "/assets/pieces/white/queen.png";
                case 'blackKing':
                    return "/assets/pieces/black/king.png";
                case 'blackQueen':
                    return "/assets/pieces/black/queen.png";
                      
                default:
                    return "";
            }
        }
    };
    return(
      <div className="piece" draggable onDragStart={(e) => onDragStart(e, current_position)}  >
            <img src={getImg()} piece_name={piece_name} current_position={current_position} alt= {piece_name}/>
        </div>
    )


  }

  export default React.memo(Piece)