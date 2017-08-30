/**
* Login component renders when there is no apiToken associated with a user
*/

// import react/redux dependencies
import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import libraries
import _ from 'lodash';

// import react-native components & apis
import Alert from 'Alert';
import Base from '../../../global/components/BaseComponent';
import Dimensions from 'Dimensions';
import Image from 'Image';
import Linking from 'Linking'; 
import Modal from 'Modal';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';
import Platform from 'Platform'; 

// import actions
import * as singleActions from '../userActions.js';

// import global components
import YTButton from '../../../global/components/YTButton';

// import styles
import YTColors from '../../../global/styles/YTColors';

const IMAGE_HEIGHT = Dimensions.get('window').height * 0.5;
let screenWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
  bannerWrapper: {
    flex:1
    , padding: 20
    , justifyContent: 'flex-end'
  }
  , container: {
      flex: 1
      , backgroundColor: '#fff'
      , justifyContent: "center"
      , flexDirection: 'column'
      , paddingTop: 20
    }
  , forgotContainer: {
      alignItems: 'flex-end'
      , padding: 15
    }
  , header: {
      justifyContent: 'center'
      , alignItems: 'center'
      , paddingTop: Dimensions.get('window').height * 0.2
      , backgroundColor: 'transparent'
    }
  , inputWrapper: {
      // flex: 0.5
      // , backgroundColor: "#fff"
    }
  , inputContainer: {
    // padding: 10,
    borderWidth: Platform.OS == 'ios' ? 1 : 0,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    marginTop: 14,
  }
  , input: {
    height: 45,
    // borderWidth: 0.5,
    // borderColor: YTColors.primaryHeader,
    flex: 1,
    fontSize: 17,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.7)'
  }
  , img: {
      width: screenWidth
      , height: IMAGE_HEIGHT
      , backgroundColor: "transparent"
    }
  , label: {
      fontSize: 12
      , color: '#fff'
      , marginBottom: 4
    }
  , text: {
      color: '#fff'
      , marginTop: 20
      , fontSize: 12
      , textAlign: 'center'
    }
  , welcome: {
      fontSize: 20
      , textAlign: 'center'
      , color: YTColors.darkText
      , margin: 10
    }
});

class Login extends Base {
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
      <View style={styles.container}>
        <ScrollView ref="myScrollView" keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              style={{height: 250, width: 250, tintColor: YTColors.lightText}}
              source={require('../../../global/img/logo.png')}
              resizeMode={"contain"}
            />
          </View>
          <View style={{paddingHorizontal: 20}}>
            {!forgotPassword ?
              <View style={styles.inputWrapper}>
                <View style={styles.inputContainer}>
                  <TextInput
                    ref="username"
                    isRequired={true}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor={YTColors.lightText}
                    autoCorrect={false}
                    onChange={ (e) => this._handleInputChange(e, "username") }
                    returnKeyType="next"
                    autoFocus={false}
                    value={this.state.username}
                    clearButtonMode="while-editing"
                    keyboardType="email-address"
                    onSubmitEditing={(event) => {
                      this.refs['password'].focus();
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    ref="password"
                    isRequired={true}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Password"
                    placeholderTextColor={YTColors.lightText}
                    autoCorrect={false}
                    onChange={ (e) => this._handleInputChange(e, "password") }
                    returnKeyType="go"
                    autoFocus={false}
                    secureTextEntry={true}
                    clearButtonMode="while-editing"
                    value={this.state.password}
                    onSubmitEditing={this._handleLoginSubmit}
                  />
                </View>
              </View>
              :
              <View style={styles.inputContainer}>
                <View style={{paddingVertical: 15}}>
                  <Text style={{fontSize: 15, color: YTColors.lightText, textAlign: 'center'}}>Enter your email and we'll send you a link to reset your password! Please note, reset password link is ONLY valid for 24 hours!</Text>
                </View>
                <TextInput
                  ref="username"
                  isRequired={true}
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder="Email"
                  placeholderTextColor={YTColors.lightText}
                  autoCorrect={false}
                  onChange={ (e) => this._handleInputChange(e, "username") }
                  returnKeyType="go"
                  autoFocus={false}
                  value={this.state.username}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  onSubmitEditing={this._handleResetPasswordSubmit}
                />
              </View>
            }
            <View style={styles.inputWrapper}>
              <View style={styles.forgotContainer}>
                <TouchableOpacity
                  accessibilityTraits="button"
                  onPress={this._toggleForgotPass}
                  activeOpacity={0.8}
                >
                  <Text style={[{color: YTColors.actionText}]}>{forgotPassText}</Text>
                </TouchableOpacity>
              </View>
              {!forgotPassword ?
                <View>
                  <View style={{paddingVertical: 10}}>
                    <YTButton
                      type="primary"
                      caption={isFetching ? "Please wait..." : "Login"}
                      onPress={this._handleLoginSubmit}
                      isDisabled={!this.state.isFormValid}
                    />
                  </View>
                  <View style={{paddingVertical: 10}}>
                    <Text style={{fontSize: 15, color: YTColors.lightText, textAlign: 'center'}}>Don't have an account? You can register a new account below!</Text>
                  </View>
                  <View style={{paddingVertical: 10}}>
                    <YTButton
                      type="primary"
                      buttonStyle={{backgroundColor: YTColors.yoteGreen}}
                      captionStyle={{color: '#fff'}}
                      caption="Register"
                      onPress={this._openRegister}
                    />
                  </View>
                </View>
                :
                <View>
                  <View style={{paddingBottom: 20}}>
                    <YTButton
                      type="primary"
                      caption={isFetching ? "Please wait..." : "Reset Password"}
                      onPress={this._handleResetPasswordSubmit}
                      isDisabled={!this.state.username}
                      buttonStyle={{backgroundColor: YTColors.danger}}
                    />
                  </View>
                  <View style={{paddingVertical: 5}}>
                    <Text style={{fontSize: 15, color: YTColors.lightText, textAlign: 'center'}}>If you're having trouble resetting your password, please send us an email at help@fugitivelabs.com so that we can help you resolve your issue.</Text>
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
    isLoggedIn: store.user.loggedIn
    , isFetching: store.user.loggedIn.isFetching
  }
}

export default connect(
  mapStoreToProps
)(Login);
