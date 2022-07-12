import React from 'react';
import PropTypes from 'prop-types';

// Import tailwind with config
import tw from '../../global/styles/tailwind/twrnc'; 

// import react-native components & apis
import {
  Image
  , Platform
  , Text
  , TouchableOpacity
  , TouchableHighlight
  , View
} from 'react-native'; 

const YTButton = ({ type, icon, caption, buttonStyle, onPress, isDisabled, captionStyle, color }) => {
  let btnIcon;

  if (icon) {
    btnIcon = <Image source={icon} style={tw.style('mr-2', type === 'primary' && 'tintWhite', type != 'primary' && 'tintAccent')} />;
  }

  if (type === 'primary' || type === undefined) {
    return (
      <TouchableOpacity
        accessibilityTraits="button"
        disabled={isDisabled}
        onPress={onPress}
        activeOpacity={0.8}>
        <View
          style={[tw`flex-row items-center justify-center p-2 bg-${color ? color : 'red'}-700 rounded-full`, buttonStyle, tw.style(isDisabled && 'opacity-50') ]}>
          {btnIcon}
          <Text style={[tw`text-base font-semibold text-white`, captionStyle]}>
            {caption}
          </Text>
        </View>
        </TouchableOpacity>
    );
  } else {
    // secondary has lighter background and bordered and should darken on press 
    return (
      <TouchableHighlight
        accessibilityTraits="button"
        disabled={isDisabled}
        onPress={onPress}
        style={tw`rounded-full`}
        underlayColor={'#000000'}
        // activeOpacity={0.8}
      >
        <View 
          style={[tw`flex-row items-center justify-center p-2 bg-${color ? color : 'red'}-200 border border-${color ? color : 'red'}-700 rounded-full`, buttonStyle, tw.style(isDisabled && 'opacity-50')]}>
          {btnIcon}
          <Text style={[tw`text-base font-semibold text-${color ? color : 'red'}-700`, captionStyle]}>
            {caption}
          </Text>
        </View>
        </TouchableHighlight>
    );
  }
}


export default YTButton;
