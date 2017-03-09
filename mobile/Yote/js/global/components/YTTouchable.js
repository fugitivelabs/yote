import React, { PropTypes } from 'react';
import Base from './BaseComponent';
import TouchableHighlight from 'TouchableHighlight';
import TouchableOpacity from 'TouchableOpacity';
import Platform from 'Platform';


import YTColors from '../styles/YTColors';

class YTTouchableIOS extends Base {
  constructor(props) {
    super(props);
  }
  render() {
    const props = this.props;
    return (
      <TouchableHighlight
        accessibilityTraits="button"
        underlayColor={YTColors.underlayColor}
        {...props}
      />
    )
  }
}

const YTTouchable = Platform.OS === 'android'
  ? TouchableOpacity
  : YTTouchableIOS;

export default YTTouchable;
