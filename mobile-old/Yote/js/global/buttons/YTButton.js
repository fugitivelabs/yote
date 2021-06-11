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
import YTStyles from '../styles/YTStyles';

const BUTTON_FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'AvenirNextCondensed-DemiBold';
const HEIGHT = 50;

var styles = StyleSheet.create({
  button: {
    flex: 1
    , flexDirection: 'row'
    , alignItems: 'center'
    , justifyContent: 'center'
    , paddingHorizontal: 40
  }
  , border: {
      borderWidth: 1
      , borderColor: YTStyles.colors.accentText
      , borderRadius: HEIGHT / 2
    }
  , caption: {
      letterSpacing: 1
      , fontSize: 15
      , fontWeight: '600'
      , fontFamily: BUTTON_FONT
    }
  , container: {
      height: HEIGHT
    }
  , disabled: {
      opacity: 0.7
    }
  , icon: {
      marginRight: 12
    }
  , primaryButton: {
      borderRadius: HEIGHT / 2
      , backgroundColor: YTStyles.colors.primary
    }
  , primaryCaption: {
      color: '#fff'
    }
  , secondaryCaption: {
      color: YTStyles.colors.accent
    }
});

const YTButton = ({ type, icon, caption, buttonStyle, onPress, isDisabled, captionStyle }) => {
  caption = caption.toUpperCase();

  let btnIcon;
  let iconTint = type === 'primary' ? {tintColor: "#fff"} : {tintColor: YTStyles.colors.accentText} ;

  if (icon) {
    btnIcon = <Image source={icon} style={[styles.icon, iconTint]} />;
  }

  let content;
  let disabled = isDisabled ? styles.disabled : null;
  if (type === 'primary' || type === undefined) {
    content = (
      <View
        style={[styles.button, styles.primaryButton, buttonStyle, disabled, ]}>
        {btnIcon}
        <Text style={[styles.caption, styles.primaryCaption, captionStyle]}>
          {caption}
        </Text>
      </View>
    );
  } else {
    var border = type === 'bordered' && styles.border;
    content = (
      <View style={[styles.button, border, buttonStyle, disabled]}>
        {btnIcon}
        <Text style={[styles.caption, styles.secondaryCaption, captionStyle]}>
          {caption}
        </Text>
      </View>
    );
  }

  if(isDisabled) {
    return (
      <View style={[styles.container]}>{content}</View>
    )
  } else {

    return (
      <TouchableOpacity
        accessibilityTraits="button"
        onPress={onPress}
        activeOpacity={0.8}
        style={[styles.container]}>
        {content}
      </TouchableOpacity>
    )
  }
}


export default YTButton;
