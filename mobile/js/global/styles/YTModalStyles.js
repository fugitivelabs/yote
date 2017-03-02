import React, { PropTypes } from 'react';
import StyleSheet from 'StyleSheet';
import Dimensions from 'Dimensions';
import YTColors from '../../global/styles/YTColors';


let screenWidth = Dimensions.get('window').width

var YTModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // backgroundColor: '#139cff',
    backgroundColor: 'rgba(0,0,0,0.86)',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 30,
    left: 10,
  },
  modalCloseText: {
    color: "#FFF",
  },
  modalContent: {
    backgroundColor: "#fff",
    // flex: 0.4,
    padding: 4,
    minHeight: 205
  },
  modalHeader: {
    // flex: 1,
  },
  img: {
   alignItems: 'center',
   height: 200,
   width: 200,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fff', 
    padding: 20,
  },
  button: {
    padding: 10,
  }

});

export default YTModalStyles;
