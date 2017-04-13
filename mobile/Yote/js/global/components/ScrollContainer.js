// import react things
import React, { PropTypes } from 'react';

// import react-native components
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';

// import styles
import YTColors from '../styles/YTColors';

var styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-start'
    , marginTop: -20 //-  hacky way to fix extra padding on scroll container. this is incredibly stupid and needs to be figured out.
  }
  , scrollContainer: {
      flex: 1
      , backgroundColor: YTColors.lightBackground
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
