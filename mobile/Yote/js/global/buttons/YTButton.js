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
import { tailwind } from '../styles/tailwind/tailwind'; 

const BUTTON_FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'AvenirNextCondensed-DemiBold';

var styles = StyleSheet.create({

});

const YTButton = ({ type, icon, caption, buttonStyle, onPress, isDisabled, captionStyle }) => {
  caption = caption.toUpperCase();

  let btnIcon;
  let iconTint = type === 'primary' ? {tintColor: "#fff"} : {tintColor: YTStyles.colors.accentText} ;

  if (icon) {
    btnIcon = <Image source={icon} style={[tailwind('mr-2'), iconTint]} />;
  }

  let content;
  let disabled = isDisabled ? styles.disabled : null;
  if (type === 'primary' || type === undefined) {
    content = (
      <View
        style={[tailwind('flex-row items-center justify-center p-2 bg-blue-500 rounded-full'), buttonStyle, disabled, ]}>
        {btnIcon}
        <Text style={[tailwind('text-lg font-semibold text-blue-50'), captionStyle]}>
          {caption}
        </Text>
      </View>
    );
  } else {
    var border = type === 'bordered' && styles.border;
    content = (
      <View style={[tailwind('flex-row items-center justify-center p-2 border border-blue-800 rounded-full'), buttonStyle, disabled]}>
        {btnIcon}
        <Text style={[tailwind('text-lg font-semibold text-blue-800'), captionStyle]}>
          {caption}
        </Text>
      </View>
    );
  }

  if(isDisabled) {
    return (
      <View style={tailwind('opacity-70')}>{content}</View>
    )
  } else {

    return (
      <TouchableOpacity
        accessibilityTraits="button"
        onPress={onPress}
        activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    )
  }
}


export default YTButton;
