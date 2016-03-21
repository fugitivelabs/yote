
import React from 'react';

import { Link } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TheCoolThing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      secondsElapsed: 0
      , coolThing: "apps"
      , coolThingIndex: 0
      , coolThingsList : [ "blogs", "dashboards",  "experiments", "products", "art", "apps"]
    };
  }

  tick() {
    var { coolThing, coolThingIndex, coolThingsList, secondsElapsed } = this.state;
    if(coolThingIndex == coolThingsList.length - 1) {
      var newCoolThingIndex = 0;
    } else {
      var newCoolThingIndex = coolThingIndex + 1;
    }
    this.setState({
      secondsElapsed: secondsElapsed + 1
      , coolThing: coolThingsList[coolThingIndex]
      , coolThingIndex: newCoolThingIndex
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 2200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return(
      <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionLeave={false}
      >
        <span className="cool-thing" key={this.state.coolThing}>
          {this.state.coolThing}
        </span>

      </ReactCSSTransitionGroup>
    )
  }
}


class Hero extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    return (
      <div className="hero main">
        <div className="yt-container">
          <h1>This is Yote</h1>
          <h2>
            <TheCoolThing />
          </h2>
          <p> You can use it to make cool stuff </p>
        </div>
      </div>
    )
  }
};

export default Hero;
