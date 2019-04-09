import React from "react";

const GradientTop = props => {
  if (props.gradient) {
    return (
      <div
        className="scroll-gradient scroll-gradient-top"
        style={{
          marginTop: `${props.margin}px`
        }}
      />
    );
  } else {
    return null;
  }
};

export default GradientTop;
