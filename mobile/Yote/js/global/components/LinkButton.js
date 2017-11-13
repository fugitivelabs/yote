import React from 'react';
import PropTypes from 'prop-types';

// import react-native components & apis
import {
  Image
  , StyleSheet
  , Text
  , TouchableOpacity
  , View
} from 'react-native'; 

// import styles
import YTColors from '../styles/YTColors';


const HEIGHT = 20;

var styles = StyleSheet.create({
  actionWrapper: {
    height: HEIGHT
  }
  , button: {
      flex: 1
      , alignItems: 'center'
      , justifyContent: 'center'
      , backgroundColor: 'transparent'
    }
  , caption: {
      letterSpacing: 1
      , fontSize: 13
      , fontWeight: '600'
      , color: YTColors.danger
    }
  , disabled: {
      backgroundColor: YTColors.disabledButton
    }
  , secondaryAction: {
      backgroundColor: YTColors.buttonSecondaryBG
    }
});

const LinkButton = ({ type, icon, caption, style, onPress, isDisabled }) => {
  
  caption = caption.toUpperCase();

  let btnIcon;
  if (icon) {
    btnIcon = <Image source={icon} style={styles.icon} />;
  }

  let disabled = isDisabled ? styles.disabled : null;

  if(isDisabled) {
    return (
      <View style={[styles.actionWrapper]}>
        <View style={[styles.button, styles.disabled]}>
          <Text style={[styles.caption]}>{caption}</Text>
        </View>
        <Image style={[styles.icon]} source={require('../img/forward.png')}/>
      </View>
    )
  } else {
    return (
      <View style={styles.actionWrapper}>
        <TouchableOpacity
          accessibilityTraits="button"
          onPress={onPress}
          activeOpacity={0.8}
          style={[styles.button, style]}>
          <Text style={[styles.caption]}>{caption}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default LinkButton;
