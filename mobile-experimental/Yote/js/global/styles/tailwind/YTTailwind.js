import React, { PropTypes } from 'react';

import {
  Dimensions
  , Platform
  , StyleSheet
} from 'react-native'; 

// import theme
import theme from './themes/default'; 
// import theme from '../themes/custom'; 

import { tailwind, getColor } from './styles/tailwind'; 

const { height, width } = Dimensions.get('window');

const FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'AvenirNextCondensed-DemiBold';

const YTStyles = StyleSheet.flatten({

  // layout
  brandContainer: tailwind(`flex-1 bg-blue-500`)
  , cell: tailwind('px-5 py-5')
  , container: tailwind('flex-1 bg-white')
  , logo: tailwind('w-60 h-60')
  , icon: tailwind('w-20 h-20')
  , inputContainer: tailwind('border-b border-transparent border-gray-100 m-10')
  , separator: tailwind('border-t border-gray-100')
  , userImg: tailwind('h-40 w-40 rounded-full justify-center')
  , horizCenter: tailwind('justify-center items-center')

  // text
  , h1: tailwind('text-4xl font-semibold text-black')
  , h2: tailwind('text-3xl font-semibold text-black')
  , h3: tailwind('text-2xl font-semibold text-black')
  , h3_secondary: tailwind('text-2xl font-semibold text-yellow-500')
  , h4: tailwind('text-xl font-semibold text-black')
  , h5: tailwind('text-lg font-semibold text-black')
  , text: tailwind('text-base font-normal text-black')
  , subText: tailwind('text-sm font-normal text-gray-300')
  , linkText: tailwind('text-base font-normal text-blue-500')
  , input: tailwind('text-base font-normal text-black p-5')
  , label: tailwind('text-sm font-normal text-gray-400')

  // colors
  , colors: {
      accent: theme.accent
      , subText: theme.subText
      , danger: theme.danger
      , header: theme.header
      , headerText: theme.headerText
      , mainText: theme.mainText
      , primary: theme.primary
      , secondary: theme.secondary
      , separator: theme.separator
      , success: theme.success
      , underlay: theme.underlay
      , warning: theme.warning
  }
})

export default YTStyles; 