// import react things
import React, { PropTypes } from 'react';
import Base from './BaseComponent';
import { connect } from 'react-redux';


// import react-native components
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


import YTButton from './YTButton';

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
    // paddingLeft: 4,

  },
  textInputWrapper: {
    flexDirection: "row",

    // backgroundColor: YTColors.listSeparator,
    // borderRadius: 6,

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
    // borderColor: YTColors.listSeparator,
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
    // paddingLeft: 8,
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
      newProductTitle: this.props.productTitle,
      isEditingTitle: false,
    }
    this._bind(
      '_focusNew'
      , '_handleInputChange'
      , '_saveTitle'
    );
  }



  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps");
    if(nextProps.productTitle !== this.state.newProductTitle) {
      this.setState({newProductTitle: nextProps.productTitle});
    }
  }



  _handleInputChange(e, target) {
    var newProductTitle = e.nativeEvent.text;
    var isEditingTitle = this.props.product.title !== newProductTitle;
    this.props.handleInputChange(e, target);
    this.setState({
      newProductTitle,
      isEditingTitle,
    });
  }

  _saveTitle() {
    this.props.saveTitle();
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




  render() {

    const { productTitle } = this.props;
    // const { isActive } = this.state;

    return (
    <View
      style={[
        styles.inputWrapper
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
              ref="newProductData.title"

              autoFocus={true}
              isRequired={true}
              style={styles.input}
              placeholder="Product title..."
              placeholderTextColor={YTColors.lightText}
              autoCorrect={true}
              onChange={ (e) => this._handleInputChange(e, "newProductData.title") }
              returnKeyType="default"
              value={this.state.newProductTitle}

            />

          </View>



        </View>

      </View>
      <YTButton
        type={this.state.isEditingTitle ? "primary" : "secondary"}

        caption={"Save"}
        isDisabled={!this.state.isEditingTitle}
        onPress={this._saveTitle}
      />

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
