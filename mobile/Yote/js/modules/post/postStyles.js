import React, { PropTypes } from 'react';
import StyleSheet from 'StyleSheet';
import Dimensions from 'Dimensions';
import YTColors from '../../global/styles/YTColors';

const BUTTON_HEIGHT = 32;

const IMAGE_SIZE = 40;

const FILTER_HEIGHT = 0;

let screenWidth = Dimensions.get('window').width;

var postStyles = StyleSheet.create({
  container: {
    flexGrow: 1
    // , paddingBottom: 50
    // , backgroundColor: '#572d66'
    , backgroundColor: '#fff'
  },
  separator: {
    flexGrow: 1,
    backgroundColor: YTColors.listSeparator,
    height: 3,
  },
  caption: {
    fontSize: 12,
    color: YTColors.lightText,
    padding: 20,
  },
  imageStyle: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE * 0.5,
  },
  cell: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
  },
  comment: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    flex: 0.5,
    justifyContent: 'space-between', 

  },
  input: {
    height: 80,
    fontSize: 17,
    padding: 4,
    // paddingBottom: 8,
    backgroundColor: YTColors.listSeparator,
    // backgroundColor: 'green',
  },
  header: {
    fontSize: 16,
    textAlign: 'center',
    color: "#fff",
    padding: 4,
    color: YTColors.darkText,
  },
  content: {
    color: YTColors.darkText,
    textAlign: 'left',
    paddingVertical: 10, 
    paddingHorizontal: 20,
    fontSize: 17,
  },
  created: {
    color: YTColors.darkText,
    textAlign: 'left',
    padding: 10,
    fontSize: 15,
  },
  
  details: {
    textAlign: 'left',
    fontWeight: '500',
    flex: 1,
    fontSize: 17,
    padding: 8,
    //backgroundColor: 'rgba(255,255,255,0.7)'
  },
  postFooter: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addComment: {
    flex: 1, 

  },
  postUser: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 8,
  },

});

export default postStyles; 