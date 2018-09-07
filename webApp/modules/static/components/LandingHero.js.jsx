// import primary libraries
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

// import css modules
import landingStyles from '../landingStyles.css';


//build and export the landing page Hero banner
class Hero extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div styleName="landingStyles.hero" className="hero">
        <div className="yt-container">
          <h1>RŌMR</h1>
          <p> A new way to discover and access private land for recreation. </p>
        </div>
      </div>
    )
  }
};

export default Hero;
