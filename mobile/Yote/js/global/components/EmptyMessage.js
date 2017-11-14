// import react things
import React from 'react';
import PropTypes from 'prop-types';
import Base from './BaseComponent';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , ListView
  , Platform
  , StyleSheet
  , View
  , Text
  , Image
  , ScrollView
  , TouchableOpacity
} from 'react-native'; 

import moment from 'moment';

import YTColors from '../styles/YTColors'; 

var styles = StyleSheet.create({
  container: {
    flex: 1
    , backgroundColor: YTColors.lightBackground
  }
  , emptyMessage: {
      fontSize: 16
      , textAlign: 'center'
      , color: "#fff"
      , padding: 4
      , marginTop: 40
      , fontStyle: "italic"
      , color: YTColors.lightText
    }
});

const EmptyMessage = ({message}) => {
  return(
    <View style={styles.containter}>
      <Text style={styles.emptyMessage}> {message} </Text>
    </View>
  )
}

export default EmptyMessage; 