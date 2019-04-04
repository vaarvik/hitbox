import React, { Component } from "react";
import { connect } from "react-redux";
import { addPlayer } from "../../actions/playerActions";

class PlayerForm extends Component {
  state = {
    maxPlayers: 15
  };
  regValid = input => {
    let reg = /^[0-9]+$/;
    return reg.test(input);
  };

  setValue = e => {
    const { maxPlayers } = this.state;
    let field = e.target;
    if (parseInt(field.value) > maxPlayers) field.value = maxPlayers;
    else if (parseInt(field.value) < 1 || !this.regValid(field.value))
      field.value = "";
    if (!field.value || this.regValid(field.value))
      this.props.addPlayer(field.value, maxPlayers);
  };

  render() {
    return (
      <form>
        <label>Players:</label>
        <input
          onKeyPress={e => {
            if (
              parseInt(e.target.value) > this.state.maxPlayers / 10 ||
              !this.regValid(e.target.value) ||
              parseInt(e.target.value) < 1
            )
              e.target.value = ""; //if value is not equal to 1, reset the value
          }}
          onKeyUp={this.setValue}
          htmlFor="players"
          placeholder="1"
        />
      </form>
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
)(PlayerForm);
