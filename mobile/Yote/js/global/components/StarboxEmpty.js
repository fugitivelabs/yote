// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Animated from 'Animated';
import Image from 'Image';
import StyleSheet from 'StyleSheet';
import View from 'View';

// import global components
import Base from './BaseComponent';

// import styles
import YTColors from '../styles/YTColors';

var styles = StyleSheet.create({
  checkBox: {
    flex: 0.1,
    , justifyContent: 'center'
    , alignItems: 'center'
  }
});

class CheckboxEmpty extends Base {
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
            tintColor: YTColors.lighterText,
          }
        ]}
        source={require('../img/star.png')}
      />
    )
  }
}

export default CheckboxEmpty;
