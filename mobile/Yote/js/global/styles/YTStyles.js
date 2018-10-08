import React, { PropTypes } from 'react';

import {
  Dimensions
  , Platform
  , StyleSheet
} from 'react-native'; 

// import theme
import theme from '../themes/default'; 
// import theme from '../themes/dark';
// import theme from '../themes/custom'; 

const { height, width } = Dimensions.get('window');

const FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'AvenirNextCondensed-DemiBold';

const YTStyles = StyleSheet.flatten({

  // layout
  brandContainer: {
    backgroundColor: theme.primary
    , flex: 1
  }
  , cell: {
      padding: 5
  }
  , container: {
      backgroundColor: theme.background
      , flex: 1
  }
  , icon: {
      height: 20
      , width: 20
  }
  , inputContainer: {
    borderWidth: Platform.OS == 'ios' ? 1 : 0
    , borderBottomColor: '#CCC'
    , borderColor: 'transparent'
    , marginTop: 14
  }
  , separator: {
      borderTopWidth: 1
      , borderColor: theme.separator
  }
  , shadow: {
      shadowColor: '#000000'
      , shadowOffset: { width: 0, height: 0 }
      , shadowOpacity: 0.2
      , shadowRadius: 4
  }
  , userImg: {
      borderRadius: 50 * .5
      , width: 50
      , height: 50
      , justifyContent: 'center'
  }

  // text
  , h1: {
      color: theme.mainText
      , fontFamily: FONT
      , fontSize: 30
      , fontWeight: '600'
    }
  , h2: {
      color: theme.mainText
      , fontFamily: FONT
      , fontSize: 25
      , fontWeight: '600'
  }
  , h2_secondary: {
      color: theme.secondary
        , fontFamily: FONT
        , fontSize: 25
        , fontWeight: '600'
  }
  , h3: {
      color: theme.mainText
      , fontFamily: FONT
      , fontSize: 20
      , fontWeight: '600'
  }
  , text: {
      color: theme.mainText
      , fontFamily: FONT
      , fontSize: 18
      , fontWeight: 'normal'
    }
  , accentText: {
      color: theme.mainText
      , fontFamily: FONT
      , fontSize: 18
      , fontWeight: 'normal'
    }
  , input: {
      minHeight: 40
      , color: theme.mainText
      , fontFamily: FONT
      , fontSize: 18
      , fontWeight: 'normal'
      , padding: 4
      , flex: 1
      , backgroundColor: theme.background
    }
  , label: {
      fontSize: 12
      , color: theme.lightText
      , marginBottom: 4
  }

  // colors
  , colors: {
      primary: theme.primary
      , secondary: theme.secondary
      , accent: theme.accent
      , header: theme.header
      , headerText: theme.headerText
      , separator: theme.separator
      , mainText: theme.mainText
      , accentText: theme.accentText
      , danger: theme.danger
      , success: theme.success
      , warning: theme.warning
  }
})

export default YTStyles; 