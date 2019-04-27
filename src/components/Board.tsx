import * as React from "react";
import Stone from "./Stone";
import { StoneType } from "./Boards";

interface BoardProps {
  board: StoneType[];
}

const Board: React.FunctionComponent<BoardProps> = props => {
  const { board } = props;

  return (
    <div className="Board">
      {board.map((stone, index) => {
        return <Stone key={index} stone={stone} />;
      })}
    </div>
  );
};

export default Board;
