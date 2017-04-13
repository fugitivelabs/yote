
// import react things
import React, { PropTypes } from 'react';
import Dimensions from 'Dimensions';
import StyleSheet from 'StyleSheet';

// import colors
import YTColors from '../../global/styles/YTColors';

let screenWidth = Dimensions.get('window').width

let YTModalStyles = StyleSheet.create({
  button: {
      padding: 10
    }
  , modalContainer: {
      flex: 1
      , backgroundColor: 'rgba(0,0,0,0.86)'
      , justifyContent: 'center'
      , paddingHorizontal: 10
      , paddingTop: 20
    }
  , modalCloseButton: {
      position: 'absolute'
      , backgroundColor: 'transparent'
      , top: 30
      , left: 10
    }
  , modalCloseText: {
      color: "#FFF"
    }
  , modalContent: {
      backgroundColor: "#fff"
      , padding: 4
      , minHeight: 205
    }
  , modalHeader: {

    }
  , img: {
     alignItems: 'center'
     , height: 200
     , width: 200
    }
  , modalText: {
      textAlign: 'center'
      , fontSize: 30
      , color: '#fff'
      , padding: 20
    }

});

export default YTModalStyles;
