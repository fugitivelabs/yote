/**
* Login component renders when there is no apiToken associated with a user
*/

// import react/redux dependencies
import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import libraries
import _ from 'lodash';

// import react-native components & apis
import {
  Alert
  , Dimensions
  , Image
  , Linking
  , Modal
  , ScrollView
  , StyleSheet
  , Text
  , TextInput
  , TouchableOpacity
  , View
  , Platform
} from 'react-native'; 

// import actions
import * as singleActions from '../userActions.js';

// import global components
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';

// import styles
import YTStyles from '../../../global/styles/YTStyles'; 

const IMAGE_HEIGHT = Dimensions.get('window').height * 0.5;
let screenWidth = Dimensions.get('window').width;

class Login extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
      , password: ''
      , register: false
      , animation: 'fade'
      , isFormValid: false
      , forgotPassword: false
      , email: ''
    }

    this._bind(
      '_handleLoginSubmit'
      , '_openRegister'
      , '_checkFormValid'
      , '_toggleForgotPass'
      , '_handleResetPasswordSubmit'
      , '_handleClick'
    )
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

  _handleInputChange(e, target) {
    var newState = this.state;
    newState[target] = e.nativeEvent.text;
    this.setState(newState);
    this._checkFormValid();
  }

  _handleLoginSubmit() {
    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "All fields are required.");
      return;
    }
    this.props.dispatch(singleActions.sendLogin(this.state.username, this.state.password)).then((res) => {
      if(!res.success) {
        Alert.alert("Whoops", res.error);
      } else {
        this.props.navigation.navigate('App'); 
      }
    });
  }


  _handleResetPasswordSubmit() {
    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "We need an email to submit your password request.");
      return;
    }
    let userData = { email: this.state.username };
    this.props.dispatch(singleActions.sendPasswordResetRequest(userData)).then((res)=> {
      if(res.success) {
        Alert.alert("Awesome!", `We've sent an email to ${this.state.username} with a link to reset your password.`);
      } else {
        Alert.alert("Whoops", res.error);
      }
      this._toggleForgotPass();
    });
  }

  _toggleForgotPass() {
    this.setState({forgotPassword: !this.state.forgotPassword});
  }

  _openRegister() {
    this.props.navigation.navigate( 'Register' ); 
  }

  _scrollToInput(e, refName) {
    var scrollResponder = this.refs.myScrollView.getScrollResponder();
    // var scrollResponder = scrollView.getScrollRef();
    scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
      ReactNative.findNodeHandle(this.refs[refName]),
      130, // adjust depending on your contentInset
      /* preventNegativeScrollOffset */ true
    );
  }

  _handleClick() {
    let url = "https://github.com/fugitivelabs/yote-react" ; 
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
      }
    });
  };

  render(){
    const { isFetching } = this.props;
    const { forgotPassword } = this.state;
    let forgotPassText = forgotPassword ? "Cancel" : "Forgot password?";
    return(
      <View style={YTStyles.container}>
        <ScrollView ref="myScrollView" keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 50}}>
            <Image
              resizeMode={"contain"}
              source={require('../../../global/img/logo.png')}
              style={{height: 250, width: 250, tintColor: YTStyles.colors.secondary}}
            />
          </View>
          <View style={{paddingHorizontal: 20}}>
            {!forgotPassword ?
              <View style={YTStyles.inputWrapper}>
                <View style={YTStyles.inputContainer}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={false}
                    clearButtonMode="while-editing"
                    isRequired={true}
                    keyboardType="email-address"
                    onChange={ (e) => this._handleInputChange(e, "username") }
                    onSubmitEditing={(event) => {
                      this.refs['password'].focus();
                    }}
                    placeholder="Email"
                    ref="username"
                    returnKeyType="next"
                    style={YTStyles.input}
                    value={this.state.username}
                  />
                </View>
                <View style={YTStyles.inputContainer}>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={false}
                    clearButtonMode="while-editing"
                    isRequired={true}
                    onChange={ (e) => this._handleInputChange(e, "password") }
                    onSubmitEditing={this._handleLoginSubmit}
                    placeholder="Password"
                    ref="password"
                    returnKeyType="go"
                    secureTextEntry={true}
                    style={YTStyles.input}
                    value={this.state.password}
                  />
                </View>
              </View>
              :
              <View style={YTStyles.inputContainer}>
                <View style={{paddingVertical: 15}}>
                  <Text style={[YTStyles.text, {textAlign: 'center'}]}>Enter your email and we'll send you a link to reset your password! Please note, reset password link is ONLY valid for 24 hours!</Text>
                </View>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={false}
                  clearButtonMode="while-editing"
                  isRequired={true}
                  keyboardType="email-address"
                  onSubmitEditing={this._handleResetPasswordSubmit}
                  onChange={ (e) => this._handleInputChange(e, "username") }
                  placeholder="Email"
                  placeholderTextColor={YTStyles.colors.lightText}
                  ref="username"
                  returnKeyType="go"
                  style={YTStyles.input}
                  value={this.state.username}
                />
              </View>
            }
            <View style={YTStyles.inputWrapper}>
              <View style={{alignItems: 'flex-end', padding: 15}}>
                <TouchableOpacity
                  accessibilityTraits="button"
                  activeOpacity={0.8}
                  onPress={this._toggleForgotPass}
                >
                  <Text style={YTStyles.linkText}>{forgotPassText}</Text>
                </TouchableOpacity>
              </View>
              {!forgotPassword ?
                <View>
                  <View style={{paddingVertical: 10}}>
                    <YTButton
                      caption={isFetching ? "Please wait..." : "Login"}
                      isDisabled={!this.state.isFormValid || isFetching}
                      onPress={this._handleLoginSubmit}
                      type="primary"
                    />
                  </View>
                  <View style={{paddingVertical: 10}}>
                    <Text style={[YTStyles.text, {textAlign: 'center'}]}>Don't have an account? You can register a new account below!</Text>
                  </View>
                  <View style={{paddingVertical: 10}}>
                    <YTButton
                      buttonStyle={{backgroundColor: YTStyles.colors.accent}}
                      caption="Register"
                      captionStyle={{color: '#fff'}}
                      onPress={this._openRegister}
                      type="primary"
                    />
                  </View>
                </View>
                :
                <View>
                  <View style={{paddingBottom: 20}}>
                    <YTButton
                      buttonStyle={{backgroundColor: YTStyles.colors.danger}}
                      caption={isFetching ? "Please wait..." : "Reset Password"}
                      isDisabled={!this.state.username}
                      onPress={this._handleResetPasswordSubmit}
                      type="primary"
                    />
                  </View>
                  <View style={{paddingVertical: 5}}>
                    <Text style={[YTStyles.text, {textAlign: 'center'}]}>If you're having trouble resetting your password, please send us an email at help@fugitivelabs.com so that we can help you resolve your issue.</Text>
                  </View>
                </View>
              }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    isFetching: store.user.loggedIn.isFetching
    , isLoggedIn: store.user.loggedIn
  }
}

export default connect(
  mapStoreToProps
)(Login);