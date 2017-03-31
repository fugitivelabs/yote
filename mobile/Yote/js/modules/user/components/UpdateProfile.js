// import react things
import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import Base from '../../../global/components/BaseComponent';
import { connect } from 'react-redux';


// import react-native components
import ListView from 'ListView';
import Dimensions from 'Dimensions';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';
import Image from 'Image';
import ScrollView from 'ScrollView';
import TouchableOpacity from 'TouchableOpacity';
import TextInput from 'TextInput';
import Alert from 'Alert';
import Picker from 'Picker';


// import custom components
import YTTouchable from '../../../global/components/YTTouchable';
import YTButton from '../../../global/components/YTButton';
import FinishButton from '../../../global/components/FinishButton';
import YTHeader from '../../../global/components/YTHeader';
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTCard from '../../../global/components/YTCard';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as singleActions from '../userActions.js';


// import styles
import YTColors from '../../../global/styles/YTColors';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YTColors.primaryHeader,
    // padding: 5
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: YTColors.lightBackground,
    padding: 4,
  },
  instructions: {
    textAlign: 'center',
    color: '#222',
    marginBottom: 5,
  },

  btnWrapper: {
    borderTopWidth: 1,
    borderColor: YTColors.listSeparator,
  },
  inputContainer: {
    // padding: 10,
    borderTopWidth: 1,
    // borderBottomColor: '#CCC',
    // borderColor: 'transparent'
    borderColor: YTColors.listSeparator
  },
  input: {
    height: 52,
    flex: 1,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  username: {
    height: 52,
    flex: 1,
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
  },
  details: {
    height: 52,
    flex: 1,
    fontSize: 17,
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
    marginTop: -8
  },
  picker: {
    width: 150,
  },
  pickerText: {
    fontSize: 20,
  },

});

class UpdateProfile extends Base {
  constructor(props){
    super(props);
    this.state = {
      isFormValid: false
      , showPicker: false
      , newUserData: {
        username: this.props.user.username
        , firstName: this.props.user.firstName
        , lastName: this.props.user.lastName
        // , info: {
        //   profilePicUrl: this.props.user.info.profilePicUrl
        // }
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

  componentWillReceiveProps(nextProps) {
    // this.setState({newUserData: nextProps.user});

  }

  componentDidMount() {
    // console.log("componentDidMount");
    // console.log(this.props.user);
    // this.setState({newUserData: this.props.user});
    // this._checkFormValid();
  }

  componentWillUnmount() {
    // console.log("componentWillUnmount");
    // this.setState({newUserData: null});
  }

  _toggleShowPickerForm() {
    this.setState({showPicker: !this.state.showPicker});
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
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text;
    });
    // console.log("input changed");
    this.setState(newState);
    this._checkFormValid();
  }

  _handleAction() {
    // console.log("_handleAction fired");

    const { dispatch, user } = this.props;
    const { newUserData } = this.state;
    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "All fields are required.");
      return;
    }
    dispatch(singleActions.sendUpdateProfile(newUserData)).then((res) => {
      this.props.navigator.pop();
    });
  }

  _openImagePicker() {
    ImagePicker.showImagePicker((response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      }
      else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source;

        // You can display the image using either data...
        source = { uri: 'data:image/jpeg;base64,' + response.data };

        // Or a reference to the platform specific asset location
        if (Platform.OS === 'android') {
          source = { uri: response.uri };
        } else {
          source = { uri: response.uri.replace('file://', '') };
        }
        // console.log(source);
        this.setState({
          profilePicUrl: source
        });
        // console.log(this.state.profilePicUrl);
      }
    });
  }

  _handleBack() {
    // console.log("_handleBack fired");
    this.setState({newUserData: this.props.user});
    this.props.navigator.pop();
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

  render() {
    const { user, isFetching } = this.props;
    const { newUserData, showPicker } = this.state;

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/wile.png');


    const leftItem = {
      title: 'Cancel',
      onPress: () => this._handleBack(),
    };

    return(

      <View style={[styles.container ]} >
        <YTHeader
          navigator={navigator}
          leftItem={leftItem}
          title="Edit Profile"
        />
        <ScrollView ref="myScrollView" keyboardDismissMode="interactive" style={[styles.scrollContainer]} >
          <YTCard
            header="You"
          >
            <View style={styles.formWrapper}>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
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
                  returnKeyType="next"
                  value={this.state.newUserData.firstName}
                  onSubmitEditing={(event) => {
                    this.refs['newUserData.lastName'].focus();
                  }}
                />
              </View>
              <View style={styles.inputContainer}>

                <Text style={styles.label}>Last Name</Text>
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
                  returnKeyType="next"
                  value={this.state.newUserData.lastName}
                  onSubmitEditing={(event) => {
                    this.refs['newUserData.username'].focus();
                  }}
                />
              </View>
              <View style={styles.inputContainer}>

                <Text style={styles.label}>Email/Username</Text>
                <Text style={styles.username}>{this.state.newUserData.username} </Text>
              </View>
            </View>

          </YTCard>
          <View style={[styles.buttonWrapper, {paddingVertical: 20}]}>
            <YTButton
              onPress={this._handleAction}
              caption={isFetching ? "Please wait..." : "Update my profile"}
              isDisabled={!this.state.isFormValid}
            />
          </View>

        </ScrollView>


      </View>
    )



  }

}



const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user,
    isFetching: store.user.loggedIn.isFetching,
  }
}

export default connect(mapStoreToProps)(UpdateProfile);
