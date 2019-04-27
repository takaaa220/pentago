import * as React from "react";
import Board from "./Board";

export enum StoneType {
  None = 0,
  P1,
  P2
}

export interface BoardsProps {}

export interface BoardsState {
  boards: StoneType[][];
}

export default class Boards extends React.Component<BoardsProps, BoardsState> {
  constructor(props: BoardsProps) {
    super(props);
    const board = Array(9).fill(StoneType.None);
    this.state = {
      boards: [board, board, board, board]
    };
  }

  render() {
    const { boards } = this.state;
    const boardsElement = [];
    for (let index = 0; index < 4; index += 1) {
      boardsElement.push(<Board key={index} board={boards[index]} />);
    }

    return <div className="Boards">{boardsElement}</div>;
  }
}
