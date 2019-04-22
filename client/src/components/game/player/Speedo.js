import React, { Component } from "react";

const Speedo = props => {
  return (
    <figure>
      <span style={{ width: `${props.speed}%`, background: props.color }} />
    </figure>
  );
};

export default Speedo;
