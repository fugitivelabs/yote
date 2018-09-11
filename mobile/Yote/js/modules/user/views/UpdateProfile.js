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

import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

// import global components
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import YTHeader from '../../../global/components/YTHeader';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as singleActions from '../userActions.js';

// import styles
import YTColors from '../../../global/styles/YTColors';
import YTStyles from '../../../global/styles/YTStyles'; 

const IMAGE_HEIGHT = 150;

class UpdateProfile extends Base {
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
      , '_openImagePicker'
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

  _openImagePicker() {
     var options = {
      allowsEditing: true
      , maxWidth: 500
      , maxHeight: 500
      , title: 'Select Picture'
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        console.log(response); 
        this.setState({newProfilePic: response}); 
        this._checkFormValid(); 
      }
    })
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
        contentContainerStyle={{flex:1}}
        style={YTStyles.container}
      >
        <YTHeader
          leftItem={leftItem}
          title="Edit Profile"
        />
        <ScrollView ref="myScrollView" keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" style={[YTStyles.scrollContainer]} >
          <View>
            <View style={{alignItems: 'center' , flex: 1 , padding: 30 , justifyContent: 'center'}}>
              <View style={{flex: 1, borderRadius: IMAGE_HEIGHT * .5}}>
                <TouchableOpacity onPress={this._openImagePicker}>
                  <Image
                    style={{backgroundColor: YTColors.listSeparator, width: IMAGE_HEIGHT, height: IMAGE_HEIGHT, borderRadius: Platform.OS === 'ios' ? IMAGE_HEIGHT * .5 : null}}
                    source={newProfilePic ? {uri: newProfilePic.uri} : profileImg}
                  />
                  <LinearGradient colors={['rgba(0,0,0,0.11)', 'rgba(0,0,0,0.51)', 'rgba(0,0,0,0.81)']} style={{borderRadius: Platform.OS === 'ios' ? IMAGE_HEIGHT * .5 : null, bottom: 0, flex: 1, left: 0, position: 'absolute', right: 0, top: 0}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Image
                          source={require('../../../global/img/camera3.png')}
                          style={{opacity: .85}}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5}}>
              <View style={{flex: .4, justifyContent: 'center', paddingLeft: 10}}>
                <Text style={YTStyles.text}>First Name:</Text>
              </View>
              <View style={{flex: .6, justifyContent: 'center'}}>
                <TextInput
                  autoCapitalize="words"
                  autoCorrect={false}
                  isRequired={true}
                  onChange={ (e) => this._handleInputChange(e, "newUserData.firstName") }
                  onFocus={ (e) => this._scrollToInput(e, 'newUserData.firstName')}
                  placeholder=""
                  placeholderTextColor={YTColors.lightText}
                  ref="newUserData.firstName"
                  returnKeyType="default"
                  style={YTStyles.input}
                  value={this.state.newUserData.firstName}
                />
              </View>
            </View>
            <View style={YTStyles.separator}/>
            <View>
              <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5}}>
                <View style={{flex: .4, justifyContent: 'center', paddingLeft: 10}}>
                  <Text style={YTStyles.text}>Last Name:</Text>
                </View>
                <View style={{flex: .6, justifyContent: 'center'}}>
                  <TextInput
                    autoCapitalize="words"
                    autoCorrect={false}
                    isRequired={true}
                    onFocus={ (e) => this._scrollToInput(e, 'newUserData.lastName')}
                    onChange={ (e) => this._handleInputChange(e, "newUserData.lastName") }
                    placeholder=""
                    placeholderTextColor={YTColors.lightText}
                    ref="newUserData.lastName"
                    returnKeyType="default"
                    style={YTStyles.input}
                    value={this.state.newUserData.lastName}
                  />
                </View>
              </View>
              <View style={YTStyles.separator}/>
            </View>
            <View>
              <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5}}>
                <View style={{flex: .4, justifyContent: 'center', paddingLeft: 10}}>
                  <Text style={YTStyles.text}>Email:</Text>
                </View>
                <View style={{flex: .6, justifyContent: 'center'}}>
                  <TextInput
                    autoCapitalize="words"
                    autoCorrect={false}
                    editable={false}
                    isRequired={true}
                    keyboardType="email-address"
                    onChange={ (e) => this._handleInputChange(e, "newUserData.username") }
                    onFocus={ (e) => this._scrollToInput(e, 'newUserData.username')}
                    placeholder=""
                    placeholderTextColor={YTColors.lightText}
                    ref="newUserData.username"
                    returnKeyType="default"
                    style={YTStyles.input}
                    value={this.state.newUserData.username}
                  />
                </View>
              </View>
              <View style={YTStyles.separator}/>
            </View>
          <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
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
