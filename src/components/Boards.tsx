import * as React from "react";
import Board from "./Board";

export enum StoneType {
  None = 0,
  P1,
  P2
}

export interface BoardsProps {
  tarn: 1 | 2;
}

export interface BoardsState {
  boards: StoneType[][];
}

export default class Boards extends React.Component<BoardsProps, BoardsState> {
  constructor(props: BoardsProps) {
    super(props);
    this.state = {
      boards: [
        Array(9).fill(StoneType.None),
        Array(9).fill(StoneType.None),
        Array(9).fill(StoneType.None),
        Array(9).fill(StoneType.None)
      ]
    };
    this.putStoneHandler = this.putStoneHandler.bind(this);
  }

  putStoneHandler(boardNum: number, stoneNum: number) {
    console.log("hello");
    const boards = this.state.boards;
    boards[boardNum][stoneNum] = this.props.tarn;
    this.setState({ boards });
  }

  render() {
    const { boards } = this.state;

    const boardsElement = [];
    for (let index = 0; index < 4; index += 1) {
      boardsElement.push(<Board key={index} boardNum={index} board={boards[index]} onClick={this.putStoneHandler} />);
    }

    return <div className="Boards">{boardsElement}</div>;
  }
}
