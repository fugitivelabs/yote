// var React = require('react/addons');
import React from 'react';

import { Link } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var coolThings = [ "products", "tools", "art", "experiments", "cool things", "apps"];

class TheCoolThing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      secondsElapsed: 0
      , coolThing: "apps"
      , coolThingIndex: 0
      , coolThingsList : [ "products", "tools", "art", "experiments", "cool things", "apps"]

    };
  }
  tick() {
    console.log("check", React.Children.count(this.refs.test));

    if(this.state.coolThingIndex == coolThings.length - 1) {
      var coolThingIndex = 0;
    } else {
      var coolThingIndex = this.state.coolThingIndex + 1;
    }
    console.log(this.state);
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
      , coolThing: coolThings[this.state.coolThingIndex]
      , coolThingIndex: coolThingIndex
    });

  }
  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 2200);
  }

  componentWillUnmount() {

  }

  // componentDidUnmount(){
  //   console.log("unmounted");
  // }
  render() {
    return(
      <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionLeave={false}>
        <Link to="work" className="cool-thing" key={this.state.coolThing}>
          <span>  {this.state.coolThing} </span>
        </Link>
      </ReactCSSTransitionGroup>
    )
  }
}


class Hero extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      secondsElapsed: 0
      , coolThing: "apps"
      , coolThingIndex: 0
      , coolThingsList : [ "products", "tools", "art", "experiments", "cool things", "apps"]

    };
  }

  render(){
    return (
      <div className="hero">
        <div className="yt-container">
          <h1> We make
            <TheCoolThing />
            <br />
            for web and mobile
          </h1>
        </div>
      </div>
    )
  }
};

export default Hero;
