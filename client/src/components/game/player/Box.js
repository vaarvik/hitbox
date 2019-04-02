import React, { Component } from "react";

class Box extends Component {
  state = {
    valid: false
  };

  loop = e => {
    let bot = setInterval(() => {
      if (this.state.valid) {
        this.props.addKey(this.props.keyCode, this.props.i);
        for (let j = 0; j < this.props.keys.length; j++) {
          if (this.props.keys[j] && this.props.keys[j].key === e.keyCode) {
            this.props.jump(this.props.speed, j, e.keyCode);
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
          fall(this.props.speed, this.refs.box, i);
      }
    });
  }

  render() {
    const { height, width, top, rotation, dist, color } = this.props;
    return (
      <div
        id="box"
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
        ref="box"
      />
    );
  }
}

export default Box;
