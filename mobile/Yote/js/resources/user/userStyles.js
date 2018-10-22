// user styles

// import react things
import {
  Dimensions
  , Platform
  , StyleSheet 
} from 'react-native'; 

import YTColors from '../../global/styles/YTColors'; 

const IMAGE_HEIGHT = Dimensions.get('window').height * 0.5;
const { height, width } = Dimensions.get('window');

const userStyles = StyleSheet.create({
  bannerWrapper: {
    flex:1
    , justifyContent: 'flex-end'
    , padding: 20
  }
  , container: {
      backgroundColor: '#fff'
      , flex: 1
  }
  , editImage: {
      alignItems: 'center'
      , flex: 1
      , justifyContent: 'center'
      , padding: 20 
  }
  , forgotContainer: {
      alignItems: 'flex-end'
      , padding: 15
  }
  , header: {
      alignItems: 'center'
      , backgroundColor: 'transparent'
      , justifyContent: 'center'
      , paddingTop: Dimensions.get('window').height * 0.2
  }
  , img: {
      backgroundColor: "transparent"
      , height: IMAGE_HEIGHT
      , width: width
  }
  , inputWrapper: {
      // flex: 0.5,
      // backgroundColor: "#fff",
  }
  , inputContainer: {
      borderColor: 'transparent'
      , borderWidth: 1
      , marginTop: 14
  }
  , input: {
      backgroundColor: '#fff'
      , borderColor: YTColors.primaryHeader
      , flex: 1
      , fontSize: 17
      , height: 52
      , padding: 8
  }
  , instructions: {
      color: YTColors.lightText
      , fontSize: 12
      , paddingVertical: 10
      , paddingHorizontal: 5
  }
  , infoWrapper: {
      flex: 1 
      , flexDirection: 'row' 
      , paddingVertical: 5 
      , paddingHorizontal: 10
  }
  , labelBox: {
      flex: .2
      , justifyContent: 'center'
      , paddingLeft: 10
  }
  , label: {
      fontSize: 15
      , fontWeight: '500' 
  }
  , infoBox: {
      flex: .8 
      , justifyContent: 'center'
  }
  , info: {
      fontSize: 15
      , paddingVertical: 10
  }
  , profilePic: {
      backgroundColor: Platform.OS === 'ios' ? YTColors.listSeparator : null 
      , borderColor: YTColors.pridePurple
      , borderRadius: 275 * .5
      , borderWidth: 4
      , height: 275
      , width: 275
  }
  , text: {
      color: '#fff'
      , fontSize: 12
      , marginTop: 20
      , textAlign: 'center'
  }
  , welcome: {
      color: YTColors.darkText
      , fontSize: 20
      , margin: 10
      , textAlign: 'center'
  }

});