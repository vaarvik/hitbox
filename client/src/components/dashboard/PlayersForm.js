import React, { Component } from "react";
import { connect } from "react-redux";
import { addPlayer } from "../../actions/playerActions";

class PlayerForm extends Component {
  render() {
    return (
      <form>
        <label>Players:</label>
        <input
          onKeyUp={e => {
            if (e.target.value > 10) e.target.value = 10;
            this.props.addPlayer(e.target.value);
          }}
          htmlFor="players"
          placeholder="1"
        />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPlayer: input => {
      dispatch(addPlayer(input));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PlayerForm);
