import * as React from "react";
import Board from "./Board";
import { StoneType } from "../App";

interface BoardsProps {
  putStoneHandler: Function;
  boards: StoneType[][];
  rotate: Function;
  rotates: number[];
}

const Boards: React.FunctionComponent<BoardsProps> = props => {
  const { boards, putStoneHandler, rotate, rotates } = props;

  const boardsElement = [];
  for (let index = 0; index < 4; index += 1) {
    boardsElement.push(
      <Board
        key={index}
        boardNum={index}
        board={boards[index]}
        onClick={putStoneHandler}
        rotate={rotate}
        rotateDeg={rotates[index]}
      />
    );
  }

  return <div className="Boards">{boardsElement}</div>;
};

export default Boards;
