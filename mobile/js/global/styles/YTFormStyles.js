import React, { PropTypes } from 'react';
import StyleSheet from 'StyleSheet';
import Dimensions from 'Dimensions';
import YTColors from '../../global/styles/YTColors';


let screenWidth = Dimensions.get('window').width

var YTFormStyles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    backgroundColor: YTColors.lightBackground,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: YTColors.listSeparator,
    // borderColor: 'red',
    // backgroundColor: 'pink',
  },
  input: {
    // flex: 1,
    height: 52,
    fontSize: 17,
    paddingTop: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',

  },
  numberInput: {
    textAlign: 'center',
  },
  inlineInput: {
    flexDirection: "row",
    // height: 80,
  },
  quarterInput: {
    flex: 0.25,
    // flexDirection: "column",
  },
  halfInput: {
    flex: 0.5
  },
  notes: {
    height: 64,
  },
  label: {
    fontSize: 12,
    // marginTop: 4,
    color: YTColors.lightText,
  },
});

export default YTFormStyles;
