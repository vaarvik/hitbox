import React, { Component } from "react";
import { connect } from "react-redux";
import PlayerForm from "./PlayerForm";

class PlayersDisplay extends Component {
  render() {
    return (
      <ul>
        {this.props.players.map(player => {
          return <PlayerForm player={player} players={this.props.players} />;
        })}
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
