import React from "react";

const GradientBottom = props => {
  if (props.gradient) {
    return (
      <div
        className="scroll-gradient scroll-gradient-bottom"
        style={{
          marginBottom: `${props.margin}px`
        }}
      />
    );
  } else {
    return null;
  }
};

export default GradientBottom;
