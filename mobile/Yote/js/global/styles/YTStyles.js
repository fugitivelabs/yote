import React, { PropTypes } from 'react';

import {
  Dimensions
  , Platform
  , StyleSheet
} from 'react-native'; 

// colors
import YTColors from '../../global/styles/YTColors';

const { height, width } = Dimensions.get('window');

const FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'AvenirNextCondensed-DemiBold';

const YTStyles = StyleSheet.flatten({
  cell: {
    padding: 5
  }
  , container: {
      backgroundColor: '#fff'
      , flex: 1
  }
  , darkText: {
      color: YTColors.darkText
      , fontFamily: FONT
      , fontSize: 18
      , fontWeight: 'normal'
    }
  , h1: {
      color: YTColors.darkText
      , fontFamily: FONT
      , fontSize: 30
      , fontWeight: '600'
    }
  , h2: {
      color: YTColors.darkText
      , fontFamily: FONT
      , fontSize: 25
      , fontWeight: '600'
  }
  , h3: {
      color: YTColors.darkText
      , fontFamily: FONT
      , fontSize: 20
      , fontWeight: '600'
  }
  , icon: {
      height: 20
      , width: 20
  }
  , input: {
      minHeight: 40
      , fontFamily: FONT
      , fontSize: 18
      , fontWeight: 'normal'
      , padding: 4
      , flex: 1
      , backgroundColor: '#fff'
    }
  , inputContainer: {
    // padding: 10,
    borderWidth: Platform.OS == 'ios' ? 1 : 0
    , borderBottomColor: '#CCC'
    , borderColor: 'transparent'
    , marginTop: 14
  }
  , label: {
      fontSize: 12
      , color: YTColors.lightText
      , marginBottom: 4
  }
  , separator: {
      borderTopWidth: 1
      , borderColor: YTColors.listSeparator
  }
  , shadow: {
      shadowColor: '#000000'
      , shadowOffset: { width: 0, height: 0 }
      , shadowOpacity: 0.2
      , shadowRadius: 4
  }
  , text: {
      color: YTColors.lightText
      , fontFamily: FONT
      , fontSize: 18
      , fontWeight: 'normal'
    }
  , userImg: {
      borderRadius: 50 * .5
      , width: 50
      , height: 50
      , justifyContent: 'center'
  }
})

export default YTStyles; 