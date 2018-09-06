// import react things
import React from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';

// import react-native components
import {
  Animated
  , Dimensions
  , Image
  , Platform
  , StyleSheet
  , Text
  , TouchableOpacity
  , View
} from 'react-native'; 

// import global components
import Base from './BaseComponent';
import ProgressiveImage from './ProgressiveImage';

// import Styles
import YTColors from '../styles/YTColors';

const { width, height } = Dimensions.get('window'); 

// const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' && Dimensions.get('window').height === 812) ? 30 : 20;
const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' && Dimensions.get('window').height === 812) ? 30 : Platform.OS === 'android' ? 10 : 20;
const HEADER_MAX_HEIGHT = height / 2.5;
const HEADER_MIN_HEIGHT = (Platform.OS === 'ios' && Dimensions.get('window').height === 812) ? 70 : 44 + STATUS_BAR_HEIGHT;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'AvenirNextCondensed-DemiBold';

var styles = StyleSheet.create({
  backgroundImage: {
      position: 'absolute'
      , top: 0
      , left: 0
      , right: 0
      , width: null
      , height: HEADER_MAX_HEIGHT
      // , resizeMode: 'cover'
      , backgroundColor: YTColors.lightBackground
  }
  , bar: {
      marginTop: STATUS_BAR_HEIGHT
      , height: 40
      , justifyContent: 'center'
  }
  , coolHeader: {
      position: 'absolute'
      , justifyContent: 'center'
      , top: 0
      , left: 0
      , right: 0
      , backgroundColor: YTColors.sofleteYellow
      , overflow: 'hidden'
  }
});

class AnimatedHeader extends Base {
  constructor(props) {
    super(props);
    this.state = {
      width: width
    }
    this._bind(
      '_onLayout'
    )
  }

  _onLayout(e) {
    this.setState({width: e.nativeEvent.layout.width});
  }

  render() {
    const { color, image, leftItem, rightItem, otherItem, scrollY, titleItem, headerMaxHeight, placeholder } = this.props; 

    let headerHeight; 
    let HEADER_SCROLL_DISTANCE;
    if (headerMaxHeight) {
      HEADER_SCROLL_DISTANCE = headerMaxHeight - HEADER_MIN_HEIGHT;
      headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [headerMaxHeight, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
      });
    } else {
      HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
      headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
      }); 
    }

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const titleOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    /** place AFTER ScrollView with these props:
     *  <ScrollView scrollEventThrottle={16} onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}>
     *  ...
     *  </ScollView>
     */

    return (
      <Animated.View onLayout={(e) => this._onLayout(e)} style={{position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: color ? color : YTColors.sofleteYellow, overflow: 'hidden', height: headerHeight}}>
        <Animated.View
          style={[styles.backgroundImage,
            {height: headerMaxHeight ? headerMaxHeight : HEADER_MAX_HEIGHT, opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
          ]}>
          <ProgressiveImage
            source={image}
            placeholder={placeholder}
            style={{height: headerMaxHeight ? headerMaxHeight : HEADER_MAX_HEIGHT, width: this.state.width}}
          />
        </Animated.View>
        <Animated.View>
          <View style={[styles.bar, {flexDirection: 'row'}]}>
            <View style={{flex: 0.2, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <View style={{justifyContent: 'center'}}>
                {leftItem && leftItem.visible ? 
                  <TouchableOpacity onPress={leftItem.onPress}>
                    <View style={{padding: 10}}>
                      <Image
                        style={{height: 25, width: 25, tintColor: '#fff'}}
                        source={leftItem.icon}
                      />
                    </View>
                  </TouchableOpacity>
                : 
                  null
                }
              </View>
            </View>
            <View style={{flex: 1}}>
            {titleItem && titleItem.visible ? 
              <View style={{flex: 0.8, backgroundColor: 'transparent'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                  <View style={{justifyContent: 'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 20, color: '#fff', fontWeight: '600'}}>{titleItem.title}</Text>
                  </View>
                </View>
              </View>
            : null 
            }
            </View>
            <View style={{flex: 0.2, flexDirection: 'row'}}>
              { rightItem && rightItem.visible ?
                <View style={{justifyContent: 'flex-end'}}>
                  { otherItem && otherItem.visible ?
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                      <View style={{justifyContent: 'center'}}>
                        <TouchableOpacity onPress={otherItem.onPress}>
                          <View>
                            <Image
                              style={{height: 25, width: 25, tintColor: '#fff'}}
                              source={otherItem.icon}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  : null
                  }
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <View style={{justifyContent: 'center'}}>
                      <TouchableOpacity onPress={rightItem.onPress}>
                        <View style={{padding: 10}}>
                          <Image
                            style={{height: 25, width: 25, tintColor: rightItem.color ? rightItem.color : '#fff'}}
                            source={rightItem.icon}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              : 
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <View style={{justifyContent: 'center', padding: 10}}>
                    <View style={{height: 25, width: 25}}>
                    </View>
                  </View>
                </View>
              }
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    )
  }
}

AnimatedHeader.propTypes = {
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => {

  return {

  }
}

export default connect(
  mapStateToProps
)(AnimatedHeader);
