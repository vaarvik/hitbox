import React, { Component } from "react";

const Speedo = props => {
  return (
    <figure>
      <span style={{ width: `${props.speed}%` }} />
      {/* <p>{props.speed}</p> */}
    </figure>
  );
};

export default Speedo;
