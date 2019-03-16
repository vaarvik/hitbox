import React, { Component } from "react";
import Box from "./components/Box";
import Line from "./components/Line";

class App extends Component {
  state = {
    box: {
      initTop: 80,
      top: 80
    },
    lineTop: 20
  };

  boxJump = () => {
    let top = this.state.box.top;
    let u = 0;
    document.body.onkeydown = () => {
      u++;
    };

    document.body.onkeyup = () => {
      for (let i = 0; i < u; i++) {
        top--;
        this.setState({
          box: {
            ...this.state.box,
            top: top
          }
        });
      }
      setTimeout(() => {
        this.setState({
          box: {
            ...this.state.box,
            top: this.state.box.initTop
          }
        });
      }, 1000);
    };
  };

  render() {
    this.boxJump();
    return (
      <div className="App">
        <Box top={this.state.box.top} />
        <Line />
      </div>
    );
  }
}

export default App;
