import React, { Component } from "react";

const Box = props => {
  return <div className="box" tabIndex="1" style={{ top: `${props.top}%` }} />;
};

export default Box;
