/**
* Allows the current user to update basic information
* first name, last name, etc (not username)
*/

// import react things
import React, { PropTypes } from 'react';
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
  container: {
    flex: 1,
    backgroundColor: YTColors.primaryHeader,
    // padding: 5
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#222',
    marginBottom: 5,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: YTColors.listSeparator,
  },
  btnWrapper: {
    borderTopWidth: 1,
    borderColor: YTColors.listSeparator,
  },
  inputContainer: {
    // paddingHorizontal: 5,
    // borderTopWidth: 1,
    // // borderBottomColor: '#CCC',
    // // borderColor: 'transparent'
    // borderColor: YTColors.listSeparator
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 15,
    padding: 5,
    color: YTColors.actionText,
    backgroundColor: 'rgba(255,255,255,0.7)'
    // backgroundColor: YTColors.lightBackground
  },
  details: {
    flex: 1,
    fontSize: 15,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  inlineInput: {
    flexDirection: "row"
  },
  quarterInput: {
    flex: 0.25
  },
  halfInput: {
    flex: 0.5
  },
  notes: {
    height: 104,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: YTColors.lightText,
  },
  formWrapper: {

  },
  picker: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  pickerText: {
    fontSize: 20,
    textAlign: 'center',
    color: YTColors.actionText
  },
  infoWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  labelBox: {
    flex: .2,
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    // flex: .2,
  },
  infoBox: {
    flex: .8,
    justifyContent: 'center',
  },
  info: {
    fontSize: 15,
    paddingVertical: 10,
  },
  editImage: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    justifyContent: 'center',
  },
  profilePic: {
    width: IMAGE_HEIGHT,
    height: IMAGE_HEIGHT,
    backgroundColor: YTColors.listSeparator,
    borderRadius: Platform.OS === 'ios' ? IMAGE_HEIGHT * .5 : null,
  },
});

class UpdateProfile extends Base {
  constructor(props){
    super(props);
    this.state = {
      isFormValid: false
      , showPicker: false
      , newProfilePic: null
      , newUserData: {
        username: this.props.user.username
        , firstName: this.props.user.firstName
        , lastName: this.props.user.lastName
      }
    }
    this._bind(
      '_handleBack'
      , '_handleAction'
      , '_handleInputChange'
      , '_checkFormValid'
      , '_toggleShowPickerForm'
      ,'_openImagePicker'
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
        behavior={"padding"}
        style={styles.container}
        contentContainerStyle={{flex:1}}
      >
        <YTHeader
          title="Edit Profile"
          leftItem={leftItem}
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
                    ref="newUserData.firstName"
                    onFocus={ (e) => this._scrollToInput(e, 'newUserData.firstName')}
                    isRequired={true}
                    style={styles.input}
                    autoCapitalize="words"
                    placeholder=""
                    placeholderTextColor={YTColors.lightText}
                    autoCorrect={false}
                    onChange={ (e) => this._handleInputChange(e, "newUserData.firstName") }
                    returnKeyType="default"
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
                      ref="newUserData.lastName"
                      onFocus={ (e) => this._scrollToInput(e, 'newUserData.lastName')}
                      isRequired={true}
                      style={styles.input}
                      autoCapitalize="words"
                      placeholder=""
                      placeholderTextColor={YTColors.lightText}
                      autoCorrect={false}
                      onChange={ (e) => this._handleInputChange(e, "newUserData.lastName") }
                      returnKeyType="default"
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
                      ref="newUserData.username"
                      onFocus={ (e) => this._scrollToInput(e, 'newUserData.username')}
                      isRequired={true}
                      editable={false}
                      style={styles.input}
                      autoCapitalize="words"
                      placeholder=""
                      placeholderTextColor={YTColors.lightText}
                      autoCorrect={false}
                      onChange={ (e) => this._handleInputChange(e, "newUserData.username") }
                      keyboardType="email-address"
                      returnKeyType="default"
                      value={this.state.newUserData.username}
                    />
                  </View>
                </View>
                <View style={styles.bottomBorder}/>
              </View>
            </View>
          <View style={[styles.buttonWrapper, {paddingVertical: 20}]}>
            <YTButton
              onPress={this._handleAction}
              caption={isFetching ? "Please wait..." : "Update my profile"}
              isDisabled={!this.state.isFormValid || isFetching}
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
    user: store.user.loggedIn.user,
    isFetching: store.user.isFetching
  }
}

export default connect(mapStoreToProps)(UpdateProfile);
