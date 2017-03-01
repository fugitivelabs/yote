// import react things
import React, { PropTypes } from 'react';
import Base from './BaseComponent';
import { connect } from 'react-redux';


// import react-native components
import StyleSheet from 'StyleSheet';
import View from 'View';
import Image from 'Image';
import Animated from 'Animated';

import YTColors from '../styles/YTColors';


var styles = StyleSheet.create({
  checkBox: {
    // flex: 1,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#11b9de'
  },
});


class CheckboxFilled extends Base {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }

  componentDidMount() {
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      {toValue: 1}            // Configuration
    ).start();                // Don't forget start!
  }

  render() {


    return (
      <Animated.Image
        style={[
          styles.checkbox,
          {
            opacity: this.state.fadeAnim,
            tintColor: YTColors.anagada,
          }
        ]}
        source={require('../img/star_filled.png')}
      />
    )
  }
}

export default CheckboxFilled;
