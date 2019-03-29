import React, { Component } from "react";
import Box from "./components/Box";
import Line from "./components/Line";
import Speedo from "./components/Speedo";

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
        lineTop: 20,
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
        lineTop: 20,
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
        lineTop: 20,
        speed: 0
      }
    ]
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

  boxJump = (speed, i) => {
    speed++;
    if (speed > 100) {
      speed = 100;
    }
    const array = this.state.players;
    for (let j in array) {
      if (parseInt(j) == i) {
        array[j].speed = speed;
        if (array[j].box.rotation > 0) array[j].box.rotation -= speed / 10;
        else array[j].box.rotation += speed / 10;
      }
    }
    this.setState({
      ...this.state,
      players: array
    });
  };

  boxReset = (box, initTop, tSpeed, i) => {
    new Promise(resolve => {
      setTimeout(() => {
        this.validateLineHit(i);
        this.setTop(initTop, 1, i);
        const array = this.state.players;
        for (let j in array) {
          if (parseInt(j) == i) {
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
        console.log("b", box.dispatchConfig);
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
    if (
      this.state.players[i].box.top < this.state.players[i].lineTop &&
      this.state.players[i].box.top + this.state.players[i].box.height >
        this.state.players[i].lineTop
    ) {
      const array = this.state.players;
      for (let j in array) {
        if (parseInt(j) == i) {
          array[j].score = array[j].score + 1;
          array[j].lineTop = array[j].lineTop + 10;
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
              <Line top={player.lineTop} />
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
              />
              <Speedo speed={player.speed} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
