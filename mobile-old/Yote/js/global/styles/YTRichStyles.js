import React, { PropTypes } from 'react';
import StyleSheet from 'StyleSheet';
import Dimensions from 'Dimensions';
import Platform from 'Platform'; 
import YTColors from '../../global/styles/YTColors';
import common from './common'; 

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

var YTRichStyles = StyleSheet.flatten({
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  link: {
    textDecorationLine: 'underline',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  paragraph: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  unstyled: common.text,
  'header-one': {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 22,
  },
  'header-two': {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  'header-three': {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 19,
    marginBottom: 19,
  },
  'header-four': {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 21,
    marginBottom: 21,
  },
  'header-five': {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 22,
  },
  'header-six': {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 25,
  },
  'unordered-list-item': {
    fontSize: 14,
    fontWeight: 'normal',
    padding: 5,
  },
  'ordered-list-item': {
    fontSize: 14,
    fontWeight: 'normal',
    padding: 5,
  },
  'code-block': {
    backgroundColor: '#cecece',
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier New',
    padding: 16,
  },
  blockquote: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'italic',
    marginLeft: 16,
  },
})

export default YTRichStyles; 