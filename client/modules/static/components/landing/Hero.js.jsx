// import primary libraries
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';

// import css modules
import landingStyles from './landingStyles.css';

/**
 * build a temporary component for each "cool thing"
 */
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
    let nextCoolThingIndex;
    if(coolThingIndex == coolThingsList.length - 1) {
      // last one, reset to 0
      nextCoolThingIndex = 0;
    } else {
      // setup the next cool thing
      nextCoolThingIndex = coolThingIndex + 1;
    }
    this.setState({
      secondsElapsed: secondsElapsed + 1
      , coolThing: coolThingsList[coolThingIndex]
      , coolThingIndex: nextCoolThingIndex
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
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionLeave={false}
      >
        <span
          styleName="cool-thing"
          key={this.state.coolThing}
        >
          {this.state.coolThing}
        </span>
      </ReactCSSTransitionGroup>
    )
  }
}

/**
 * build and export the landing page Hero banner
 */
class Hero extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div styleName="landingStyles.hero" className="hero">
        <div className="yt-container">
          <img src="/img/howler.png" />
          <h1 styleName="h1">This is Yote</h1>
          <h2 styleName="h2">
            <TheCoolThing />
          </h2>
          <p> You can use it to make cool stuff </p>
        </div>
      </div>
    )
  }
};

export default Hero;
