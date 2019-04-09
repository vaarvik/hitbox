import React, { Component } from "react";
import { connect } from "react-redux";
import PlayerDetails from "./PlayerDetails";
import GradientTop from "./players-list/GradientTop";
import GradientBottom from "./players-list/GradientBottom";

class PlayersList extends Component {
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
    gradient: false //controls if the scroll gradients should appear
  };

  handleScroll = e => {
    const element = e.target;
    //new promise since setState is a async operation
    new Promise(resolve => {
      this.setBottomGradient(e);
      resolve();
    }).then(() => {
      this.setTopGradient(element);
    });
    //prevent bug when scroll hits bottom by not letting it hit bottom
    this.preventScrollBug(element);
  };

  changeGradientHeight = (gradient, newHeight) => {
    this.setState({
      ...this.state,
      [gradient]: {
        ...this.state[gradient],
        height: newHeight
      }
    });
  };

  setTopGradient = element => {
    const { initHeight, maxheight } = this.state.gradientTop;
    const { scrollTop } = element;

    //if the scroll is closing to bottom decrease the gradient height
    if (scrollTop >= initHeight && scrollTop < maxheight) {
      this.changeGradientHeight("gradientTop", scrollTop);
    }
  };

  setBottomGradient = e => {
    const { initHeight } = this.state.gradientBottom;
    const { scrollHeight, scrollTop, clientHeight } = e.target;

    if (scrollTop <= 0) {
      //keep gradient hidden as long as there is no scroll
      this.changeGradientHeight("gradientBottom", initHeight);
    } else if (scrollHeight - (scrollTop + clientHeight) <= initHeight) {
      //show gradient as long as the scroll position is less than init height
      this.changeGradientHeight(
        "gradientBottom",
        scrollHeight - (scrollTop + clientHeight)
      );
    }
    //if the scroll is not closing to bottom restore/keep the gradient height
    else {
      this.changeGradientHeight("gradientBottom", initHeight); //hide gradient
    }
  };

  validateScroll = e => {
    //check if there is a scrollbar
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
        <GradientTop
          margin={
            -this.state.gradientTop.maxheight +
            this.getMargin(this.state.gradientTop)
          }
          gradient={this.state.gradient}
        />
        <GradientBottom
          margin={this.getMargin(this.state.gradientBottom)}
          gradient={this.state.gradient}
        />
        {this.props.players.map(player => {
          return <PlayerDetails player={player} players={this.props.players} />;
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

export default connect(mapStateToProps)(PlayersList);
