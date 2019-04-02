import React, { Component } from "react";
import Box from "./player/Box";
import Line from "./player/Line";
import Speedo from "./player/Speedo";

class App extends Component {
  state = {
    players: [
      {
        name: "Reggie",
        color: "green",
        score: 0,
        keyCode: 87,
        box: {
          height: 5,
          initTop: 0,
          top: 0,
          rotation: 0,
          dist: 1
        },
        line: { top: 20, height: 4 },
        speed: 0
      },
      {
        name: "Johnny",
        color: "orange",
        score: 0,
        keyCode: 69,
        box: {
          height: 5,
          initTop: 0,
          top: 0,
          rotation: 0,
          dist: 1
        },
        line: { top: 20, height: 4 },
        speed: 0
      },
      {
        name: "Pedro",
        color: "yellow",
        score: 0,
        keyCode: 82,
        box: {
          height: 5,
          initTop: 0,
          top: 0,
          rotation: 0,
          dist: 1
        },
        line: { top: 20, height: 4 },
        speed: 0
      }
    ],
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
    const array = this.state.players;
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

    const array = this.state.players;
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
        const array = this.state.players;
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
    let { top, initTop, dist } = this.state.players[i].box;
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
    const player = this.state.players[i];
    if (
      player.box.top <= player.line.top + player.line.height &&
      player.box.top + player.box.height > player.line.top
    ) {
      const array = this.state.players;
      for (let j in array) {
        if (parseInt(j) === parseInt(i)) {
          array[j].score = array[j].score + 1;
          array[j].line.top = array[j].line.top + 10;
        }
      }
      this.setState({
        ...this.state,
        players: array
      });
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.players.map((player, i) => {
          return (
            <div
              key={i}
              className="player"
              style={{ width: `${100 / this.state.players.length}%` }}
            >
              <p>Score {player.score}</p>
              <Line top={player.line.top} height={player.line.height} />
              <Box
                jump={this.boxJump}
                fall={this.boxFall}
                top={player.box.top}
                rotation={player.box.rotation}
                height={player.box.height}
                dist={player.box.dist}
                speed={player.speed}
                color={player.color}
                keyCode={player.keyCode}
                i={i}
                addKey={this.state.addKey}
                removeKey={this.state.removeKey}
                keys={this.state.keys}
              />
              <Speedo speed={player.speed} />
              <footer id="footer" />
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
