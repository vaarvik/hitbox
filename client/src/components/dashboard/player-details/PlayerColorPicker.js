import React from "react";
import { HuePicker } from "react-color";

const PlayerColorPicker = props => {
  const {
    players,
    maxCols,
    color,
    id,
    changeProp,
    colorPicker,
    toggleColorPicker
  } = props;

  return (
    <div
      className={`player-field ${
        players.length <= maxCols ? "player-field-big" : ""
      } player-color color-col-${colorPicker ? 2 : 1}-2`}
      onMouseUp={toggleColorPicker}
      style={{ borderColor: `${color}` }}
    >
      {colorPicker ? (
        <HuePicker
          width="100%"
          height="100%"
          color={color}
          onChange={color => {
            changeProp(players, id, color.hex, "color");
          }}
        />
      ) : (
        <button
          style={{ background: color }}
          onClick={toggleColorPicker}
          className={`${players.length <= maxCols ? "big-but" : ""}`}
        />
      )}
    </div>
  );
};

export default PlayerColorPicker;
