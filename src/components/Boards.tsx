import * as React from "react";
import Board from "./Board";
import { StoneType } from "../App";

interface BoardsProps {
  putStoneHandler: Function;
  boards: StoneType[][];
}

const Boards: React.FunctionComponent<BoardsProps> = props => {
  const { boards } = props;

  const boardsElement = [];
  for (let index = 0; index < 4; index += 1) {
    boardsElement.push(<Board key={index} boardNum={index} board={boards[index]} onClick={props.putStoneHandler} />);
  }

  return <div className="Boards">{boardsElement}</div>;
};

export default Boards;
