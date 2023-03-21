// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  // , ActivityIndicator
  // , Alert
  , Image
  // , ListView
  , Platform
  // , ScrollView
  // , StyleSheet
  , Text
  // , TextInput
  , TouchableOpacity
  , View
} from 'react-native';

// import libraries
import moment from 'moment';
// import { DateTime } from 'luxon'; 

// import global components
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';
// import YTHeader from '../../global/headers/YTHeader';

// import services

// import utils

// import styles
import tw from '../../../global/styles/tailwind/twrnc'; 

const DefaultStatelessComponent = ({}) => {
  return (
    <View>
    </View>
  )
}

DefaultStatelessComponent.propTypes = {
}

DefaultStatelessComponent.defaultProps = {
}

export default DefaultStatelessComponent;
