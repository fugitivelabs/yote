import React, { PropTypes } from 'react';

// import react-native components & apis
import Image from 'Image';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import styles
import YTColors from '../styles/YTColors';

const HEIGHT = 80;

var styles = StyleSheet.create({
  actionWrapper: {
    height: HEIGHT,
  }
  , button: {
      flex: 1
      , alignItems: 'center'
      , justifyContent: 'center'
      , paddingHorizontal: 40
      , backgroundColor: YTColors.danger
    }
  , caption: {
      letterSpacing: 1
      , fontSize: 16
      , fontWeight: '600'
      , color: '#fff'
    }
  , disabled: {
      backgroundColor: YTColors.disabledButton
    }
  , secondaryAction: {
      backgroundColor: YTColors.buttonSecondaryBG
    }
});

const FinishButton = ({ type, icon, caption, style, onPress, isDisabled }) => {
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


export default FinishButton;
