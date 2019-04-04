import React, { Component } from "react";
import { HuePicker } from "react-color";
import { connect } from "react-redux";
import { changeProp, getKeyCode } from "../../actions/playerActions";

class PlayerForm extends Component {
  state = {
    maxCols: 4,
    colorPicker: false,
    borderSize: 8
  };

  toggleColorPicker = e => {
    console.log("in");
    e.preventDefault();
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
    const { maxCols, colorPicker, borderSize } = this.state;
    let colSize = Math.floor(maxCols / (this.props.players.length % maxCols));
    let colsTotal =
      Math.floor(maxCols / (this.props.players.length % maxCols)) *
      this.props.players.length; /* % maxCols //if it the colums should reset*/
    if (!colsTotal || colsTotal > maxCols) {
      colsTotal = maxCols;
      colSize = 1;
    }

    const { name, id, keyCode, color } = this.props.player;

    return (
      <form class={`player-details col-${colSize}-${colsTotal}`}>
        <input
          className={`player-field ${
            this.props.players.length <= maxCols ? "player-field-big" : ""
          } player-name`}
          htmlFor="name"
          placeholder={name}
          style={{ borderBottom: `${borderSize}px solid ${color}` }}
        />
        <div
          className={`player-field ${
            this.props.players.length <= maxCols ? "player-field-big" : ""
          } player-color color-col-${colorPicker ? 2 : 1}-2`}
          onMouseUp={this.toggleColorPicker}
          style={{ borderBottom: `${borderSize}px solid ${color}` }}
        >
          {colorPicker ? (
            <HuePicker
              width="100%"
              height="100%"
              color={color}
              onChange={color => {
                this.props.changeProp(
                  this.props.players,
                  id,
                  color.hex,
                  "color"
                );
              }}
              onChangeComplete={color => {
                console.log(color);
              }}
            />
          ) : (
            <button
              style={{ background: color }}
              onClick={this.toggleColorPicker}
              className={`${
                this.props.players.length <= maxCols ? "big-but" : ""
              }`}
            />
          )}
        </div>
        {colorPicker ? null : (
          <input
            type="text"
            className={`player-field ${
              this.props.players.length <= maxCols ? "player-field-big" : ""
            } player-keycode color-col-1-2`}
            htmlFor="keyCode"
            value={String.fromCharCode(getKeyCode(keyCode)).toUpperCase()}
            onKeyUp={e => {
              this.props.changeProp(
                this.props.players,
                id,
                e.keyCode,
                "keyCode"
              );
            }}
            style={{ borderBottom: `${borderSize}px solid ${color}` }}
          />
        )}
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
