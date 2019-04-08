import React, { Component } from "react";
import PlayersInput from "./PlayersInput";
import PlayersList from "./PlayersList";
import Header from "../layout/Header";

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <PlayersInput />
        <PlayersList />
      </React.Fragment>
    );
  }
}
