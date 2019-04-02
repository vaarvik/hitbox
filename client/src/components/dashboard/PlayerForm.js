import React, { Component } from "react";

export default class PlayerForm extends Component {
  render() {
    return (
      <form>
        <input for="name" placeholder="Name" />
        <input for="color" placeholder="Color" />
        <input for="keyCode" placeholder="Key" />
      </form>
    );
  }
}
