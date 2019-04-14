import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./components/game/Game";
import Dashboard from "./components/dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/play" component={Game} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
