import React, { Component } from "react";
import { connect } from "react-redux";
import { shrinkLine } from "../../../actions/playerActions";

class Line extends Component {
  state = {
    lineShrink: {
      amount: 1,
      time: 15
    }
  };
  componentDidMount() {
    const { players, i } = this.props;
    const { line } = this.props.player;
    const { time, amount } = this.state.lineShrink;
    let lineHeight = line.height;
    let interval = setInterval(() => {
      //start an interval that runs every "time's" second
      lineHeight -= amount;
      //if the lineHeight is more than zero or there are no elements in this.refs clear the interval
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
    return (
      <div
        className="line ease-in-out-5"
        ref={`line${this.props.i}`}
        style={{
          top: `${this.props.player.line.top}%`,
          height: `${this.props.player.line.height}%`
        }}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    shrinkLine: (players, id, amount) => {
      dispatch(shrinkLine(players, id, amount));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Line);
