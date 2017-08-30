// user styles

import Dimensions from 'Dimensions'; 
import Platform from 'Platform'; 

import StyleSheet from 'StyleSheet'; 
import YTColors from '../../global/styles/YTColors'; 

const IMAGE_HEIGHT = Dimensions.get('window').height * 0.5;
let screenWidth = Dimensions.get('window').width;

let userStyles = StyleSheet.create({
  bannerWrapper: {
    flex:1
    , padding: 20
    , justifyContent: 'flex-end'
  }
  , container: {
      flex: 1,
      backgroundColor: '#fff'
    }
  , editImage: {
      flex: 1, 
      alignItems: 'center',
      padding: 20, 
      justifyContent: 'center',
      // backgroundColor: '#5b5b5b'
      // backgroundColor: 'rgba(0,0,0,0.91)'
    }
  , forgotContainer: {
      alignItems: 'flex-end'
      , padding: 15
    }
  , header: {
      justifyContent: 'center'
      , alignItems: 'center'
      , paddingTop: Dimensions.get('window').height * 0.2
      , backgroundColor: 'transparent'
    }
  , img: {
      width: screenWidth
      , height: IMAGE_HEIGHT
      , backgroundColor: "transparent"
    }
  , inputWrapper: {
      // flex: 0.5,
      // backgroundColor: "#fff",
    }
  , inputContainer: {
      borderWidth: 1
      , borderColor: 'transparent'
      , marginTop: 14
    }
  , input: {
      height: 52
      , borderColor: YTColors.primaryHeader
      , flex: 1
      , fontSize: 17
      , padding: 8
      , backgroundColor: '#fff'
    }
  , instructions: {
      // fontStyle: 'italic', 
      fontSize: 12,
      color: YTColors.lightText,
      paddingVertical: 10,
      paddingHorizontal: 5
    }
  , infoWrapper: {
      flex: 1, 
      flexDirection: 'row', 
      paddingVertical: 5, 
      paddingHorizontal: 10
    }
  , labelBox: {
      flex: .2, 
      justifyContent: 'center',
      paddingLeft: 10,
    }
  , label: {
      fontSize: 15,
      fontWeight: '500', 
      // flex: .2,
    }
  , infoBox: {
      flex: .8, 
      justifyContent: 'center',
    }
  , info: {
      fontSize: 15,
      paddingVertical: 10,
    }
  , profilePic: {
      width: 275, 
      height: 275,
      backgroundColor: Platform.OS === 'ios' ? YTColors.listSeparator : null ,
      borderRadius: 275 * .5,
      // borderColor: '#ffd442',
      borderColor: YTColors.pridePurple,
      borderWidth: 4,
    }
  , text: {
      color: '#fff'
      , marginTop: 20
      , fontSize: 12
      , textAlign: 'center'
    }
  , welcome: {
      fontSize: 20
      , textAlign: 'center'
      , color: YTColors.darkText
      , margin: 10
    }

});