// user styles

import Dimensions from 'Dimensions'; 
import Platform from 'Platform'; 

import StyleSheet from 'StyleSheet'; 
import YTColors from '../../global/styles/YTColors'; 

const IMAGE_HEIGHT = Dimensions.get('window').height * 0.5;
let screenWidth = Dimensions.get('window').width;

let styles = StyleSheet.create({
  bannerWrapper: {
    flex:1
    , padding: 20
    , justifyContent: 'flex-end'
  }
  , container: {
      flex: 1
      , backgroundColor: '#C20032'
      , justifyContent: "center"
      , flexDirection: 'column'
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
  , label: {
      fontSize: 12
      , color: '#fff'
      , marginBottom: 4
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