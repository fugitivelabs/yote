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

// import Styles
import YTStyles from '../styles/YTStyles'; 
import { tailwind } from '../styles/tailwind/tailwind';

const STATUS_BAR_HEIGHT = Platform.OS == 'android' ? 20 : 35; 
const HEADER_HEIGHT = STATUS_BAR_HEIGHT + 20;
const FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'Avenir';

// const isDemo = env.type == ("demo" || "staging"); // allows red demo banner on all header views, leaving out for now
const isDemo = false;

var styles = StyleSheet.create({
  statusBarHeight: {
    minHeight: STATUS_BAR_HEIGHT
  }
  , header: {
      borderBottomWidth: isDemo ? 0 : 1
      , height: HEADER_HEIGHT
      , paddingBottom: Platform.OS == 'ios' ? 0 : 15
    }
  , iconStyle: {
      tintColor: YTStyles.colors.headerText
    }
  , titleText: {
      fontFamily: FONT
    }
  , toolbar: {
      height: HEADER_HEIGHT - STATUS_BAR_HEIGHT
    }
  , toolbarContainer: {
      paddingTop: STATUS_BAR_HEIGHT
    }
});

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
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={[tailwind('text-blue-50 font-base'), {color}]}>{title.charAt(0).toUpperCase() + title.slice(1)}</Text>
          {subText ?
            <Text style={[tailwind('text-blue-50 font-base'), {color: color}]}>{subText}</Text>
          : null
          }
        </View>
      );
    } else if (layout === 'image' && image) {
      content = <Image
        source={image}
        resizeMode={"cover"}
        style={tailwind('w-4 h-4')}
        />;
    } else if (icon) {
      content = <Image source={icon} resizeMode="contain" style={tailwind('w-4 h-4')}/>;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={tailwind('px-2')}>
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
        <View style={[tailwind('bg-blue-500'), styles.statusBarHeight]}></View>
        <View style={[tailwind('flex-row items-center justify-between bg-blue-500 w-full relative'), styles.header, headerBackground]}>
          <View style={tailwind('flex-row items-start w-1/4')}>
            <ItemWrapperIOS
              item={leftItem}
              color={titleColor}
            />
          </View>
          <View
            accessible={true}
            accessibilityLabel={title}
            accessibilityTraits="header"
            style={tailwind('w-1/2')}
          >
            <Text numberOfLines={1} style={[tailwind('text-xl text-blue-50 font-bold text-center'), styles.titleText, titleStyle]}>{title}</Text>
          </View>
          <View style={tailwind('flex-row items-end w-1/4')}>
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
