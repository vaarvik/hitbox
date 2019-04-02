import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlayersForm from "./PlayersForm";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Link to="/play">
          <h1 style={{ color: "white", textAlign: "center" }}>HitBox</h1>
        </Link>
        <PlayersForm />
        <h1 style={{ color: "white", textAlign: "center" }}>Players</h1>
        {/* <PlayersDisplay /> */}
      </div>
    );
  }
}
