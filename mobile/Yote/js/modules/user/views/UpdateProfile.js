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
import Alert from 'Alert';
import Dimensions from 'Dimensions';
import Image from 'Image';
import ImageBackground from 'ImageBackground'; 
import ImagePicker from 'react-native-image-picker';
import KeyboardAvoidingView from 'KeyboardAvoidingView'; 
import LinearGradient from 'react-native-linear-gradient';
import ListView from 'ListView';
import Picker from 'Picker';
import Platform from 'Platform';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

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

const IMAGE_HEIGHT = 150;

var styles = StyleSheet.create({
  bottomBorder: {
      borderBottomWidth: 1
      , borderColor: YTColors.listSeparator
  }
  , btnWrapper: {
      borderTopWidth: 1
      , borderColor: YTColors.listSeparator
  }
  , container: {
    backgroundColor: YTColors.primaryHeader
    , flex: 1
  }
  , details: {
      flex: 1
      , fontSize: 15
      , paddingTop: 8
      , paddingBottom: 8
      , backgroundColor: 'rgba(255,255,255,0.7)'
  }
  , editImage: {
      alignItems: 'center'
      , flex: 1
      , padding: 30
      , justifyContent: 'center'
  }
  , halfInput: {
      flex: 0.5
  }
  , info: {
      fontSize: 15
      , paddingVertical: 10
  }
  , infoBox: {
      flex: .8
      , justifyContent: 'center'
  }
  , infoWrapper: {
      flex: 1
      , flexDirection: 'row'
      , paddingHorizontal: 10
      , paddingVertical: 5
  }
  , inlineInput: {
      flexDirection: "row"
  }
  , input: {
      height: 40
      , flex: 1
      , fontSize: 15
      , padding: 5
      , color: YTColors.actionText
      , backgroundColor: 'rgba(255,255,255,0.7)'
      // backgroundColor: YTColors.lightBackground
  }
  , instructions: {
      textAlign: 'center'
      , color: '#222'
      , marginBottom: 5
  }
  , label: {
      fontSize: 15
      , fontWeight: '500'
  }
  , labelBox: {
      flex: .2
      , justifyContent: 'center'
  }
  , notes: {
      height: 104
  }
  , quarterInput: {
      flex: 0.25
  }
  , picker: {
      height: 200
      , width: Dimensions.get('window').width
  }
  , pickerText: {
      color: YTColors.actionText
      , fontSize: 20
      , textAlign: 'center'
  }
  , profilePic: {
      backgroundColor: YTColors.listSeparator
      , width: IMAGE_HEIGHT
      , height: IMAGE_HEIGHT
      , borderRadius: Platform.OS === 'ios' ? IMAGE_HEIGHT * .5 : null
  }
  , scrollContainer: {
      flex: 1
      , backgroundColor: '#fff'
      , padding: 5
  }
});

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
        style={styles.container}
      >
        <YTHeader
          leftItem={leftItem}
          title="Edit Profile"
        />
        <ScrollView ref="myScrollView" keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" style={[styles.scrollContainer]} >
          <View>
            <View style={styles.formWrapper}>
              <View style={styles.editImage}>
                <View style={{flex: 1, borderRadius: IMAGE_HEIGHT * .5}}>
                  <TouchableOpacity onPress={this._openImagePicker}>
                    <Image
                      style={styles.profilePic}
                      source={newProfilePic ? {uri: newProfilePic.uri} : profileImg}>
                      <LinearGradient colors={['rgba(0,0,0,0.11)', 'rgba(0,0,0,0.51)', 'rgba(0,0,0,0.81)']} style={{flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Image
                              source={require('../../../global/img/camera3.png')}
                              style={{opacity: .85}}
                            />
                          </View>
                        </View>
                      </LinearGradient>
                    </Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.infoWrapper}>
                <View style={{flex: .4, justifyContent: 'center', paddingLeft: 10}}>
                  <Text style={styles.label}>First Name:</Text>
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
                    style={styles.input}
                    value={this.state.newUserData.firstName}
                  />
                </View>
              </View>
              <View style={styles.bottomBorder}/>
              <View style={styles.inputContainer}>
                <View style={styles.infoWrapper}>
                  <View style={{flex: .4, justifyContent: 'center', paddingLeft: 10}}>
                    <Text style={styles.label}>Last Name:</Text>
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
                      style={styles.input}
                      value={this.state.newUserData.lastName}
                    />
                  </View>
                </View>
                <View style={styles.bottomBorder}/>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.infoWrapper}>
                  <View style={{flex: .4, justifyContent: 'center', paddingLeft: 10}}>
                    <Text style={styles.label}>Email:</Text>
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
                      style={styles.input}
                      value={this.state.newUserData.username}
                    />
                  </View>
                </View>
                <View style={styles.bottomBorder}/>
              </View>
            </View>
          <View style={[styles.buttonWrapper, {paddingVertical: 20}]}>
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
