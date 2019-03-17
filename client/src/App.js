import React, { Component } from "react";
import Box from "./components/Box";
import Line from "./components/Line";
import Speedo from "./components/Speedo";

class App extends Component {
  state = {
    level: 1,
    box: {
      height: 10,
      initTop: 90,
      top: 90
    },
    lineTop: 60,
    speed: 0
  };

  setTop = top => {
    this.setState({
      ...this.state,
      box: {
        ...this.state.box,
        top: top
      }
    });
  };

  boxJump = speed => {
    speed++;
    if (speed > 100) {
      speed = 100;
    }

    this.setState({
      ...this.state,
      speed
    });
  };

  boxReset = (box, initTop, tSpeed) => {
    new Promise(resolve => {
      setTimeout(() => {
        this.lineHit();
        this.setTop(initTop);
        this.setState({
          ...this.state,
          speed: 0
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

  boxFall = (speed, e) => {
    let tSpeed = (speed / 60).toFixed(1);
    let { top, initTop } = this.state.box;
    let newTop = this.state.box.top;
    let box = e.target;

    box.classList.remove(`ease-in-${tSpeed * 10}`);
    box.classList.add(`ease-in-out-${tSpeed * 10}`);

    for (let i = 0; i < speed; i++) {
      newTop--;
    }
    new Promise(resolve => {
      this.setTop(newTop);
      resolve();
    }).then(() => {});

    this.boxReset(box, initTop, tSpeed);
  };

  lineHit = () => {
    console.log(
      this.state.box.top + this.state.box.height / 2 < this.state.lineTop
    );
    if (
      this.state.box.top < this.state.lineTop &&
      this.state.box.top + this.state.box.height > this.state.lineTop
    ) {
      this.setState({
        ...this.state,
        level: this.state.level + 1,
        lineTop: this.state.lineTop - 10
      });
    }
  };

  render() {
    window.addEventListener("load", () => {
      document.getElementById("box").focus();
    });

    return (
      <div className="App">
        <h1>Level {this.state.level}</h1>
        <Line top={this.state.lineTop} />
        <Box
          jump={this.boxJump}
          fall={this.boxFall}
          top={this.state.box.top}
          height={this.state.box.height}
          speed={this.state.speed}
        />
        <Speedo speed={this.state.speed} />
      </div>
    );
  }
}

export default App;
