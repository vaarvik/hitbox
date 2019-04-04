import React, { Component } from "react";
import { HuePicker } from "react-color";
import { connect } from "react-redux";
import { changeProp, getKeyCode } from "../../actions/playerActions";

class PlayerForm extends Component {
  state = {
    maxColSize: 5
  };

  render() {
    const { maxColSize } = this.state;
    let colSize = Math.floor(
      maxColSize / (this.props.players.length % maxColSize)
    );
    let colsTotal =
      Math.floor(maxColSize / (this.props.players.length % maxColSize)) *
      this.props.players
        .length; /* % maxColSize //if it the colums should reset*/
    if (!colsTotal || colsTotal > maxColSize) {
      colsTotal = maxColSize;
      colSize = 1;
    }

    const { name, textColor, id, keyCode, color } = this.props.player;

    return (
      <form class={`player-details col-${colSize}-${colsTotal}`}>
        <input htmlFor="name" placeholder={name} />
        <input
          htmlFor="color"
          value={color}
          style={{ background: color, color: textColor }}
        />
        <input
          htmlFor="keyCode"
          value={String.fromCharCode(getKeyCode(keyCode)).toUpperCase()}
          onKeyUp={e => {
            this.props.changeProp(this.props.players, id, e.keyCode, "keyCode");
          }}
        />
        <HuePicker
          width="100%"
          color={color}
          onChange={color => {
            this.props.changeProp(this.props.players, id, color.hex, "color");
          }}
        />
      </form>
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
)(PlayerForm);
