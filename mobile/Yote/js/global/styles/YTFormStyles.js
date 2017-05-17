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
  , halfInput: {
      flex: 0.5
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
  , label: {
      fontSize: 12
      , color: YTColors.lightText
    }
  , inlineInput: {
      flexDirection: "row"
    }
  , notes: {
      height: 64
    }
  , numberInput: {
      textAlign: 'center'
    }
  , quarterInput: {
      flex: 0.25
    }
  
});

export default YTFormStyles;
