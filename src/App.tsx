import * as React from "react";
import * as ReactDOM from "react-dom";
import Boards from "./components/Boards";

export enum StoneType {
  None = 0,
  P1,
  P2
}

export interface AppProps {}

export interface AppState {
  tarn: StoneType.P1 | StoneType.P2;
  boards: StoneType[][];
  rotates: number[];
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
      rotates: [0, 0, 0, 0]
    };

    this.putStoneHandler = this.putStoneHandler.bind(this);
    this.endGame = this.endGame.bind(this);
    this.scanBoard = this.scanBoard.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  componentDidUpdate({}, prevState: AppState) {
    if (prevState.tarn !== this.state.tarn) {
      if (this.endGame()) {
        alert("end");
      }
    }
  }

  putStoneHandler(boardNum: number, stoneNum: number) {
    const boards = this.state.boards;
    if (boards[boardNum][stoneNum] !== StoneType.None) {
      return;
    }
    boards[boardNum][stoneNum] = this.state.tarn;
    const tarn = this.state.tarn === StoneType.P2 ? StoneType.P1 : StoneType.P2;
    this.setState({ boards, tarn });
  }

  scanBoard(i: number, j: number, x: number, y: number, allBoard: StoneType[][]): number {
    if (x > 5 || y > 5) {
      return 0;
    }

    const tarn = this.state.tarn === StoneType.P1 ? StoneType.P2 : StoneType.P1;
    if (allBoard[y][x] !== tarn) {
      return 0;
    }

    return 1 + this.scanBoard(i, j, x + i, y + j, allBoard);
  }

  endGame(): boolean {
    const allBoard = this.concatBoard();

    for (let jj = 0; jj < 6; jj += 1) {
      for (let ii = 0; ii < 6; ii += 1) {
        if (ii > 1 && jj > 1) {
          break;
        }

        // yoko
        if (ii < 2) {
          if (this.scanBoard(1, 0, ii, jj, allBoard) > 4) {
            return true;
          }
        }

        // tate
        if (jj < 2) {
          if (this.scanBoard(0, 1, ii, jj, allBoard) > 4) {
            return true;
          }
        }

        // naname
        if (ii < 2 && jj < 2) {
          if (this.scanBoard(1, 1, ii, jj, allBoard) > 4) {
            return true;
          }
        }
      }
    }
    return false;
  }

  concatBoard(): StoneType[][] {
    const boards = this.state.boards;
    const allBoard = [];
    for (let j = 0; j < 4; j += 2) {
      for (let i = 0; i < 9; i += 3) {
        allBoard.push(boards[j].slice(i, i + 3).concat(boards[j + 1].slice(i, i + 3)));
      }
    }
    return allBoard;
  }

  rotate(boardNum: number, direction: -1 | 1) {
    const rotates = this.state.rotates;
    rotates[boardNum] += direction;
    this.setState({ rotates });
  }

  render() {
    const { boards, rotates } = this.state;

    return (
      <div className="App">
        <Boards boards={boards} putStoneHandler={this.putStoneHandler} rotate={this.rotate} rotates={rotates} />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
