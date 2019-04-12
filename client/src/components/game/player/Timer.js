import React, { Component } from "react";
import { connect } from "react-redux";
import { changeProp } from "../../../actions/playerActions";

class Line extends Component {
  state = {
    time: this.props.time
  };

  startCountDown = () => {
    //start a 1 second interval named "interval"
    let { players, i, changeProp } = this.props;

    let interval = setInterval(() => {
      if (this.props.time > 0) {
        //reduce the time for this player by 1 every round
        changeProp(players, i, this.props.time - 1, "time");
      } else {
        //end the countdown if the time for this player is less than 1
        this.endCountDown(interval);
      }
    }, 1000);
  };

  endCountDown = interval => {
    clearInterval(interval);
  };

  componentDidMount() {
    //just start the countdown when the component is mounted, not any other time
    this.startCountDown();
  }

  render() {
    return <div className="timer">{this.props.time}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeProp: (state, name, type, prop) =>
      dispatch(changeProp(state, name, type, prop))
  };
};

const mapStateToProps = state => {
  return {
    players: state.players.players
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Line);
