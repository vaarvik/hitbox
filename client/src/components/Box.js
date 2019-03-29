import React, { Component } from "react";

class Box extends Component {
  componentWillMount() {
    document.body.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case this.props.keyCode:
          this.props.jump(this.props.speed, this.props.i);
      }
    });
    document.body.addEventListener("keyup", e => {
      switch (e.keyCode) {
        case this.props.keyCode:
          this.props.fall(this.props.speed, this.refs.box, this.props.i);
      }
    });
  }

  render() {
    const {
      height,
      width,
      top,
      rotation,
      dist,
      color,
      speed,
      i,
      jump,
      fall
    } = this.props;
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
          boxShadow: `1px ${dist}px ${dist}px #00000080`,
          backgroundColor: color
        }}
        ref="box"
      />
    );
  }
}

export default Box;
