// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import appKeys from '../../../app.json'; 

// import react-native components
import {
  View
  , Text
} from 'react-native'; 

// import global components
import Binder from '../Binder';

// Import tailwind with config
import tw from '../styles/tailwind/twrnc'; 

/**
 * build a temporary component for each "cool thing"
 */

class TheCoolThing extends Binder {
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
      <Text style={tw`text-center text-white text-2xl`} key={this.state.coolThing}>
        {this.state.coolThing}
      </Text>
    )
  }
}

/**
 * build and export the landing page Hero banner
 */
class Hero extends Binder {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={tw`flex flex-col`}>
          <Text style={tw`text-4xl text-center font-semibold p-4`}>Yote </Text> 
          <TheCoolThing />
          <Text style={tw`text-lg text-center p-4`}>Yote is the best super-stack solution out there for any data driven application.</Text>
      </View>
    )
  }
};

export default Hero;
