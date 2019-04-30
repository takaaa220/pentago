import * as React from "react";
import * as ReactDOM from "react-dom";
import Boards from "./components/Boards";

export enum StoneType {
  None = 0,
  P1,
  P2
}

export enum Status {
  PutStone,
  RotateBoard,
  FinishGame
}

export interface AppProps {}

export interface AppState {
  tarn: StoneType.P1 | StoneType.P2;
  boards: StoneType[][];
  rotates: number[];
  status: Status;
  winner: "黒の勝ち" | "白の勝ち" | "引き分け" | null;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      tarn: StoneType.P1,
      boards: [
        Array(9).fill(StoneType.None),
        Array(9).fill(StoneType.None),
        Array(9).fill(StoneType.None),
        Array(9).fill(StoneType.None)
      ],
      rotates: [0, 0, 0, 0],
      status: Status.PutStone,
      winner: null
    };

    this.putStoneHandler = this.putStoneHandler.bind(this);
    this.endGame = this.endGame.bind(this);
    this.scanBoard = this.scanBoard.bind(this);
    this.rotate = this.rotate.bind(this);
    this.rotatedBoards = this.rotatedBoards.bind(this);
  }

  componentDidUpdate({}, prevState: AppState) {
    if (prevState.status !== this.state.status && this.state.status !== Status.FinishGame) {
      const isP1 = this.endGame(StoneType.P1);
      const isP2 = this.endGame(StoneType.P2);
      console.log(isP1, isP2);
      if (isP1 && isP2) {
        this.setState({ status: Status.FinishGame, winner: "引き分け" });
      } else if (isP1) {
        this.setState({ status: Status.FinishGame, winner: "黒の勝ち" });
      } else if (isP2) {
        this.setState({ status: Status.FinishGame, winner: "白の勝ち" });
      }
    }
  }

  putStoneHandler(boardNum: number, stoneNum: number) {
    const boards = this.state.boards;
    if (this.state.status !== Status.PutStone || boards[boardNum][stoneNum] !== StoneType.None) {
      return;
    }
    boards[boardNum][stoneNum] = this.state.tarn;
    this.setState({ boards, status: Status.RotateBoard });
  }

  scanBoard(i: number, j: number, x: number, y: number, tarn: StoneType, allBoard: StoneType[][]): number {
    if (x > 5 || y > 5) {
      return 0;
    }

    if (allBoard[y][x] !== tarn) {
      return 0;
    }

    return 1 + this.scanBoard(i, j, x + i, y + j, tarn, allBoard);
  }

  endGame(tarn: StoneType): boolean {
    const allBoard = this.concatBoard();
    console.log(allBoard);

    for (let jj = 0; jj < 6; jj += 1) {
      for (let ii = 0; ii < 6; ii += 1) {
        if (ii > 1 && jj > 1) {
          break;
        }

        // yoko
        if (ii < 2) {
          if (this.scanBoard(1, 0, ii, jj, tarn, allBoard) > 4) {
            return true;
          }
        }

        // tate
        if (jj < 2) {
          if (this.scanBoard(0, 1, ii, jj, tarn, allBoard) > 4) {
            return true;
          }
        }

        // naname
        if (ii < 2 && jj < 2) {
          if (this.scanBoard(1, 1, ii, jj, tarn, allBoard) > 4) {
            return true;
          }
        }
      }
    }
    return false;
  }

  concatBoard(): StoneType[][] {
    const boards = this.rotatedBoards();
    const allBoard = [];
    for (let j = 0; j < 4; j += 2) {
      for (let i = 0; i < 9; i += 3) {
        allBoard.push(boards[j].slice(i, i + 3).concat(boards[j + 1].slice(i, i + 3)));
      }
    }
    return allBoard;
  }

  rotatedBoards(): StoneType[][] {
    const currentBoards = this.state.boards;
    const rotates = this.state.rotates;
    const boards = currentBoards.slice();

    for (let i = 0; i < 4; i += 1) {
      let currentBoard = currentBoards[i];

      for (let j = 0; j < (rotates[i] + 4) % 4; j += 1) {
        currentBoard = this.rotatedBoard(currentBoard);
      }

      boards[i] = currentBoard;
    }

    return boards;
  }

  rotatedBoard(currentBoard: StoneType[]): StoneType[] {
    const board = currentBoard.slice();

    board[0] = currentBoard[6];
    board[1] = currentBoard[3];
    board[2] = currentBoard[0];
    board[3] = currentBoard[7];
    board[5] = currentBoard[1];
    board[6] = currentBoard[8];
    board[7] = currentBoard[5];
    board[8] = currentBoard[2];

    return board;
  }

  rotate(boardNum: number, direction: -1 | 1) {
    if (this.state.status !== Status.RotateBoard) {
      return;
    }

    const rotates = this.state.rotates;
    rotates[boardNum] += direction;

    const tarn = this.state.tarn === StoneType.P1 ? StoneType.P2 : StoneType.P1;
    this.setState({ tarn, rotates, status: Status.PutStone });
  }

  render() {
    const { tarn, boards, rotates, status, winner } = this.state;

    return (
      <div className={`App${winner ? " App--End" : ""}`}>
        <p>{tarn === StoneType.P1 ? "黒のターン" : "白の勝ち"}</p>
        <Boards
          boards={boards}
          putStoneHandler={this.putStoneHandler}
          rotate={this.rotate}
          rotates={rotates}
          endGame={status === Status.RotateBoard}
        />
        <div style={{ textAlign: "center" }}>
          <br />
          <br />
          <p>基本的にルールは五目並べと一緒ですが，</p>
          <p>石を置いた後に，ボードを回転させます．</p>
          <p>石を置いた後またはボードを置いた後に自分の石が5枚揃ったら勝ちです．</p>
        </div>
        {status === Status.FinishGame ? <div className="EndGame">{winner}</div> : null}
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
