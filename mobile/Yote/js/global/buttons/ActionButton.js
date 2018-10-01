/**
* Action Button is a squared button that fills the view
*/

// import react 
import React from 'react';
import PropTypes from 'prop-types';

// import react-native components & apis
import {
  Image
  , Platform
  , StyleSheet
  , Text
  , TouchableOpacity
  , View
} from 'react-native'; 

// import styles
import YTColors from '../styles/YTColors';

const BUTTON_FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'AvenirNextCondensed-DemiBold';

const HEIGHT = 70;

let styles = StyleSheet.create({
  actionWrapper: {
    height: HEIGHT
  }
  , button: {
      flex: 1
      , alignItems: 'center'
      , justifyContent: 'center'
      , paddingHorizontal: 40
      , backgroundColor: YTColors.sofleteYellow
    }
  , disabled: {
      opacity: 0.7
      // backgroundColor: YTColors.disabledButton
    }
  , caption: {
      letterSpacing: 1
      , fontSize: 16
      , fontWeight: '600'
      , color: '#fff'
      , fontFamily: BUTTON_FONT
    }
  , secondaryAction: {
      backgroundColor: YTColors.buttonSecondaryBG
    }
});

const ActionButton = ({ type, icon, caption, style, onPress, isDisabled, captionStyle }) => {
  caption = caption.toUpperCase();


  let btnIcon;
  if (icon) {
    btnIcon = <Image source={icon} style={styles.icon} />;
  }

  let disabled = isDisabled ? styles.disabled : null;

  if(isDisabled) {
    return (
      <View style={[styles.actionWrapper]}>
        <View style={[styles.button, styles.disabled, style]}>
          <Text style={[styles.caption, captionStyle]}>{caption}</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View
        style={styles.actionWrapper}
      >
        <TouchableOpacity
          accessibilityTraits="button"
          onPress={onPress}
          activeOpacity={0.8}
          style={[styles.button, style]}>
          <Text style={[styles.caption, captionStyle]}>{caption}</Text>

        </TouchableOpacity>
      </View>
    )
  }
}


export default ActionButton;
