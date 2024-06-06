import * as moves from '@/utils/functions/moves'

export function handleHighlight (e, square_id,setHighlightedSquareId, setmarkSquareIds,lastMove,squares,setSquares) {
    if (e.target.tagName.toLowerCase() === "img") {
      setHighlightedSquareId([square_id]);
      let pieceName = e.target.getAttribute("piece_name");
        let arr = square_id.split("");
        switch(true) {
            case pieceName.includes("whitePawn"):
                setmarkSquareIds(moves.getMarkedArrayWPawn(arr,lastMove,squares,setSquares));
                break;
            case pieceName.includes("blackPawn"):
                setmarkSquareIds(moves.getMarkedArrayBPawn(arr,lastMove,squares,setSquares));
                break;
            case pieceName.includes("blackKnight"):
                setmarkSquareIds(moves.getMarkedArrayKnight(arr,"black",squares))
                break;
            case pieceName.includes("whiteKnight"):
                setmarkSquareIds(moves.getMarkedArrayKnight(arr,"white",squares))
                break;
            case pieceName.includes("blackBishop"):
                setmarkSquareIds(moves.getMarkedArrayBishop(arr,"black",squares))
                break;
            case pieceName.includes("whiteBishop"):
                setmarkSquareIds(moves.getMarkedArrayBishop(arr,"white",squares))
                break;
            case pieceName.includes("blackRook"):
                setmarkSquareIds(moves.getMarkedArrayRook(arr,"black",squares))
                break;
            case pieceName.includes("whiteRook"):
                setmarkSquareIds(moves.getMarkedArrayRook(arr,"white",squares))
                break;
            case pieceName.includes("blackQueen"):
                setmarkSquareIds(moves.getMarkedArrayQueen(arr,"black",squares))
                break;
            case pieceName.includes("whiteQueen"):
                setmarkSquareIds(moves.getMarkedArrayQueen(arr,"white",squares))
                break;
            case pieceName.includes("blackKing"):
                setmarkSquareIds(moves.getMarkedArrayKing(arr,"black",squares))
                break;
            case pieceName.includes("whiteKing"):
                setmarkSquareIds(moves.getMarkedArrayKing(arr,"white",squares))
                break;

            default:
                // Optionally handle cases where the piece_name does not match any expected values
                break;
        }
    } else {
      setHighlightedSquareId(null);
      setmarkSquareIds(" ")
    }
  };