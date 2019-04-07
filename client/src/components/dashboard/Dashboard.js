import React, { Component } from "react";
import PlayersForm from "./PlayersForm";
import PlayersDisplay from "./PlayersDisplay";
import Header from "../layout/Header";

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />

        {/* <h1>HitBox</h1> */}
        <PlayersForm />
        <PlayersDisplay />
      </React.Fragment>
    );
  }
}
