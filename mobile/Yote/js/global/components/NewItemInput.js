// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Animated from 'Animated';
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import global components
import Base from './BaseComponent';
import CheckboxEmpty from './CheckboxEmpty';
import CheckboxFilled from './CheckboxFilled';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import styles
import YTColors from '../styles/YTColors';

const BUTTON_HEIGHT = 32;

var styles = StyleSheet.create({
  button: {
    flex: 1
    , flexDirection: 'column'
    , alignItems: 'center'
    , justifyContent: 'center'
    , paddingVertical: 12
    , height: BUTTON_HEIGHT
    , borderRadius: BUTTON_HEIGHT * 0.5
  }
  , caption: {
      letterSpacing: 1
      , fontSize: 14
      , color: YTColors.lightText
    }
  , checkBoxInputCell: {
      flexDirection: 'row'
      , borderColor: YTColors.listSeparator
    }
  , checkBox: {
      flex: 0.1
      , justifyContent: 'center'
    }
  , checkBoxTextWrapper: {
      justifyContent: 'center'
      , paddingLeft: 8
      , flex: 1
    }
  , details: {
      flex: 1
    }
  , icon: {
      marginBottom: 8
      , tintColor: YTColors.actionText
    }
  , inlineInput: {
      flexDirection: "row"
    }
  , input: {
      height: 52
      , flex: 1
      , fontSize: 17
      , paddingLeft: 4
    }
  , inputWrapper: {
      backgroundColor: "#fff"
    }
  , instructions: {
      color: YTColors.lightText
      , marginBottom: 5
    }
  , notes: {
      height: 104
    }
  , quarterInput: {
      flex: 0.25
    }
  , textInputWrapper: {
      flexDirection: "row"
      , backgroundColor: YTColors.listSeparator
      , borderRadius: 6
    }
});

class NewItemInput extends Base {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
      isFocused: false,
      newItem: {
        text: "",
        isEssential: false,
        isImportant: false,
        followups: [],
        dueDate: null,
        reminderDate: null,
      },
    }
    this._bind(
      '_focusNew'
      , '_addItem'
      , '_openItemSettings'
      , '_handleInputChange'
      , '_toggleImportance'
    );
  }

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps");

  }

  _scrollToInput(e, refName) {
    setTimeout(() => {
      this.props.scrollResponder;
      var scrollResponder = scrollView.getScrollRef();
      console.log(this.refs[refName].props.returnKeyType);
      var offset = 130;
      console.log(offset);
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ReactNative.findNodeHandle(this.refs[refName]),
        offset, // adjust depending on your contentInset
        /* preventNegativeScrollOffset */ true
        // false
      );
    }, 150);
  }

  _handleInputChange(e, target) {
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text;
    });
    console.log("input changed");
    this.setState(newState);
  }

  _focusNew() {
    console.log('press');
    if(this.state.isFocused && this.state.newItem.text.length > 0) {
      this._addItem();
    } else {
      this.refs['newItem.text'].focus();
    }
    this.setState({isFocused: !this.state.isFocused});
  }

  _toggleImportance() {
    let { newItem } = this.state;
    newItem.isImportant = !newItem.isImportant;
    this.setState({newItem});
  }

  _openItemSettings() {
    console.log("open settings");
  }

  _addItem() {
    console.log("add new item");
    const { newItem } = this.state;
    this.props.addItem(newItem);
    this.setState({
      newItem: {
          text: "",
          isEssential: false,
          isImportant: false,
          followups: [],
          dueDate: null,
          reminderDate: null,
      }
    });
  }

  render() {
    const { checklist } = this.props;

    let selectedCaptionStyle;
    let selectedBackgroundStyle;
    let selectedEssentialStyle;
    let isActive = this.state.newItem.text.length > 0 ? true : false;

    var accessibilityTraits = ['button'];
    let starStyle = {tintColor: YTColors.lighterText}
    let starImage = require('../img/star.png');
    if(this.state.newItem.isImportant) {
      starStyle = {tintColor: YTColors.anagada};
      starImage = require('../img/star_filled.png');
    }

    return (
    <View style={[styles.inputWrapper, selectedBackgroundStyle]}>
      <View style={[styles.checkBoxInputCell]}>
        <View style={styles.checkBoxTextWrapper}>
          <View style={styles.textInputWrapper}>
            <TextInput
              ref="newItem.text"
              isRequired={true}
              style={styles.input}
              placeholder="+ Add a new item..."
              placeholderTextColor={YTColors.lightText}
              autoCorrect={true}
              onChange={ (e) => this._handleInputChange(e, "newItem.text") }
              returnKeyType="default"
              value={this.state.newItem.text}
              onSubmitEditing={this._addItem}
            />
          </View>
        </View>
      </View>
    </View>
    )
  }
}

export default NewItemInput;
