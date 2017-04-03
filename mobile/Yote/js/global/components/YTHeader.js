

// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TouchableHighlight from 'TouchableHighlight';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import global components
import Base from './BaseComponent';

// import Styles
import YTColors from '../styles/YTColors';


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;
const IMAGE_SIZE = 30;
var styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT
  }
  , toolbar: {
      height: HEADER_HEIGHT - STATUS_BAR_HEIGHT
    }
  , imageStyle: {
      height: IMAGE_SIZE
      , width: IMAGE_SIZE
      , borderRadius: IMAGE_SIZE * 0.5
    }
  , iconStyle: {
      height: IMAGE_SIZE
      , width: IMAGE_SIZE
    }
  , header: {
      backgroundColor: YTColors.primaryHeader
      , paddingTop: STATUS_BAR_HEIGHT
      , borderBottomWidth: 1
      , borderColor: YTColors.listSeparator
      , height: HEADER_HEIGHT
      , flexDirection: 'row'
      , justifyContent: 'space-between'
      , alignItems: 'center'
    }
  , titleText: {
      color: YTColors.primaryHeaderText
      , fontWeight: 'bold'
      , fontSize: 20
    }
  , leftItem: {
      flex: 1
      , alignItems: 'flex-start'
    }
  , centerItem: {
      flex: 2
      , alignItems: 'center'
    }
  , rightItem: {
      flex: 1
      , alignItems: 'flex-end'
    }
  , itemWrapper: {
      padding: 8
    }
  , itemText: {
      letterSpacing: 1
      , fontSize: 12
      , color: 'white'
    }
});

class ItemWrapperIOS extends React.Component {
  props: {
    item: Item;
    color: string;
  };

  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }

    let content;
    const {title, icon, layout, onPress, image} = item;
    // console.log("(((((((((((((((((( ICON  ))))))))))))))))))");
    // console.log(icon);
    if ((layout !== 'icon' || layout !== 'image')  && title) {
      content = (
        <Text style={[styles.itemText, {color}]}>
          {title.toUpperCase()}
        </Text>
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


class YTHeader extends Base {
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


    let itemsColor = YTColors.darkText;
    let headerBackground;
    let titleStyle;
    if(headerStyle) {
      itemsColor = headerStyle.itemsColor;
      headerBackground = headerStyle.background;
      titleStyle = headerStyle.title;
    }

    return(
      <View
        style={[styles.header, headerBackground]}
      >
        <View style={styles.leftItem}>
          <ItemWrapperIOS
            item={leftItem}
            color={itemsColor}
          />

        </View>
        <View
          accessible={true}
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={[styles.centerItem]}
        >
          <Text style={[styles.titleText, titleStyle]}> {title} </Text>
        </View>
        <View style={styles.rightItem}>
          <ItemWrapperIOS
            item={rightItem}
            color={itemsColor}
          />
        </View>
      </View>
    )
  }
}

YTHeader.propTypes = {
  dispatch: PropTypes.func
  , title: PropTypes.string
  // , leftAction: PropTypes.func
}

const mapStateToProps = (state) => {
  // console.log(state);
  // const { filter } = state.showing.list;

  return {
    // filter: filter
  }
}

export default connect(
  mapStateToProps
)(YTHeader);
