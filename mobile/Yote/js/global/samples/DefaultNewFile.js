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
  , TouchableOpacity
  , View
} from 'react-native';

// import global components
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';

// import libraries
import moment from 'moment';
// import { DateTime } from 'luxon'; 

// import actions

// import styles
import YTStyles from '../../../global/styles/YTStyles';

class DefaultNewFile extends Binder {
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