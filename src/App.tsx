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
      ]
    };

    this.changeTarn = this.changeTarn.bind(this);
    this.putStoneHandler = this.putStoneHandler.bind(this);
  }

  putStoneHandler(boardNum: number, stoneNum: number) {
    const boards = this.state.boards;
    if (boards[boardNum][stoneNum] !== StoneType.None) {
      return;
    }
    boards[boardNum][stoneNum] = this.state.tarn;
    this.setState({ boards });
    this.changeTarn();
  }

  changeTarn() {
    const tarn = this.state.tarn === StoneType.P2 ? StoneType.P1 : StoneType.P2;
    this.setState({ tarn });
  }

  endGame(): boolean {
    return false;
  }

  render() {
    const { boards } = this.state;

    return (
      <div className="App">
        <Boards boards={boards} putStoneHandler={this.putStoneHandler} />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
