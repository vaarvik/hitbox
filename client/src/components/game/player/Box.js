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

  loadPower = e => {
    const { addKey, keys, jump, i } = this.props;

    let bot = setInterval(() => {
      const { keyCode, speed } = this.props.player;
      //keep interval running as long as this.state.valid is true
      if (this.state.valid) {
        addKey(keyCode, i);
        //loop through all keys that is connected to a player in the game
        for (let j = 0; j < keys.length; j++) {
          //if there is an element and that element has a key connected which is the same as the pressed key run the jump function
          if (keys[j] && keys[j].key === e.keyCode) {
            jump(speed, j, e.keyCode);
          }
        }
      } else {
        //clear interval running if this.state.valid is false
        clearInterval(bot);
      }
    }, 35); //interval speed/break
  };

  componentWillMount() {
    const { keyCode } = this.props.player;
    const { i, fall, removeKey, players } = this.props;
    document.body.addEventListener("keydown", e => {
      //if the key that is pressed is equal to this components keycode and this.state.valid is false
      //then change this.state.valid to true and run the loadPower function
      if (e.keyCode === keyCode && !this.state.valid) {
        this.setState({
          ...this.state,
          valid: true
        });
        this.loadPower(e);
      }
    });

    document.body.addEventListener("keyup", e => {
      const { speed } = this.props.player;
      //if the key that is released is equal to this components keycode...
      if (e.keyCode === keyCode) {
        this.setState({
          ...this.state,
          valid: false //change this.state.valid to false
        });
        removeKey(i); //run the remove key function
        //if this.refs exist and contains elements run the fall function
        if (this.refs && Object.keys(this.refs).length)
          fall(speed, this.refs[`box${i}`], i);
      }
    });

    const { line } = this.props.player;
    const { time, amount } = this.state.lineShrink;
    let lineHeight = line.height;
    let interval = setInterval(() => {
      //start an interval that runs every "time's" second
      lineHeight -= amount;
      //if the lineHeight is more than zero or there is no elements in this.refs clear the interval
      if (lineHeight < 0 || !Object.keys(this.refs).length) {
        clearInterval(interval);
      }
      //else run the shrinkLine function
      else {
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
