import React, { Component } from "react";
import { connect } from "react-redux";
import { addPlayer } from "../../actions/playerActions";

class PlayersInput extends Component {
  state = {
    maxPlayers: 16
  };

  regValid = input => {
    let reg = /^[0-9]+$/;
    return reg.test(input);
  };

  setValue = e => {
    const { maxPlayers } = this.state;
    let field = e.target;

    //if the value is more than the max value - set the value to the max value
    if (parseInt(field.value) > maxPlayers) field.value = maxPlayers;
    //else if the value is less than one or not a digit - set the value to ""
    else if (parseInt(field.value) < 1 || !this.regValid(field.value))
      field.value = "";
    //if there is no value - add a single player
    if (!field.value || this.regValid(field.value))
      this.props.addPlayer(field.value, maxPlayers);
  };

  validateValue = e => {
    //if the value is more than maxPlayers / 10, not a digit or less then 1 - set the value to ""
    if (
      parseInt(e.target.value) > this.state.maxPlayers / 10 ||
      !this.regValid(e.target.value) ||
      parseInt(e.target.value) < 1
    )
      e.target.value = "";
  };

  render() {
    return (
      <div className="players-input">
        <label>Players:</label>
        <input
          onKeyPress={this.validateValue}
          onKeyUp={this.setValue}
          htmlFor="players"
          placeholder="1"
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPlayer: (input, max) => {
      dispatch(addPlayer(input, max));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlayersInput);
