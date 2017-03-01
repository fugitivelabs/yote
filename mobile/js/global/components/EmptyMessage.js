// import react things
import React, { PropTypes } from 'react';
import Base from './BaseComponent';
import { connect } from 'react-redux';


// import react-native components
import ListView from 'ListView';
import Dimensions from 'Dimensions';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';
import Image from 'Image';
import ScrollView from 'ScrollView';
import TouchableOpacity from 'TouchableOpacity';

import moment from 'moment';

import YTColors from '../styles/YTColors'; 

var styles = StyleSheet.create({
  container: {
    flex: 1
    // , paddingBottom: 50
    // , backgroundColor: '#572d66'
    , backgroundColor: '#fff'
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: "#fff",
    padding: 4,
    marginTop: 40,
    fontStyle: "italic",
    color: YTColors.lightText,
  },
});

const EmptyMessage = ({message}) => {
  return(
    <View style={styles.containter}>
      <Text style={styles.emptyMessage}> {message} </Text>
    </View>
  )
}

export default EmptyMessage; 