import React, { Component } from "react";
import { Route } from "react-router";
import { Home } from "./pages/Home/Home";
import { AddGame } from "./pages/Admin/AddGame/AddGame";
import { AddPlayer } from "./pages/Admin/AddPlayer/AddPlayer";
import { AddMatch } from "./pages/Admin/AddMatch/AddMatch";
import { AdminIndex } from "./pages/Admin/AdminIndex/AdminIndex";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={AdminIndex} />
        <Route exact path="/admin/game" component={AddGame} />
        <Route exact path="/admin/player" component={AddPlayer} />
        <Route exact path="/admin/match" component={AddMatch} />
      </React.Fragment>
    );
  }
}
