// import primary libraries
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

// import css modules

// build a temporary component for each "cool thing"
const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={{
     enter: 300,
     exit: 500,
    }}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

//build and export the landing page Hero banner
class Hero extends React.Component{
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

  render(){
    return (
      <div styleName="landingStyles.hero" className="hero">
        <div className="yt-container">
          <img src="/img/howler.png" />
          <h1 styleName="h1">This is Yote</h1>
          <h2 styleName="h2">
            <TransitionGroup
              exit={false}
            >
              <Fade  key={this.state.coolThing}>
                <span
                  styleName="cool-thing"
                >
                  {this.state.coolThing}
                </span>
              </Fade>
            </TransitionGroup>
          </h2>
          <p> You can use it to make cool stuff </p>
        </div>
      </div>
    )
  }
};

export default Hero;
