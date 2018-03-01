import React, { PropTypes } from 'react';

import {
  Dimensions
  , Platform
  , StyleSheet
} from 'react-native'; 

// colors
import YTColors from '../../global/styles/YTColors';

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

const common = StyleSheet.flatten({
  cell: {
    padding: 5
  }
  , container: {
      backgroundColor: '#fff'
      , flex: 1
  }
  , header: {
      color: YTColors.darkText
      , fontSize: 30
      , fontWeight: '600'
    }
  , header2: {
      color: YTColors.darkText
      , fontSize: 20
      , fontWeight: '600'
      , paddingHorizontal: 5
  }
  , icon: {
      height: 20
      , width: 20
  }
  , input: {
      minHeight: 40
      , fontSize: 15
      , padding: 4
      , flex: 1
      , backgroundColor: '#fff'
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
  , subHeader: {
      color: YTColors.lightText
      , fontSize: 18
      , fontWeight: '600'
      , padding: 5
    }
  , text: {
      fontSize: 18,
      fontWeight: 'normal',
      color: YTColors.lightText
    }
  , userImg: {
      borderRadius: 50 * .5
      , width: 50
      , height: 50
      , justifyContent: 'center'
  }
})

export default common; 