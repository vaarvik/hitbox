import React, { Component } from "react";
import { connect } from "react-redux";
import { changeKeyCode, getKeyCode } from "../../actions/playerActions";

class PlayerForm extends Component {
  state = {
    maxColSize: 7
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

    const { name, color, id, keyCode } = this.props.player;

    return (
      <form class={`player-details col-${colSize}-${colsTotal}`}>
        <input htmlFor="name" placeholder={name} />
        <input
          htmlFor="color"
          value={color}
          style={{ background: color, color: "white" }}
        />
        <input
          htmlFor="keyCode"
          value={String.fromCharCode(getKeyCode(keyCode)).toUpperCase()}
          onKeyUp={e => {
            this.props.changeKeyCode(this.props.players, id, e.keyCode);
          }}
        />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeKeyCode: (state, name, key) =>
      dispatch(changeKeyCode(state, name, key))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlayerForm);
