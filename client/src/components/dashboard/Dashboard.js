import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlayersForm from "./PlayersForm";
import PlayersDisplay from "./PlayersDisplay";

export default class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Link to="/play">
          <h1 style={{ color: "white", textAlign: "center" }}>HitBox</h1>
        </Link>
        <PlayersForm />
        {/* <h2 style={{ color: "white", textAlign: "center" }}>Players</h2> */}
        <PlayersDisplay />
      </React.Fragment>
    );
  }
}
