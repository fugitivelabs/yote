/**
* Action Button is a squared button that fills the view
*/

// import react 
import React, { PropTypes } from 'react';

// import react-native components & apis
import Image from 'Image';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import styles
import YTColors from '../styles/YTColors';

const BUTTON_FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'AvenirNextCondensed-DemiBold';

const HEIGHT = 80;

var styles = StyleSheet.create({
  actionWrapper: {
    height: HEIGHT,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 2,
    //paddingHorizontal: 8,
    //backgroundColor: '#fff'

  },

  button: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#12B3F5',
  },
  disabled: {
    backgroundColor: YTColors.disabledButton,
  },
  secondaryAction: {
    backgroundColor: YTColors.buttonSecondaryBG,

  },
  caption: {
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    fontFamily: BUTTON_FONT,
  }
});

const ActionButton = ({ type, icon, caption, style, onPress, isDisabled }) => {
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
          <Text style={[styles.caption]}>{caption}</Text>

        </TouchableOpacity>
      </View>
    )
  }
}


export default ActionButton;
