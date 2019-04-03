import React, { Component } from "react";
import { connect } from "react-redux";
import PlayerForm from "./PlayerForm";
import { getKeyCode } from "../../actions/playerActions";

class PlayersDisplay extends Component {
  state = {
    playerForm: null
  };

  displayPlayerForm = player => {
    return <PlayerForm player={player} players={this.props.players} />;
  };
  render() {
    return (
      <ul>
        {this.props.players.map(player => {
          return (
            // <button
            //   key={player.name}
            //   style={{ background: player.color, color: player.textColor }}
            //   onClick={() => {
            //     this.setState({
            //       ...this.state,
            //       playerForm: this.displayPlayerForm(player)
            //     });
            //   }}
            // >
            //   {/* {String.fromCharCode(getKeyCode(player.keyCode)).toUpperCase()} */}
            <PlayerForm player={player} players={this.props.players} />
            // </button>
          );
        })}

        {/* {this.state.playerForm} */}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.players.players
  };
};

export default connect(mapStateToProps)(PlayersDisplay);
