import React, { Component } from "react";

const Line = props => {
  return <div className="line" style={{ top: `${props.top}%` }} />;
};

export default Line;
