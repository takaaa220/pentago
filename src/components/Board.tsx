import * as React from "react";
import Stone from "./Stone";
import { StoneType } from "../App";

interface BoardProps {
  boardNum: number;
  board: StoneType[];
  onClick: Function;
  rotate: Function;
  rotateDeg: number;
}

const Board: React.FunctionComponent<BoardProps> = props => {
  const { boardNum, board, onClick, rotate, rotateDeg } = props;
  const arrowClass = [["1-1", "1-2"], ["2-1", "2-2"], ["3-1", "3-2"], ["4-1", "4-2"]];

  return (
    <div className="Board">
      <div className={`Arrow Arrow--Type-${arrowClass[boardNum][0]}`} onClick={() => rotate(boardNum, 1)} />
      <div className={`Board__Item Rotate${rotateDeg}`}>
        {board.map((stone, index) => {
          return <Stone key={index} boardNum={boardNum} stoneNum={index} stone={stone} onClick={onClick} />;
        })}
      </div>
      <div className={`Arrow Arrow--Type-${arrowClass[boardNum][1]}`} onClick={() => rotate(boardNum, -1)} />
    </div>
  );
};

export default Board;
