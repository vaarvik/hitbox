import React, { Component } from "react";
import { connect } from "react-redux";
import { shrinkLine } from "../../../actions/playerActions";

class Box extends Component {
  state = {
    valid: false
  };

  loop = e => {
    const { addKey, keys, jump, i } = this.props;
    let bot = setInterval(() => {
      const { keyCode, speed } = this.props.player;
      if (this.state.valid) {
        addKey(keyCode, i);
        for (let j = 0; j < keys.length; j++) {
          if (keys[j] && keys[j].key === e.keyCode) {
            jump(speed, j, e.keyCode);
          }
        }
      } else {
        clearInterval(bot);
      }
    }, 35);
  };

  componentWillMount() {
    const { keyCode, i, fall, removeKey } = this.props;
    document.body.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case keyCode:
          if (!this.state.valid) {
            this.setState({
              valid: true
            });
            this.loop(e);
          }
      }
    });
    document.body.addEventListener("keyup", e => {
      switch (e.keyCode) {
        case keyCode:
          this.setState({
            valid: false
          });
          removeKey(i);
          if (this.refs && Object.keys(this.refs).length)
            fall(this.props.speed, this.refs[`box${i}`], i);
      }
    });
    this.props.shrinkLine(
      this.props.players,
      this.props.i,
      0.5,
      this.props.player.line.height,
      5
    );
  }

  render() {
    const { height, width, top, rotation, dist, color } = this.props;
    return (
      <div
        id={`box${this.props.i}`}
        className="box"
        tabIndex="0"
        style={{
          top: `${top}%`,
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          height: `${height}%`,
          width: `${width}%`,
          boxShadow: `1px ${dist}px ${dist}px #44444480`,
          backgroundColor: color
        }}
        ref={`box${this.props.i}`}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.players.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    shrinkLine: (players, id, amount, lineHeight, time) => {
      let interval = setInterval(i => {
        lineHeight -= amount;
        dispatch(shrinkLine(players, id, amount));
        if (lineHeight <= 0) clearInterval(interval);
      }, time * 1000);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Box);
