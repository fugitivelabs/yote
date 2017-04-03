import React, { PropTypes } from 'react';
import Dimensions from 'Dimensions';
import StyleSheet from 'StyleSheet';

// import colors
import YTColors from '../../global/styles/YTColors';


let screenWidth = Dimensions.get('window').width
const BUTTON_FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'AvenirNextCondensed-DemiBold';

var YTFormStyles = StyleSheet.create({

});

export default YTFormStyles;
