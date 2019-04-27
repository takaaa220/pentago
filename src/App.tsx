import * as React from "react";
import * as ReactDOM from "react-dom";
import Boards from "./components/Boards";

export interface AppProps {}

export interface AppState {
  tarn: 1 | 2;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      tarn: 1
    };
  }

  render() {
    const { tarn } = this.state;

    return (
      <div className="App">
        <Boards tarn={tarn} />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
