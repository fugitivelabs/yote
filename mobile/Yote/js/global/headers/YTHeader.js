// import react things
import React from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , ListView
  , Platform
  , StyleSheet
  , Text
  , TouchableOpacity
  , View
} from 'react-native'; 

import env from '../../env'; 

// import global components
import Binder from '../Binder';

// Import tailwind with config
import tw from '../styles/tailwind/twrnc'; 

// import Styles
import YTStyles from '../styles/YTStyles'; 

class ItemWrapperIOS extends React.Component {

  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }

    let content;
    const {title, icon, layout, onPress, image, subText} = item;
    if ((layout !== 'icon' || layout !== 'image')  && title) {
      content = (
        <View style={tw`flex-1 justify-center`}>
          <Text style={[tw`text-white font-base`, {color}]}>{title.charAt(0).toUpperCase() + title.slice(1)}</Text>
          {subText ?
            <Text style={[tw`text-white font-base`, {color: color}]}>{subText}</Text>
          : null
          }
        </View>
      );
    } else if (layout === 'image' && image) {
      content = <Image
        source={image}
        resizeMode={"cover"}
        style={tw`w-4 h-4`}
        />;
    } else if (icon) {
      content = <Image source={icon} resizeMode="contain" style={tw`w-4 h-4`}/>;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={tw`px-2`}>
        {content}
      </TouchableOpacity>
    );
  }
}

class YTHeader extends Binder {
  constructor(props) {
    super(props);
    this.state;
    this._bind(
      '_handleLeftAction'
      , '_handleRightAction'
    );
  }

  _handleLeftAction() {
    console.log("_handleLeftAction");
  }

  _handleRightAction() {
    console.log("_handleRightAction");
  }

  render() {
    const { title, leftItem, rightItem, headerStyle } = this.props;

    const titleColor = 'white';

    let itemsColor = YTStyles.colors.headerText;
    let headerBackground;
    let titleStyle;
    if(headerStyle) {
      itemsColor = headerStyle.itemsColor;
      headerBackground = headerStyle.background;
      titleStyle = headerStyle.title;
    }

    return(
      <View>
        <View style={tw.style('bg-red-500', { 'iosStatusBarHeight': Platform.OS != 'android' }, { 'androidStatusBarHeight': Platform.OS == 'android'})}></View>
        <View style={tw.style(`flex-row items-center justify-between bg-red-500 w-full relative`, { 'iosHeaderHeight': Platform.OS != 'android' }, { 'androidHeaderHeight': Platform.OS == 'android'}, headerBackground)}>
          <View style={tw`flex-row items-start w-1/4`}>
            <ItemWrapperIOS
              item={leftItem}
              color={titleColor}
            />
          </View>
          <View
            accessible={true}
            accessibilityLabel={title}
            accessibilityTraits="header"
            style={tw`w-1/2`}
          >
            <Text numberOfLines={1} style={[tw`text-xl text-white font-bold text-center`, titleStyle]}> {title} </Text>
          </View>
          <View style={tw`flex-row items-end w-1/4`}>
            <ItemWrapperIOS
              item={rightItem}
              color={titleColor}
            />
          </View>
        </View>
        {/* { isDemo ? 
          <View style={[styles.demoHeader]}>
            <Text style={{flex: 1, textAlign: 'center', color: YTStyles.colors.white}}>Note: This is a demo version of the app.</Text>
          </View>
        : null
        } */}
      </View>
    )
  }
}

YTHeader.propTypes = {
  dispatch: PropTypes.func
  , title: PropTypes.string
}

const mapStateToProps = (state) => {

  return {

  }
}

export default connect(
  mapStateToProps
)(YTHeader);
