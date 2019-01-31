// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Animated
  , Dimensions
  , Image
  , ListView
  , Platform
  , StyleSheet
  , Text
  , View
} from 'react-native';

import Base from './BaseComponent';

import YTColors from '../styles/YTColors';

// progressive loading image given a smaller placeholder is available
class ProgressiveImage extends Base {
  constructor(props){
    super(props);
    this.state = {
      loaded: false
      , imageOpacity: this.props.placeholder 
        ? new Animated.Value(1.0) 
        : new Animated.Value(0.0)
      , placeholderOpacity: new Animated.Value(1.0)
    }
    this._bind(
      '_onLoad'
      // , '_onThumbnailLoad'
    )
  }

  // _onThumbnailLoad() {
  //   Animated.timing(this.state.placeholderOpacity, {
  //     toValue: 0.9, 
  //     duration: 250
  //   }).start(); 
  // }
  
  // _onLoad() {
  //   Animated.timing(this.state.placeholderOpacity, {
  //     toValue: 0
  //     , duration: 250
  //   }).start();
  // }

  _onLoad() {
    const { imageOpacity } = this.state; 
    Animated.sequence([
      Animated.timing(imageOpacity, {
        toValue: 1.0,
        delay: 200,
        duration: 800,
        useNativeDriver: true
      })
    ]).start(() => {
      this.setState(() => ({ loaded: true }))
    })
  }

  render() {
    const { source, style, placeholder } = this.props; 
    const { loaded, imageOpacity, placeholderOpacity } = this.state;

    color = '#DDDDDD'; 

    return (
      <View>
        {(placeholder && !loaded) &&
          <Animated.Image
            source={placeholder}
            blurRadius={1}
            resizeMode={'cover'}
            style={[
              style,
              {
                opacity: placeholderOpacity,
                backgroundColor: color,
                position: 'absolute',
                // resizeMode: 'cover',
                alignSelf: 'stretch'
              }
            ]} />
        }
        {(!placeholder && !loaded) &&
          <Animated.View
            style={[
              style,
              {
                backgroundColor: color,
                opacity: placeholderOpacity,
                position: 'absolute',
              }
            ]} />
        }
        <Animated.Image
          source={source}
          resizeMode={'cover'}
          onLoad={this._onLoad}
          style={[
            style,
            {
              position: 'absolute'
              , resizeMode: 'cover'
              , opacity: imageOpacity
            }
          ]}
        />
      </View>
    )
  }
}

export default ProgressiveImage; 