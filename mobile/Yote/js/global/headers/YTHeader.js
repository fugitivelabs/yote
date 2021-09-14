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

const STATUS_BAR_HEIGHT = Platform.OS == 'android' ? 20 : 35; 
const HEADER_HEIGHT = STATUS_BAR_HEIGHT + 20;
const IMAGE_SIZE = 25;
const FONT = Platform.OS === 'android' ? 'sans-serif-condensed' : 'Avenir';

// const isDemo = env.type == ("demo" || "staging"); // allows red demo banner on all header views, leaving out for now
const isDemo = false; 

var styles = StyleSheet.create({
  centerItem: {
    flex: .5
    , alignItems: 'center'
  }
  , statusBar: {
    minHeight: STATUS_BAR_HEIGHT
    , backgroundColor: YTStyles.colors.primary
  }
  , header: {
      alignItems: 'center'
      , backgroundColor: YTStyles.colors.primary
      , borderBottomWidth: isDemo ? 0 : 1
      , borderColor: YTStyles.colors.separator
      , flexDirection: 'row'
      , height: HEADER_HEIGHT
      , justifyContent: 'space-between'
      , paddingBottom: Platform.OS == 'ios' ? 0 : 15
    }
  , demoHeader: {
    alignItems: 'center'
      , backgroundColor: YTStyles.colors.danger
      , borderBottomWidth: 1
      , borderColor: YTStyles.colors.danger
      , flexDirection: 'row'
      , height: 30
      , justifyContent: 'space-between'
      // , paddingTop: Platform.OS == 'ios' ? STATUS_BAR_HEIGHT : 0
  }
  , iconStyle: {
      height: IMAGE_SIZE
      , width: IMAGE_SIZE
      , tintColor: YTStyles.colors.headerText
      // , marginTop: 10
    }
  , imageStyle: {
      height: IMAGE_SIZE
      , width: IMAGE_SIZE
      , borderRadius: IMAGE_SIZE * 0.5
    }
  , itemText: {
      color: 'white'
      , fontSize: 12
      , letterSpacing: 1
      // , flex: 1
    }
  , itemWrapper: {
      padding: 8
    }
  , leftItem: {
      alignItems: 'flex-start'
      , flex: .25
    }
  , rightItem: {
      alignItems: 'flex-end'
      , flex: .25
    }
  , titleText: {
      color: YTStyles.colors.headerText
      , fontFamily: FONT
      , fontSize: 20
      , fontWeight: '700'
      // , marginTop: 10
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
          <Text style={[styles.itemText, {color}]}>{title.charAt(0).toUpperCase() + title.slice(1)}</Text>
          {subText ?
            <Text style={[styles.itemText, {color: color}]}>{subText}</Text>
          : null
          }
        </View>
      );
    } else if (layout === 'image' && image) {
      content = <Image
        source={image}
        resizeMode={"cover"}
        style={styles.imageStyle}
        />;
    } else if (icon) {
      content = <Image source={icon} resizeMode="contain" style={styles.iconStyle}/>;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
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
        <View style={[styles.statusBar, headerBackground]}></View>
        <View style={[styles.header, headerBackground]}>
          <View style={styles.leftItem}>
            <ItemWrapperIOS
              item={leftItem}
              color={titleColor}
            />
          </View>
          <View
            accessible={true}
            accessibilityLabel={title}
            accessibilityTraits="header"
            style={[styles.centerItem]}
          >
            <Text numberOfLines={1} style={[styles.titleText, titleStyle]}> {title} </Text>
          </View>
          <View style={styles.rightItem}>
            <ItemWrapperIOS
              item={rightItem}
              color={titleColor}
            />
          </View>
        </View>
        { isDemo ? 
          <View style={[styles.demoHeader]}>
            <Text style={{flex: 1, textAlign: 'center', color: YTStyles.colors.white}}>Note: This is a demo version of the Flip Factory app.</Text>
          </View>
        : null
        }
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
