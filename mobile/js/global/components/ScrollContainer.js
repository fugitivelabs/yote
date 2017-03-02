// import react things
import React, { PropTypes } from 'react';
// import Base from './BaseComponent';
// import { connect } from 'react-redux';


// import react-native components
import StyleSheet from 'StyleSheet';
import ScrollView from 'ScrollView';

// import styles
import YTColors from '../styles/YTColors';


var styles = StyleSheet.create({

  scrollContainer: {
    flex: 1,
    backgroundColor: YTColors.lightBackground,
    // borderColor: 'green',
    // borderWidth: 3,
  },
  contentContainer: {
    // flex: 1,
    justifyContent: 'flex-start',
    // borderColor: 'blue',
    // borderWidth: 3,
    marginTop: -20, //-  hacky way to fix extra padding on scroll container. this is incredibly stupid and needs to be figured out.

  }

});


const ScrollContainer = ({children}) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.scrollContainer]} keyboardDismissMode="interactive">
      {children}
    </ScrollView>
  )
}

export default ScrollContainer;
