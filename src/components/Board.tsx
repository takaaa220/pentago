import * as React from "react";
import Stone from "./Stone";
import { StoneType } from "./Boards";

interface BoardProps {
  boardNum: number;
  board: StoneType[];
  onClick: Function;
}

const Board: React.FunctionComponent<BoardProps> = props => {
  const { boardNum, board, onClick } = props;

  return (
    <div className="Board">
      {board.map((stone, index) => {
        return <Stone key={index} boardNum={boardNum} stoneNum={index} stone={stone} onClick={onClick} />;
      })}
    </div>
  );
};

export default Board;
