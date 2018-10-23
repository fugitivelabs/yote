/**
 * Will create a new product from information in the TextInputs
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import react-native components
import {
  Alert
  , Image
  , KeyboardAvoidingView
  , Platform
  , ScrollView
  , StyleSheet
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native'; 

// import global components
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as productActions from '../productActions'

// import styles
import YTStyles from '../../../global/styles/YTStyles'; 

class CreateProduct extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false
      , newProduct: { ...this.props.defaultProduct }
    }
    this._bind(
      '_goBack'
      , '_handleAction'
      , '_handleInputChange'
      , '_checkFormValid'
    )
  }

  componentDidMount() {
    this.refs['newProduct.title'].focus();
  }

  _checkFormValid() {

    var requiredInputs = Object.keys(this.refs).filter((ref) => this.refs[ref].props.isRequired);

    var isValid = true;
    for(var i = 0; i < requiredInputs.length; i++) {

      var theVal = _.get(this.state, requiredInputs[i]);
      if(!theVal || theVal.length < 1) {
        isValid = false;
      }
    }

    this.setState({isFormValid: isValid});
  }

  _handleAction() {
    console.log("_handleAction create fired");

    const { dispatch, user } = this.props;
    const { newProduct } = this.state;

    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "All fields are required.");
      return;
    }
    
    dispatch(productActions.sendCreateProduct(newProduct)).then((res) => {
      dispatch(productActions.addProductToList(res.item._id));
      this.props.navigation.goBack();
    });
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  _handleInputChange(e, target) {
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text;
    });
    this.setState(newState);
    this._checkFormValid();
  }

  _scrollToInput(e, refName) {
    setTimeout(() => {
      var scrollResponder = this.refs.myScrollView.getScrollResponder();
      // var scrollResponder = scrollView.getScrollRef();
      var offset = 130;
      // console.log(offset);
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ReactNative.findNodeHandle(this.refs[refName]),
        offset, // adjust depending on your contentInset
        /* preventNegativeScrollOffset */ true
        // false
      );
    }, 150);
  }

  render() {

    const { navigator, isFetching } = this.props;
    const { newProduct, isFormValid } = this.state;

    const rightItem = {
      title: 'Cancel',
      onPress: this._goBack
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : null}
        contentContainerStyle={{flex: 1}}
        style={YTStyles.container}
      >
        <YTHeader
          rightItem={rightItem}
          title="New Product"
        />
        <ScrollView ref="myScrollView" keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" style={[YTStyles.formWrapper]}>
          <View>
            <View style={{padding: 5}}>
              <TextInput
                autoCorrect={true}
                isRequired={true}
                onFocus={ (e) => this._scrollToInput(e, 'newProduct.title')}
                onChange={ (e) => this._handleInputChange(e, "newProduct.title") }
                onSubmitEditing={(event) => {
                  this.refs['newProduct.description'].focus();
                }}
                placeholder="Title"
                placeholderTextColor={YTStyles.colors.accentText}
                ref="newProduct.title"
                returnKeyType="next"
                style={YTStyles.input}
                value={this.state.newProduct.title}
              />
            </View>
            <View style={YTStyles.separator}/>
            <View style={{padding: 5}}>
              <TextInput
                autoCorrect={true}
                isRequired={true}
                multiline={true}
                onChange={ (e) => this._handleInputChange(e, "newProduct.description")}
                onFocus={ (e) => this._scrollToInput(e, 'newProduct.description')}
                onSubmitEditing={this._handleAction}
                placeholder="Write a description..."
                placeholderTextColor={YTStyles.colors.accentText}
                returnKeyType="go"
                ref="newProduct.description"
                style={[YTStyles.input, {minHeight: 90}]}
                value={this.state.newProduct.description}
              />
            </View>
            <View style={YTStyles.separator}/>
          </View>
          <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
            <YTButton
              caption={isFetching ? "Creating..." : "Create new product"}
              isDisabled={!isFormValid}
              onPress={this._handleAction}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}


const mapStoreToProps = (store) => {

  return {
    defaultProduct: store.product.defaultItem
    , isFetching: store.product.selected.isFetching
    , user: store.user.loggedIn.user
  }
}

export default connect(mapStoreToProps)(CreateProduct);