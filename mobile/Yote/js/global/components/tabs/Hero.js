// import primary libraries
import React, { PropTypes } from 'react';
import View from 'View';
import Text from 'Text'; 

import Base from '../../../global/components/BaseComponent';
import YTColors from '../../../global/styles/YTColors'; 

/**
 * build a temporary component for each "cool thing"
 */
class TheCoolThing extends Base {
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
    // console.log(this.state.coolThing); 
    return(
        <Text
          style={{color: YTColors.yoteGreen, fontSize: 25, textAlign: 'center'}}
          key={this.state.coolThing}
        >
          {this.state.coolThing}
        </Text>
    )
  }
}

/**
 * build and export the landing page Hero banner
 */
class Hero extends Base {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={{flex: 1}}>
        
          <Text style={{fontSize: 20, textAlign: 'center', color: '#fff', padding: 10, fontWeight: '500'}}> This is Yote </Text> 
          <TheCoolThing />
          <Text style={{fontSize: 15, textAlign: 'center', color: '#fff', padding: 10}}> You can use it to make cool stuff </Text>
        
      </View>
    )
  }
};

export default Hero;
