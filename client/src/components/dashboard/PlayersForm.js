import React, { Component } from "react";

export default class PlayerForm extends Component {
  render() {
    return (
      <form>
        <input for="players" placeholder="Number of Players" />
      </form>
    );
  }
}
