import React from 'react';
import PropTypes from 'prop-types';
import TouchableHighlight from 'TouchableHighlight';
import TouchableOpacity from 'TouchableOpacity';
import Platform from 'Platform';

// import global components
import Base from './BaseComponent';

// import styles
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
