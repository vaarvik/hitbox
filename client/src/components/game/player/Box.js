import React, { Component } from "react";
import { connect } from "react-redux";
import { shrinkLine } from "../../../actions/playerActions";

class Box extends Component {
  state = {
    valid: false,
    lineShrink: {
      amount: 1,
      time: 15
    }
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
    const { keyCode } = this.props.player;
    const { i, fall, removeKey, players } = this.props;
    document.body.addEventListener("keydown", e => {
      if (e.keyCode === keyCode && !this.state.valid) {
        this.setState({
          ...this.state,
          valid: true
        });
        this.loop(e);
      }
    });

    document.body.addEventListener("keyup", e => {
      const { speed } = this.props.player;
      if (e.keyCode === keyCode) {
        this.setState({
          ...this.state,
          valid: false
        });
        removeKey(i);
        if (this.refs && Object.keys(this.refs).length)
          fall(speed, this.refs[`box${i}`], i);
      }
    });

    const { line } = this.props.player;
    const { time, amount } = this.state.lineShrink;
    let lineHeight = line.height;
    let interval = setInterval(() => {
      lineHeight -= amount;
      if (lineHeight < 0 || !Object.keys(this.refs).length) {
        clearInterval(interval);
      } else {
        this.props.shrinkLine(players, i, amount);
      }
    }, time * 1000);
  }

  render() {
    const { i } = this.props;
    const { color } = this.props.player;
    const { height, top, rotation, dist } = this.props.player.box;

    return (
      <div
        id={`box${i}`}
        className="box"
        tabIndex="0"
        style={{
          top: `${top}%`,
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          height: `${height}%`,
          boxShadow: `1px ${dist}px ${dist}px #44444480`,
          backgroundColor: color
        }}
        ref={`box${i}`}
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
    shrinkLine: (players, id, amount) => {
      dispatch(shrinkLine(players, id, amount));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Box);
