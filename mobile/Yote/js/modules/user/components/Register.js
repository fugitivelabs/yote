// import react/redux dependencies
import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import Base from '../../../global/components/BaseComponent';
import { connect } from 'react-redux';


// import libraries
import _ from 'lodash';

// import react-native components & apis
import View from 'View';
import Text from 'Text';
import StyleSheet from 'StyleSheet';
import TextInput from 'TextInput';
import TouchableHighlight from 'TouchableHighlight';
import Image from 'Image';
import Modal from 'Modal';
import ScrollView from 'ScrollView';
import Alert from 'Alert';
import TouchableOpacity from 'TouchableOpacity';
import KeyboardAvoidingView from 'KeyboardAvoidingView';
import Platform from 'Platform'; 
import Dimensions from 'Dimensions'; 

// import actions
import { singleActions } from '../userActions';

// import custom components
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';

// import styles
import YTColors from '../../../global/styles/YTColors';

let screenWidth = Dimensions.get('window').width; 
let screenHeight = Dimensions.get('window').height; 

var styles = StyleSheet.create({
  container: {
    flex: 1
    // , padding: 20
    // , flexDirection: 'column'
    , backgroundColor: '#fff'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    backgroundColor: 'transparent'
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: YTColors.darkText,
    margin: 10,
  },
  inputWrapper: {
    flex: 0.5,
    marginBottom: 10,
    // marginTop: 5,
  },
  inputContainer: {
    // padding: 10,
    borderWidth: Platform.OS == 'ios' ? 1 : 0,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    marginTop: 14,
  },
  input: {
    height: 45,
    // borderWidth: 0.5,
    // borderColor: YTColors.primaryHeader,
    flex: 1,
    fontSize: 17,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  label: {
    fontSize: 12,
    color: YTColors.lightText,
    marginBottom: 4
  },
  privacyContainer: {
    paddingTop: 10,
    paddingBottom: 40,
  },
  termsWrapper: {

  },
  termsText: {
    fontSize: 10,
    color: YTColors.lightText,
    // fontStyle: 'italic'
  },
  checkBoxInputCell: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderColor: YTColors.listSeparator,
  },
  checkBox: {
    // flex: 1,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#11b9de'

  },
  checkBoxTextWrapper: {
    justifyContent: 'center',
    paddingVertical: 15,
    paddingLeft: 17,
    paddingRight: 9,
    flex: 1
  },
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
      '_handleRegisterSubmit'
      , '_closeRegister'
      , '_checkFormValid'
      , '_openPrivacy'
      , '_toggleAgreeToTerms'
      , '_handleAgreeToTerms'
    )
  }

  componentDidMount() {
  // this.props.dispatch(singleActions.setupNewUser());
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
        this.setState({termsModalVisible: true});
        // this.props.dispatch(singleActions.sendRegister(this.state.user)).then((json) => {
        //   if (json.success) {
        //     this.setState({termsModalVisible: true}); 
        //   } else {
        //     Alert.alert("Something went wrong", json.error);
        //   }
        // })
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
    // dispatch(singleActions.sendAgreedToTerms(true)).then((json) => {
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
            style={styles.container}
            contentContainerStyle={{flex:1}}
          >
            <YTHeader
              navigator={navigator}
              leftItem={leftItem}
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
    isLoggedIn: store.user.isLoggedIn,
    isFetching: store.user.isFetching,
  }
}

export default connect(
  mapStoreToProps
)(Register);
