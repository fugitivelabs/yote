// user styles

import Dimensions from 'Dimensions'; 
import Platform from 'Platform'; 

import StyleSheet from 'StyleSheet'; 
import YTColors from '../../global/styles/YTColors'; 

const IMAGE_HEIGHT = Dimensions.get('window').height * 0.5;
let screenWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // , flexDirection: 'column'
    backgroundColor: '#C20032',
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 0.5,
    paddingTop: Dimensions.get('window').height * 0.2,
    backgroundColor: 'transparent'
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: YTColors.darkText,
    margin: 10,
  },
  inputWrapper: {
    // flex: 0.5,
    // backgroundColor: "#fff",
  },
  inputContainer: {
    // padding: 10,
    borderWidth: 1,
    // borderBottomColor: '#CCC',
    borderColor: 'transparent',
    marginTop: 14,
  },
  input: {
    height: 52,
    // borderWidth: 0.5,
    borderColor: YTColors.primaryHeader,
    flex: 1,
    fontSize: 17,
    padding: 8,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4
  },
  forgotContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
  text: {
    color: '#fff',
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center'
  },
  img: {
    width: screenWidth,
    height: IMAGE_HEIGHT,
    // borderWidth: 1,
    // borderColor: 'magenta',
    backgroundColor: "transparent",
  },
  bannerWrapper: {
    flex:1,

    // marginLeft: 12,
    padding: 20,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },

});