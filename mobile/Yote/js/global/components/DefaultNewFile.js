// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , ListView
  , Platform
  , StyleSheet
  , Text
  , View
} from 'react-native';

import RNDraftJSRender from 'react-native-draftjs-render'; 

// import global components
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';
// import { DateTime } from 'luxon'; 

// import actions

// import styles
import YTColors from '../../../global/styles/YTColors';
import YTRichStyles from '../../../global/styles/YTRichStyles';

class DefaultNewFile extends Base {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    const { } = this.props;

    return (
      <View>
        
      </View>
    )
  }
}

const mapStoreToProps = (store) => {

  return {
    userStore: store.user
  }
}

export default connect(mapStoreToProps)(DefaultNewFile);