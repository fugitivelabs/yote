// import react things
import React, { PropTypes } from 'react';

// import react-native components
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import View from 'ScrollView';

// import styles
import YTColors from '../styles/YTColors';

var styles = StyleSheet.create({
  body: {
    backgroundColor: 'white'
    , padding: 8
  }
  , card: {
      backgroundColor: 'white'
    }
  , header: {
      fontSize: 16
      , textAlign: 'center'
      , color: "#fff"
      , padding: 4
      , backgroundColor: YTColors.actionText
    }
});

const YTCard = ({ header, children}) => {
  return (
    <View style={[styles.card]}>
      <Text style={styles.header}>{header}</Text>
      <View style={styles.body}>

        {children}
      </View>
    </View>
  )
}

export default YTCard;
