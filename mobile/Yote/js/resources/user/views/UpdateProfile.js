/**
* Allows the current user to update basic information
* first name, last name, etc (not username)
*/

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import react-native components
import {
  Alert
  , Dimensions
  , Image
  , ImageBackground
  , KeyboardAvoidingView
  , ListView
  , Picker
  , Platform
  , ScrollView
  , StyleSheet
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native'; 

// import ImagePicker from 'react-native-image-picker';
// import LinearGradient from 'react-native-linear-gradient';

// import global components
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as singleActions from '../userActions.js';

// import styles
import tw from '../../../global/styles/tailwind/twrnc'; 

const IMAGE_HEIGHT = 150;

class UpdateProfile extends Binder {
  constructor(props){
    super(props);
    this.state = {
      isFormValid: false
      , newProfilePic: null
      , newUserData: {
          firstName: this.props.user.firstName
          , lastName: this.props.user.lastName
          , username: this.props.user.username
        }
      , showPicker: false
    }
    this._bind(
      '_checkFormValid'
      , '_handleBack'
      , '_handleAction'
      , '_handleInputChange'
      , '_toggleShowPickerForm'
    )
  }

  _toggleShowPickerForm() {
    this.setState({showPicker: !this.state.showPicker});
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
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text;
    });
    this.setState(newState);
    this._checkFormValid();
  }

  _handleAction() {
    const { dispatch, user } = this.props;
    const { newUserData, newProfilePic } = this.state;
    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "All fields are required.");
      return;
    }

    // create file for newProfilePic
    // if(newProfilePic) {
    //   this.props.dispatch(fileActions.sendCreateFile({imageHexString: newProfilePic.data})).then((response) => {
    //     newUserData.info.profilePicUrl = response.item.rawUrl; 
    //     dispatch(singleUserActions.sendUpdateProfile(newUserData)).then((res) => {
    //       this.props.navigation.goBack();
    //     });
    //   });
    // } else {
    //   dispatch(singleUserActions.sendUpdateProfile(newUserData)).then((res) => {
    //     this.props.navigation.goBack();
    //   });
    // }

    dispatch(singleActions.sendUpdateProfile(newUserData)).then((res) => {
      this.props.navigation.goBack();
    });
  }

  _handleBack() {
    this.setState({newUserData: this.props.user});
    this.props.navigation.goBack(); 
  }

  _scrollToInput(e, refName) {
    setTimeout(() => {
      var scrollResponder = this.refs.myScrollView.getScrollResponder();
      // var scrollResponder = scrollView.getScrollRef();
      var offset = 130;
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ReactNative.findNodeHandle(this.refs[refName]),
        offset, // adjust depending on your contentInset
        /* preventNegativeScrollOffset */ true
        // false
      );
    }, 150);
  }

  render() {
    const { user, isFetching } = this.props;
    const { newProfilePic, newUserData, showPicker } = this.state;
    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/default.png');

    const leftItem = {
      title: 'Cancel',
      onPress: () => this._handleBack(),
    };

    return(
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : null}
        contentContainerStyle={tw`flex-1`}
        style={tw`flex-1 bg-white`}
      >
        <YTHeader
          leftItem={leftItem}
          title="Edit Profile"
        />
        <ScrollView ref="myScrollView" keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
          <View>
            <View style={tw`align-center flex-1 p-4 justify-center`}>
              <View style={tw`flex-1 rounded-full`}>
                <Image
                  style={[tw`bg-gray-300`, {width: IMAGE_HEIGHT, height: IMAGE_HEIGHT, borderRadius: Platform.OS === 'ios' ? IMAGE_HEIGHT * .5 : null}]}
                  source={newProfilePic ? {uri: newProfilePic.uri} : profileImg}
                />
              </View>
            </View>
            <View style={tw`flex-1 flex-row px-4 py-2`}>
              <View style={tw`flex-auto justify-center pl-4`}>
                <Text style={tw`text-lg`}>First Name:</Text>
              </View>
              <View style={tw`flex-auto justify-center pl-4`}>
                <TextInput
                  autoCapitalize="words"
                  autoCorrect={false}
                  isRequired={true}
                  onChange={ (e) => this._handleInputChange(e, "newUserData.firstName") }
                  onFocus={ (e) => this._scrollToInput(e, 'newUserData.firstName')}
                  ref="newUserData.firstName"
                  returnKeyType="default"
                  style={tw`p-2 text-lg border-b border-gray-100`}
                  value={this.state.newUserData.firstName}
                />
              </View>
            </View>
            <View>
              <View style={tw`flex-1 flex-row px-4 py-2`}>
                <View style={tw`flex-auto justify-center pl-4`}>
                  <Text style={tw`text-lg`}>Last Name:</Text>
                </View>
                <View style={tw`flex-auto justify-center pl-4`}>
                  <TextInput
                    autoCapitalize="words"
                    autoCorrect={false}
                    isRequired={true}
                    onFocus={ (e) => this._scrollToInput(e, 'newUserData.lastName')}
                    onChange={ (e) => this._handleInputChange(e, "newUserData.lastName") }
                    ref="newUserData.lastName"
                    returnKeyType="default"
                    style={tw`p-2 text-lg border-b border-gray-100`}
                    value={this.state.newUserData.lastName}
                  />
                </View>
              </View>
            </View>
            <View>
              <View style={tw`flex-1 flex-row px-4 py-2`}>
                <View style={tw`flex-auto justify-center pl-4`}>
                  <Text style={tw`text-lg`}>Email:</Text>
                </View>
                <View style={tw`flex-auto justify-center pl-4`}>
                  <TextInput
                    autoCapitalize="words"
                    autoCorrect={false}
                    editable={false}
                    isRequired={true}
                    keyboardType="email-address"
                    onChange={ (e) => this._handleInputChange(e, "newUserData.username") }
                    onFocus={ (e) => this._scrollToInput(e, 'newUserData.username')}
                    placeholder=""
                    placeholderTextColor={tw``}
                    ref="newUserData.username"
                    returnKeyType="default"
                    style={tw`p-2 text-lg border-b border-gray-100`}
                    value={this.state.newUserData.username}
                  />
                </View>
              </View>
            </View>
          <View style={tw`px-2 py-4`}>
            <YTButton
              caption={isFetching ? "Please wait..." : "Update my profile"}
              isDisabled={!this.state.isFormValid || isFetching}
              onPress={this._handleAction}
            />
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    isFetching: store.user.isFetching
    , user: store.user.loggedIn.user
  }
}

export default connect(mapStoreToProps)(UpdateProfile);