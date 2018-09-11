// import react/redux dependencies
import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import Base from '../../../global/components/BaseComponent';
import { connect } from 'react-redux';

// import react-native components & apis
import {
  Alert
  , Dimensions
  , Image
  , KeyboardAvoidingView
  , Modal
  , Platform
  , ScrollView
  , StyleSheet
  , TextInput
  , TouchableOpacity
  , Text
  , View
} from 'react-native'; 

import { displayName } from '../../../../app.json'; 
// import libraries
import _ from 'lodash';

// import actions
import * as userActions from '../userActions';

// import custom components
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';

// import styles
import YTColors from '../../../global/styles/YTColors';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
    , flex: 1
  }
  , inputWrapper: {
    flex: 0.5
    , marginBottom: 10
  }
  , inputContainer: {
      borderBottomColor: '#CCC'
      , borderWidth: Platform.OS == 'ios' ? 1 : 0
      , borderColor: 'transparent'
      , marginTop: 14
  }
  , input: {
      height: 45
      , flex: 1
      , fontSize: 17
      , paddingVertical: 8
      , backgroundColor: 'rgba(255,255,255,0.7)'
  }
  , label: {
      fontSize: 12
      , color: YTColors.lightText
      , marginBottom: 4
  }
});

class Register extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false
      , termsModalVisible: false
      , user: {
        username: ''
        , password: ''
        , firstName: ''
        , lastName: ''
        , agreedToTerms: false
      }

    }

    this._bind(
      '_closeRegister'
      , '_checkFormValid'
      , '_handleAgreeToTerms'
      , '_handleRegisterSubmit'
      , '_openPrivacy'
      , '_toggleAgreeToTerms'
    )
  }

  componentDidMount() {
  // this.props.dispatch(userActions.setupNewUser());
 }

  _checkFormValid() {

    var requiredInputs = Object.keys(this.refs).filter((ref) => this.refs[ref].props.isRequired);

    var isValid = true;
    for(var i = 0; i < requiredInputs.length; i++) {

      // lodash to the rescue
      var theVal = _.get(this.state, requiredInputs[i]);
      if(!theVal || theVal.length < 1) {
        isValid = false;
      }
    }

    this.setState({isFormValid: isValid});
  }

  _handleInputChange(e, target) {
    // console.log("handle input change for ", target);
    // console.log(e.nativeEvent);
    var newState = this.state;
    newState.user[target] = e.nativeEvent.text;
    this.setState(newState);
    this._checkFormValid();
  }

  _toggleAgreeToTerms() {
    var newState = this.state;
    newState.user.agreedToTerms = !this.state.user.agreedToTerms;
    this.setState(newState);
  }

  _handleRegisterSubmit() {
    if (this.state.isFormValid) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.state.user.username)){
        this.props.dispatch(userActions.sendRegister(this.state.user)).then((json) => {
          if (json.success) {
            this.props.dispatch(userActions.sendLogin(this.state.user.username, this.state.user.password)); 
            Alert.alert("Welcome!", `Thanks for registering with ${displayName}! Enjoy!`, [{text: 'Get Started', onPress: null}]);
          } else {
            Alert.alert("Something went wrong", json.error);
          }
        })
      } else {
        Alert.alert("Please enter a valid email address");
      }
    } else {
      Alert.alert("Whoops", "All fields are required");
    }
  }


  _closeRegister() {
    this.props.navigation.goBack();
  }

  _openPrivacy() {
    this.props.navigator.push({privacy: true});
  }

  _scrollToInput(e, refName) {
    setTimeout(() => {

      var scrollResponder = this.refs.myScrollView.getScrollResponder();
      // var scrollResponder = scrollView.getScrollRef();
      // console.log("on focus called ", refName);
      // console.log(this.refs[refName].props.returnKeyType);
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

  _handleAgreeToTerms() {
    const { dispatch } = this.props;
    console.log("Agree To Terms");
    // dispatch(userActions.sendAgreedToTerms(true)).then((json) => {
    //   this.setState({termsModalVisible: false});
    //   this.props.navigator.push({welcome: true});
    // });
  }

  render(){
    const { isVisible, isFetching } = this.props;
    const headerStyle = {
      background: {
        backgroundColor: 'transparent'
      },
      title: {
        color: YTColors.darkText
      },
      itemsColor: YTColors.darkText
    }
    const leftItem = {
      title: 'Cancel',
      onPress: this._closeRegister,
    };

    return(

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : null}
            contentContainerStyle={{flex:1}}
            style={styles.container}
          >
            <YTHeader
              leftItem={leftItem}
              navigator={navigator}
              title="Register"
            />
            <ScrollView ref="myScrollView" keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" style={[{flex: 1}]}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image source={require('../../../global/img/logo.png')} resizeMode='contain' style={{height: screenHeight / 3, flex: 1, tintColor: YTColors.lightText}}/>
              </View>
              <View style={{flex: 1, paddingHorizontal: 20}}>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      autoCapitalize="words"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      isRequired={true}
                      onChange={ (e) => this._handleInputChange(e, "firstName") }
                      onFocus={ (e) => this._scrollToInput(e, 'user.firstName')}
                      onSubmitEditing={(event) => {
                        this.refs['user.lastName'].focus();
                      }}
                      placeholder="First Name"
                      placeholderTextColor={YTColors.lightText}
                      ref="user.firstName"
                      returnKeyType="next"
                      style={styles.input}
                      underlineColorAndroid='#ccc'
                      value={this.state.user.firstName}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      autoCapitalize="words"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      isRequired={true}
                      onChange={ (e) => this._handleInputChange(e, "lastName") }
                      onFocus={ (e) => this._scrollToInput(e, 'user.lastName')}
                      onSubmitEditing={(event) => {
                        this.refs['user.username'].focus();
                      }}
                      placeholder="Last Name"
                      placeholderTextColor={YTColors.lightText}
                      ref="user.lastName"
                      returnKeyType="next"
                      style={styles.input}
                      underlineColorAndroid='#ccc'
                      value={this.state.user.lastName}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      isRequired={true}
                      keyboardType="email-address"
                      onFocus={ (e) => this._scrollToInput(e, 'user.username')}
                      onChange={ (e) => this._handleInputChange(e, "username") }
                      onSubmitEditing={(event) => {
                        this.refs['user.password'].focus();
                      }}
                      placeholder="Email"
                      placeholderTextColor={YTColors.lightText}
                      ref="user.username"
                      returnKeyType="next"
                      style={styles.input}
                      underlineColorAndroid='#ccc'
                      value={this.state.user.username}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      isRequired={true}
                      onChange={ (e) => this._handleInputChange(e, "password") }
                      onFocus={ (e) => this._scrollToInput(e, 'user.password')}
                      placeholder="Password"
                      placeholderTextColor={YTColors.lightText}
                      ref="user.password"
                      returnKeyType="default"
                      secureTextEntry={true}
                      style={styles.input}
                      underlineColorAndroid='#ccc'
                      value={this.state.user.password}
                    />
                  </View>

                </View>
              </View>
              {!this.state.isFormValid ?
                <View style={{marginTop: 10}}>
                  <Text style={[styles.label, {textAlign: 'center'}]}>All fields required.</Text>
                </View>
                :
                <View style={{marginTop: 10}}>
                  <Text style={[styles.label, {textAlign: 'center'}]}>All fields completed.</Text>
                </View>
              }
              <View style={{padding: 15}}>
                <YTButton
                  caption={isFetching ? "Please wait..." : "Register"}
                  isDisabled={!this.state.isFormValid}
                  onPress={this._handleRegisterSubmit}
                  type="primary"
                />
              </View>
            </ScrollView>
            <Modal animationType="slide" supportedOrientations={['portrait', 'landscape']} visible={this.state.termsModalVisible} transparent={false} backgroundColor="black" onRequestClose={() => null}>
              <View style={{flex: 1}}>
                <Text> Accept Terms</Text>
              </View>
              <YTButton
                caption={"I have read and Agree to the Terms and Conditions"}
                captionStyle={{color: '#fff' ,textAlign:"center"}}
                buttonStyle={{backgroundColor: YTColors.danger}}
                onPress={this._handleAgreeToTerms}
                type="danger"
              />
            </Modal>
          </KeyboardAvoidingView>
    )
  }
}

Register.propTypes = {
  isVisible: PropTypes.bool
  , handleClose: PropTypes.func
}

const mapStoreToProps = (store) => {
  return {
    isFetching: store.user.isFetching
    , isLoggedIn: store.user.isLoggedIn
  }
}

export default connect(
  mapStoreToProps
)(Register);
