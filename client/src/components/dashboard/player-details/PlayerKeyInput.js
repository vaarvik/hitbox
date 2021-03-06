import React, { Component } from "react";
import { getKeyCode } from "../../../actions/playerActions";

class PlayerKeyInput extends Component {
  state = {
    errorColor: false
  };

  stateChange = value => {
    this.setState({
      ...this.state,
      errorColor: value
    });
  };

  errorBlink = () => {
    //change the error color five times with 150 ms between
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        if (this.state.errorColor) {
          this.stateChange(false);
        } else {
          this.stateChange(true);
        }
      }, 150 * i);
    }
    //if the errorColor is true after the blinking - set it to false again
    if (this.state.errorColor) {
      this.stateChange(false);
    }
  };

  validateKeyCode = e => {
    const { players, id } = this.props;
    let isDuplicate = players.find(
      player => player.keyCode === e.keyCode && player.id !== id
    ); //return the player if the keycode belong to someone and that player is not the current player that is selected

    //if there is no other player with the current keycode then change the keycode for the player
    if (!isDuplicate) {
      this.props.changeProp(players, id, e.keyCode, "keyCode");
      this.setState({
        ...this.state,
        errorColor: false
      });
    } //else make the letter blink to signal that the keycode is taken
    else {
      this.errorBlink();
    }
  };

  render() {
    const { players, maxCols, keyCode, color } = this.props;

    return (
      <input
        type="text"
        className={`player-field ${
          players.length <= maxCols ? "player-field-big" : ""
        }
      player-keycode color-col-1-2 ${
        this.state.errorColor ? "player-keycode-error" : ""
      }`}
        htmlFor="keyCode"
        value={String.fromCharCode(getKeyCode(keyCode)).toUpperCase()}
        onKeyUp={this.validateKeyCode}
        style={{ borderColor: `${color}` }}
      />
    );
  }
}
export default PlayerKeyInput;
