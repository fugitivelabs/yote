/**
* Register component to create new users
*/

// import react/redux dependencies
import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import libraries
import _ from 'lodash';

// import react-native components & apis
import Alert from 'Alert';
import Image from 'Image';
import Modal from 'Modal';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableHighlight from 'TouchableHighlight';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import actions
import * as userActions from '../userActions.js';

// import custom components
import Base from '../../../global/components/BaseComponent';
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';

// import styles
import YTColors from '../../../global/styles/YTColors';

var styles = StyleSheet.create({
  container: {
    flex: 1
    // , padding: 20
    // , flexDirection: 'column'
    , backgroundColor: YTColors.lightBackground
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
    marginTop: 10,
  },
  inputContainer: {
    // padding: 10,
    borderWidth: 1,
    // borderBottomColor: '#CCC',
    borderColor: 'transparent',
    marginTop: 14,
  },
  input: {
    height: 52,
    // borderWidth: 0.5,
    borderColor: YTColors.primaryHeader,
    flex: 1,
    fontSize: 17,
    padding: 8,
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

const CheckboxInput = ({index, isSelected, onPress, selectionColor, value }) => {
  var selectedCheckStyle = { tintColor: YTColors.lightText};
  var selectedCaptionStyle;
  if(isSelected) {
    selectedCheckStyle = { tintColor: YTColors.buttonPrimaryBG };
    selectedCaptionStyle = { color: "#fff" }
  }
  // var deselectedLabelStyle;
  // if (!isSelected && Platform.OS === 'android') {
  //   deselectedLabelStyle = styles.deselectedLabel;
  // }

  const checkbox = isSelected ? <Image style={[styles.checkbox, selectedCheckStyle]} source={require('../../../global/img/ok_filled.png')}/> : <Image style={[styles.checkbox, selectedCheckStyle]} source={require('../../../global/img/ok_empty.png')}/>;

  var accessibilityTraits = ['button'];
  if (isSelected) {
    accessibilityTraits.push('selected');
  }
  return (
    <TouchableOpacity
      accessibilityTraits={accessibilityTraits}
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.checkBoxInputCell}
    >


      <View

        style={[styles.checkBox]}>
        {checkbox}
      </View>


      <View style={styles.checkBoxTextWrapper}>
        <Text style={styles.label}>{value}</Text>

      </View>
    </TouchableOpacity>
  )
}

class Register extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false
      , user: {
        username: ''
        , password: ''
        , firstName: ''
        , lastName: ''
        , phone: ''
        , agreedToTerms: false
      }

    }

    this._bind(
      '_handleRegisterSubmit'
      , '_closeRegister'
      , '_checkFormValid'
      , '_openPrivacy'
      , '_toggleAgreeToTerms'
    )
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
    // console.log("_handle submit");
    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "All fields are required.");
      return;
    }
    let newUser = this.state.user;
    newUser.password2 = newUser.password;
    newUser.withToken = true;
    this.props.dispatch(userActions.sendRegister(newUser)).then((res) => {
      // console.log("done registering");
      // console.log(res);
      if(!res.success) {
        Alert.alert("Something went wrong", res.error);
        return;
      }
    });
  }


  _closeRegister() {
    // console.log("closing register");
    this.props.navigator.pop();
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
      title: 'Back',
      onPress: this._closeRegister,
    };

    return(

          <View style={styles.container}
          >
            <YTHeader
              navigator={navigator}
              leftItem={leftItem}
              title="Register"
              headerStyle={headerStyle}
            />
            <ScrollView ref="myScrollView" keyboardDismissMode="interactive" style={[{flex: 1, padding: 20}]}>
              {!this.state.isFormValid ?
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, {textAlign: 'center'}]}>All fields required.</Text>
                </View>
                : null
              }
              <View style={styles.inputWrapper}>

                <View style={styles.inputContainer}>

                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    ref="user.username"
                    onFocus={ (e) => this._scrollToInput(e, 'user.username')}
                    isRequired={true}
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder=""
                    placeholderTextColor={YTColors.lightText}
                    autoCorrect={false}
                    onChange={ (e) => this._handleInputChange(e, "username") }
                    underlineColorAndroid="#f13d6a"
                    keyboardType="email-address"
                    returnKeyType="next"
                    value={this.state.user.username}
                    onSubmitEditing={(event) => {
                      this.refs['user.password'].focus();
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>

                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    ref="user.password"
                    onFocus={ (e) => this._scrollToInput(e, 'user.password')}
                    isRequired={true}
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={ (e) => this._handleInputChange(e, "password") }
                    underlineColorAndroid="#f13d6a"
                    returnKeyType="next"

                    secureTextEntry={true}
                    value={this.state.user.password}
                    onSubmitEditing={(event) => {
                      this.refs['user.firstName'].focus();
                    }}
                  />
                </View>




                <View style={styles.inputContainer}>

                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    ref="user.firstName"
                    onFocus={ (e) => this._scrollToInput(e, 'user.firstName')}
                    isRequired={true}
                    style={styles.input}
                    autoCapitalize="words"
                    placeholder=""
                    placeholderTextColor={YTColors.lightText}
                    autoCorrect={false}
                    onChange={ (e) => this._handleInputChange(e, "firstName") }
                    underlineColorAndroid="#f13d6a"
                    returnKeyType="next"

                    value={this.state.user.firstName}
                    onSubmitEditing={(event) => {
                      this.refs['user.lastName'].focus();
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>

                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    ref="user.lastName"
                    onFocus={ (e) => this._scrollToInput(e, 'user.lastName')}
                    isRequired={true}
                    style={styles.input}
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChange={ (e) => this._handleInputChange(e, "lastName") }
                    underlineColorAndroid="#f13d6a"
                    returnKeyType="next"

                    value={this.state.user.lastName}
                    onSubmitEditing={(event) => {
                      this.refs['user.agreedToTerms'].focus();
                    }}
                  />
                </View>

              </View>
  
              <View style={styles.inputContainer}>

                <YTButton
                  type="primary"
                  caption={isFetching ? "Please wait..." : "Register"}
                  onPress={this._handleRegisterSubmit}
                  isDisabled={!this.state.isFormValid}
                />

              </View>

              <View style={styles.privacyContainer}>

                <TouchableOpacity
                  accessibilityTraits="button"
                  onPress={this._openPrivacy}
                  activeOpacity={0.8}
                >

                  <Text style={[{color: YTColors.actionText, textAlign: "center"}]}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

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
