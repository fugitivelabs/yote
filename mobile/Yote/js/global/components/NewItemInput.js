// import react things
import React, { PropTypes } from 'react';
import Base from './BaseComponent';
import { connect } from 'react-redux';


// import react-native components
import ListView from 'ListView';
import Dimensions from 'Dimensions';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';
import Image from 'Image';
import ScrollView from 'ScrollView';
import TouchableOpacity from 'TouchableOpacity';
import TextInput from 'TextInput';
import Animated from 'Animated';

// import custom components


import CheckboxEmpty from './CheckboxEmpty';
import CheckboxFilled from './CheckboxFilled';

// import libraries
import moment from 'moment';
import _ from 'lodash';



// import styles
import YTColors from '../styles/YTColors';

const BUTTON_HEIGHT = 32;

var styles = StyleSheet.create({
  inputWrapper: {
    // paddingLeft: 4,
    // paddingRight:4,
    backgroundColor: "#fff"
  },
  instructions: {
    color: YTColors.lightText,
    marginBottom: 5,
  },
  details: {
    // height: 52,
    flex: 1,
    // paddingTop: 8,
    // paddingBottom: 8,

  },
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT * 0.5,
    // paddingHorizontal: 40,
  },
  icon: {
    marginBottom: 8,
    tintColor: YTColors.actionText,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 14,
    color: YTColors.lightText,
  },
  input: {
    height: 52,
    flex: 1,
    fontSize: 17,
    paddingLeft: 4,

  },
  textInputWrapper: {
    flexDirection: "row",

    backgroundColor: YTColors.listSeparator,
    borderRadius: 6,

  },
  notes: {
    height: 104,
  },
  inlineInput: {
    flexDirection: "row",
  },
  quarterInput: {
    flex: 0.25
  },
  checkBoxInputCell: {
    flexDirection: 'row',
    // paddingTop: 4,
    // paddingBottom: 4,
    // borderTopWidth: 1,
    // backgroundColor: "#fff",
    borderColor: YTColors.listSeparator,
  },
  checkBox: {
    // flex: 1,
    flex: 0.1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#11b9de'

  },
  checkBoxTextWrapper: {
    justifyContent: 'center',
    // paddingVertical: 15,
    paddingLeft: 8,
    // paddingRight: 9,
    flex: 1,
    // flexDirection: "row"
  },


});



// const NewItemInput = ({ item, onPress }) => {
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
      // console.log("on focus called ", refName);
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
    // this._triggerFadeOut();
    // setTimeout(() => this.props.onPress(this.props.item), 750)
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
    // const { isActive } = this.state;

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
    <View
      style={[
        styles.inputWrapper,
        selectedBackgroundStyle,
      ]}
    >
      <View
        style={[
          styles.checkBoxInputCell,
        ]}
      >


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
//
//
// transform: [{
//   translateY: this.state.fadeAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [ 150, 0]
//   }),
// }],


// STAR IN INPUT
//
// <TouchableOpacity
//   accessibilityTraits={accessibilityTraits}
//   activeOpacity={0.8}
//   onPress={this._toggleImportance}
//   style={[styles.checkBox]}>
//   <Image source={starImage} style={[styles.plusSign, starStyle]} />
// </TouchableOpacity>

// PLUS SIGN
//
// <TouchableOpacity
//   accessibilityTraits={accessibilityTraits}
//   activeOpacity={0.8}
//   onPress={this._focusNew}
//   style={[styles.checkBox]}>
//   <Image source={require('../img/plus.png')} style={[styles.plusSign, {tintColor: YTColors.lighterText}]} />
// </TouchableOpacity>
