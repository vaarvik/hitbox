import React, { Component } from "react";

const Speedo = props => {
  return (
    <figure>
      <span style={{ width: `${props.speed}%` }} />
    </figure>
  );
};

export default Speedo;
