import React, { Component } from "react";
import { connect } from "react-redux";
import { changeProp } from "../../actions/playerActions";
import PlayerKeyInput from "./player-details/PlayerKeyInput";
import PlayerColorPicker from "./player-details/PlayerColorPicker";

class PlayerDetails extends Component {
  state = {
    maxCols: 4,
    colorPicker: false
  };

  toggleColorPicker = e => {
    e.preventDefault(); //don't refresh page when button is clicked

    //change/toggle this.state.colorPicker to true/false
    if (!this.state.colorPicker) {
      this.setState({
        ...this.state,
        colorPicker: true
      });
    } else {
      this.setState({
        ...this.state,
        colorPicker: false
      });
    }
  };

  render() {
    const { maxCols, colorPicker } = this.state;

    //-------------------Get the correct cols depending on the number of players that are typed in ----------

    let colSize = Math.floor(maxCols / (this.props.players.length % maxCols));
    let colsTotal =
      Math.floor(maxCols / (this.props.players.length % maxCols)) *
      this.props.players.length; /* % maxCols //if it the colums should reset*/
    if (!colsTotal || colsTotal > maxCols) {
      colsTotal = maxCols;
      colSize = 1;
    }

    //---------------------------------------------------------------------------------------------------------

    const { name, id, keyCode, color } = this.props.player;

    return (
      <li class={`player-details col-${colSize}-${colsTotal}`}>
        <input
          className={`player-field ${
            this.props.players.length <= maxCols ? "player-field-big" : ""
          } player-name`}
          htmlFor="name"
          placeholder={name}
          style={{ borderColor: `${color}` }}
        />

        <PlayerColorPicker
          players={this.props.players}
          maxCols={this.state.maxCols}
          id={id}
          color={color}
          changeProp={this.props.changeProp}
          colorPicker={colorPicker}
          toggleColorPicker={this.toggleColorPicker}
        />

        {colorPicker ? null : (
          <PlayerKeyInput
            players={this.props.players}
            maxCols={this.state.maxCols}
            keyCode={keyCode}
            id={id}
            color={color}
            changeProp={this.props.changeProp}
          />
        )}
      </li>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeProp: (state, name, type, prop) =>
      dispatch(changeProp(state, name, type, prop))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlayerDetails);
