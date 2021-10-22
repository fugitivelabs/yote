import React from 'react';
import PropTypes from 'prop-types';

// Import tailwind with config
import tw from '../../global/styles/tailwind/twrnc'; 

// import react-native components & apis
import {
  Image
  , Platform
  , StyleSheet
  , Text
  , TouchableOpacity
  , View
} from 'react-native'; 

const YTButton = ({ type, icon, caption, buttonStyle, onPress, isDisabled, captionStyle }) => {
  let btnIcon;

  if (icon) {
    btnIcon = <Image source={icon} style={tw.style('mr-2', type === 'primary' && 'tintWhite', type != 'primary' && 'tintAccent')} />;
  }

  let content;

  if (type === 'primary' || type === undefined) {
    content = (
      <View
        style={[tw`flex-row items-center justify-center p-2 bg-red-500 rounded-full`, buttonStyle, tw.style(isDisabled && 'opacity-50') ]}>
        {btnIcon}
        <Text style={[tw`text-lg font-semibold text-white`, captionStyle]}>
          {caption}
        </Text>
      </View>
    );
  } else {
    content = (
      <View style={[tw`flex-row items-center justify-center p-2 border border-red-500 rounded-full`, tw.style(type === 'bordered' && 'border border-red-500'), buttonStyle, tw.style(isDisabled && 'opacity-50')]}>
        {btnIcon}
        <Text style={[tw`text-lg font-semibold text-red-500`, captionStyle]}>
          {caption}
        </Text>
      </View>
    );
  }

  if(isDisabled) {
    return (
      <View>{content}</View>
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
