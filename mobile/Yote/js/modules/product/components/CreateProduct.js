/**
* Will create a new product from information in the TextInputs
*/

// import react things
import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import react-native components
import Image from 'Image';
import KeyboardAvoidingView from 'KeyboardAvoidingView'; 
import Platform from 'Platform';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';
import Alert from 'Alert'; 

// import global components
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as productActions from '../productActions'

// import styles
import productStyles from '../productStyles'; 
import YTColors from '../../../global/styles/YTColors';

class CreateProduct extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false
      , newProduct: {
        title: ""
        , description: ""
      }
    }
    this._bind(
      '_closeModal'
      , '_handleAction'
      , '_handleInputChange'
      , '_checkFormValid'
      , '_openLibrary'
    )
  }

  componentDidMount() {
    this.refs['newProduct.title'].focus();
    console.log(this.props.navigation); 
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
    console.log("_handleAction fired");

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

  _closeModal() {
    this.props.navigation.goBack(); 
  }

  _openLibrary() {
    this.refs['newProduct.title'].blur();
    this.props.navigator.push({library: true});
  }

  _handleInputChange(e, target) {
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text;
    });
    console.log("input changed");
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
      onPress: this._closeModal
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : null}
        style={{flex: 1, backgroundColor: '#fff'}}
        contentContainerStyle={{flex:1}}
      >
        <YTHeader
          title="New Product"
          rightItem={rightItem}
        />
        <ScrollView ref="myScrollView" keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" style={[productStyles.formWrapper]}>
          <View>
            <View style={{padding: 5}}>
              <TextInput
                ref="newProduct.title"
                onFocus={ (e) => this._scrollToInput(e, 'newProduct.title')}
                isRequired={true}
                style={productStyles.input}
                placeholder="Title"
                placeholderTextColor={YTColors.lightText}
                autoCorrect={true}
                onChange={ (e) => this._handleInputChange(e, "newProduct.title") }
                returnKeyType="next"
                value={this.state.newProduct.title}
                onSubmitEditing={(event) => {
                  this.refs['newProduct.description'].focus();
                }}
              />
            </View>
            <View style={productStyles.listSeparator}/>
            <View style={{padding: 5}}>
              <TextInput
                ref="newProduct.description"
                onFocus={ (e) => this._scrollToInput(e, 'newProduct.description')}
                multiline={true}
                isRequired={true}
                style={[productStyles.input, {minHeight: 90}]}
                placeholder="Write a description..."
                placeholderTextColor={YTColors.lightText}
                autoCorrect={true}
                onChange={ (e) => this._handleInputChange(e, "newProduct.description")}
                returnKeyType="go"
                value={this.state.newProduct.description}
                onSubmitEditing={this._handleAction}
              />
            </View>
            <View style={productStyles.listSeparator}/>
          </View>
          <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
            <YTButton
              onPress={this._handleAction}
              caption={isFetching ? "Creating..." : "Create new product"}
              isDisabled={!isFormValid}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}


const mapStoreToProps = (store) => {

  return {
    user: store.user.loggedIn.user
    , isFetching: store.product.selected.isFetching
  }
}

export default connect(mapStoreToProps)(CreateProduct);
