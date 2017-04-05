// import react things
import React, { PropTypes } from 'react';
import Dimensions from 'Dimensions';
import StyleSheet from 'StyleSheet';

// import colors
import YTColors from '../../global/styles/YTColors';


let screenWidth = Dimensions.get('window').width

let YTFormStyles = StyleSheet.create({
  formWrapper: {
    flex: 1
    , backgroundColor: YTColors.lightBackground
  }
  , inputContainer: {
      borderTopWidth: 1
      , borderColor: YTColors.listSeparator
    }
  , input: {
      height: 52
      , fontSize: 17
      , paddingTop: 8
      , backgroundColor: 'rgba(255,255,255,0.7)'
    }
  , numberInput: {
      textAlign: 'center'
    }
  , inlineInput: {
      flexDirection: "row"
    }
  , quarterInput: {
      flex: 0.25
    }
  , halfInput: {
      flex: 0.5
    }
  , notes: {
      height: 64
    }
  , label: {
      fontSize: 12
      , color: YTColors.lightText
    }
});

export default YTFormStyles;
