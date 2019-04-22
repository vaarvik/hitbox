import React, { Component } from "react";
import Box from "./player/Box";
import Line from "./player/Line";
import Timer from "./player/Timer";
import { connect } from "react-redux";

class Game extends Component {
  state = {
    players: this.props.players,
    keys: [],
    addKey: (newKey, i) => {
      const { keys } = this.state;
      const obj = { key: newKey, speed: 0 };
      keys[i] = obj;
      this.setState({
        ...this.state,
        keys
      });
    },
    removeKey: i => {
      const { keys } = this.state;
      keys[i] = 0;
      this.setState({
        ...this.state,
        keys
      });
    }
  };

  setTop = (top, dist, i) => {
    const array = this.props.players;
    for (let j in array) {
      if (parseInt(j) === i) {
        array[j].box.top = top;
        array[j].box.dist = dist;
        array[j].box.rotation = 0;
      }
    }
    this.setState({
      ...this.state,
      players: array
    });
  };

  boxJump = (speed, i, keyCode) => {
    speed++;

    if (speed > 100) {
      speed = 100;
    }

    const array = this.props.players;
    const { keys } = this.state;

    for (let j in array) {
      if (parseInt(j) === parseInt(i)) {
        array[j].speed = speed;
        if (array[j].box.rotation > 0) array[j].box.rotation -= speed / 10;
        else array[j].box.rotation += speed / 10;
      }
    }

    for (let j = 0; j < keys.length; j++) {
      if (keys[j] && keys[j].key === keyCode) {
        keys[j].speed = speed;
      }
    }

    this.setState({
      ...this.state,
      players: array,
      keys
    });
  };

  boxReset = (box, initTop, tSpeed, i) => {
    new Promise(resolve => {
      setTimeout(() => {
        this.validateLineHit(i);
        this.setTop(initTop, 1, i);
        const array = this.props.players;
        for (let j in array) {
          if (parseInt(j) === parseInt(i)) {
            array[j].speed = 0;
          }
        }
        this.setState({
          ...this.state,
          players: array
        });
        resolve();
      }, tSpeed * 1000);
    })
      .then(() => {
        box.classList.add(`ease-in-${tSpeed * 10}`);
      })
      .then(() => {
        setTimeout(() => {
          box.className = "box";
        }, tSpeed * 1000);
      });
  };

  boxFall = (speed, e, i) => {
    let tSpeed = (speed / 60).toFixed(1);
    let { top, initTop, dist } = this.props.players[i].box;
    let newTop = top;
    let newDist = dist;
    let box = e;

    box.classList.remove(`ease-in-${tSpeed * 10}`);
    box.classList.add(`ease-in-out-${tSpeed * 10}`);

    for (let i = 0; i < speed; i++) {
      newTop++;
      newDist++;
    }

    this.setTop(newTop, newDist, i);

    this.boxReset(box, initTop, tSpeed, i);
  };

  validateLineHit = i => {
    const player = this.props.players[i];
    //if the any part of the box hits the line...
    if (
      player.box.top <= player.line.top + player.line.height &&
      player.box.top + player.box.height > player.line.top
    ) {
      const updatedPlayers = this.props.players;
      updatedPlayers.map(player => {
        if (player.id == i) {
          //if player.id the same as the element id that is pressed
          player.score++;
          player.line.top += 10;
          player.time += 10;
        }
        return player;
      });
      this.setState({
        ...this.state,
        players: updatedPlayers
      });
    }
  };

  render() {
    return (
      <div className="App">
        {this.props.players.map((player, i) => {
          return (
            <div
              key={i}
              className="player"
              style={{ width: `${100 / this.props.players.length}%` }}
            >
              <Line
                top={player.line.top}
                height={player.line.height}
                players={this.state.players}
                player={player}
                i={i}
              />
              <Box
                jump={this.boxJump}
                fall={this.boxFall}
                player={player}
                top={player.box.top}
                rotation={player.box.rotation}
                height={player.box.height}
                dist={player.box.dist}
                speed={player.speed}
                color={player.color}
                keyCode={player.keyCode}
                line={player.line.height}
                i={i}
                addKey={this.state.addKey}
                removeKey={this.state.removeKey}
                keys={this.state.keys}
              />
              <Timer time={player.time} i={i} />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.players.players
  };
};

export default connect(mapStateToProps)(Game);
