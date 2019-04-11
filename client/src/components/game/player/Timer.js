import React, { Component } from "react";

class Line extends Component {
  state = {
    time: this.props.time
  };
  render() {
    let i = 0;
    let int = setInterval(() => {
      i++;
      this.setState({
        time: this.state.time - 1
      });
      if (i < 0) {
        clearInterval(int);
      }
    }, 1000);
    return <div className="timer">{this.state.time}</div>;
  }
}

export default Line;
