import React, { Component } from "react";

const Line = props => {
  return (
    <div
      className="line ease-in-out-5"
      style={{ top: `${props.top}%`, height: `${props.height}%` }}
    />
  );
};

export default Line;
