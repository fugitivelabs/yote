import React, { PropTypes } from 'react';


// import react-native components & apis
import View from 'View';
import Text from 'Text';
import StyleSheet from 'StyleSheet';
import TouchableOpacity from 'TouchableOpacity';
import Image from 'Image';

// import styles
import YTColors from '../styles/YTColors';


const HEIGHT = 80;

var styles = StyleSheet.create({
  actionWrapper: {
    height: HEIGHT,
    // justifyContent: 'center',
    // alignItems: 'center',
    //paddingHorizontal: 8,
    //backgroundColor: '#fff'

  },

  button: {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: YTColors.danger,
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
