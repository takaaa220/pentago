import * as React from "react";
import * as ReactDOM from "react-dom";
import Boards from "./components/Boards";

export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div>
        <Boards />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
