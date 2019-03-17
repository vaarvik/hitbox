import React, { Component } from "react";

const Box = props => {
  return (
    <div
      id="box"
      className="box"
      tabIndex="0"
      style={{ top: `${props.top}%`, height: `${props.height}%` }}
      onKeyDown={() => {
        props.jump(props.speed);
      }}
      onKeyUp={e => {
        props.fall(props.speed, e);
      }}
    />
  );
};

export default Box;
