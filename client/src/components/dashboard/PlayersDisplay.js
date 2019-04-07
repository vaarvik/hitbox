import React, { Component } from "react";
import { connect } from "react-redux";
import PlayerForm from "./PlayerForm";

class PlayersDisplay extends Component {
  state = {
    gradientBottom: {
      initHeight: 55,
      height: 55
    },
    gradientTop: {
      initHeight: 0,
      height: 0,
      maxheight: 70
    },
    gradient: false
  };
  handleScroll = e => {
    const element = e.target;
    new Promise(resolve => {
      this.setBottomGradient(e);
      resolve();
    }).then(() => {
      this.setTopGradient(element);
    });
    //prevent bug when scroll hits bottom by not letting it hit bottom
    this.preventScrollBug(element);
  };

  setTopGradient = element => {
    const { initHeight, maxheight } = this.state.gradientTop;
    const { scrollHeight, scrollTop, clientHeight } = element;
    //if the scroll is closing to bottom decrease the gradient height
    // console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollTop >= initHeight && scrollTop < maxheight) {
      this.setState({
        ...this.state,
        gradientTop: {
          ...this.state.gradientTop,
          height: scrollTop
        }
      });
    }
  };

  setBottomGradient = e => {
    const { initHeight } = this.state.gradientBottom;
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    if (scrollTop <= 0) {
      this.setState({
        ...this.state,
        gradientBottom: {
          ...this.state.gradientBottom,
          height: initHeight
        }
      });
    } else if (scrollHeight - (scrollTop + clientHeight) <= initHeight) {
      this.setState({
        ...this.state,
        gradientBottom: {
          ...this.state.gradientBottom,
          height: scrollHeight - (scrollTop + clientHeight)
        }
      });
    }
    //if the scroll is not closing to bottom restore/keep the gradient height
    else {
      this.setState({
        ...this.state,
        gradientBottom: {
          ...this.state.gradientBottom,
          height: initHeight
        }
      });
    }
  };

  validateScroll = e => {
    if (!this.state.gradient && e.scrollHeight > e.clientHeight) {
      this.setState({
        ...this.state,
        gradient: true
      });
    } else if (this.state.gradient && e.scrollHeight <= e.clientHeight) {
      this.setState({
        ...this.state,
        gradient: false
      });
    }
  };

  preventScrollBug = div => {
    if (div.scrollHeight - (div.scrollTop + div.clientHeight) <= 0) {
      div.scrollTop =
        div.scrollHeight -
        (div.scrollTop + div.clientHeight) +
        div.scrollTop -
        0.1;
    }
  };

  getMargin = gradient => {
    return gradient.height - gradient.initHeight - gradient.initHeight / 2;
  };

  componentDidUpdate() {
    this.validateScroll(this.refs.ul);
  }

  componentDidMount() {
    this.validateScroll(this.refs.ul);
  }

  render() {
    return (
      <ul ref="ul" onScroll={this.handleScroll}>
        {this.state.gradient ? (
          <div
            className="scroll-gradient scroll-gradient-bottom"
            style={{
              marginBottom: `${this.getMargin(this.state.gradientBottom)}px`
            }}
          />
        ) : null}
        {this.state.gradient ? (
          <div
            className="scroll-gradient scroll-gradient-top"
            style={{
              marginTop: `${-this.state.gradientTop.maxheight +
                this.getMargin(this.state.gradientTop)}px`
            }}
          />
        ) : null}
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
