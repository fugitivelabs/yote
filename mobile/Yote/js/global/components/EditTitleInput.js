// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Animated from 'Animated';
import Dimensions from 'Dimensions';
import Image from 'Image';
import Platform from 'Platform';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import global components
import Base from './BaseComponent';
import YTButton from './YTButton';

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
    }
  , checkBox: {
      flex: 0.1
      , justifyContent: 'center'
    }
  , checkBoxTextWrapper: {
      justifyContent: 'center'
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
  , inputWrapper: {
      backgroundColor: "#fff"
    }
  , instructions: {
      color: YTColors.lightText
      , marginBottom: 5
    }
  , input: {
      height: 52
      , flex: 1
      , fontSize: 17
    }
  , notes: {
      height: 104
    }
  , quarterInput: {
      flex: 0.25
    }
  , textInputWrapper: {
      flexDirection: "row"
    }
});

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
  }

  render() {
    const { productTitle } = this.props;
    return (
      <View style={[styles.inputWrapper]}>
        <View style={[styles.checkBoxInputCell]}>
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