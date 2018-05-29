/**
 * Will update the name and description of an already existing post
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// import react-native components
import {
  Image
  , KeyboardAvoidingView
  , Platform
  , ScrollView
  , StyleSheet
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native';

// import global components
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as postActions from '../postActions'

// import styles
import postStyles from '../postStyles';
import YTColors from '../../../global/styles/YTColors';

class UpdatePost extends Base {
  constructor(props) {
    super(props);
    const { selectedPost, postMap } = this.props;
    this.state = {
      isFormValid: false
      , newPostData: postMap[selectedPost.id] ? { ...postMap[selectedPost.id] } : {}
    }
    this._bind(
      '_closeModal'
      , '_handleAction'
      , '_handleInputChange'
      , '_checkFormValid'
      , '_openLibrary'
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

  _handleAction() {
    console.log("_handleAction fired");

    const { dispatch, user } = this.props;
    const { newPostData } = this.state;
    console.log(newPostData);
    if(!this.state.isFormValid) {
      Alert.alert("Whoops", "All fields are required.");
      return;
    }
    dispatch(postActions.sendUpdatePost(newPostData)).then((res) => {
      dispatch(postActions.invalidateList());
      dispatch(postActions.fetchListIfNeeded());
      this.props.navigation.goBack();
    });
  }

  _closeModal() {
    this.props.navigation.goBack();
  }

  _openLibrary() {
    // this.props.navigator.push({library: true});
  }

  _handleInputChange(e, target) {
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text;
    });
    this.setState(newState);
    this._checkFormValid();
  }

  _scrollToInput(e, refName) {
    setTimeout(() => {

      var scrollResponder = this.refs.myScrollView.getScrollResponder();
      // var scrollResponder = scrollView.getScrollRef();
      console.log("on focus called ", refName);
      console.log(this.refs[refName].props.returnKeyType);
      var offset = 130;
      console.log(offset);
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ReactNative.findNodeHandle(this.refs[refName]),
        offset, // adjust depending on your contentInset
        /* preventNegativeScrollOffset */ true
        // false
      );
    }, 150);
  }

  render() {

    const { isFetching } = this.props;
    const { newPostData, isFormValid } = this.state;
    const leftItem = {
      title: 'Cancel',
      onPress: this._closeModal
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : null}
        contentContainerStyle={{flex:1}}
        style={{flex: 1, backgroundColor: '#fff'}}
      >
        <YTHeader
          leftItem={leftItem}
          title="Update Post"
        />
      <ScrollView ref="myScrollView" keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" style={[postStyles.formWrapper]}>
          <View>
            <View style={{padding: 5}}>
              <TextInput
                autoCorrect={true}
                autoFocus={true}
                isRequired={true}
                onFocus={ (e) => this._scrollToInput(e, 'newPostData.name')}
                onChange={ (e) => this._handleInputChange(e, "newPostData.name") }
                placeholder="Name"
                placeholderTextColor={YTColors.lightText}
                ref="newPostData.name"
                returnKeyType="next"
                style={postStyles.input}
                underlineColorAndroid={YTColors.anagada}
                value={this.state.newPostData.name}
              />
            </View>
            <View style={postStyles.listSeparator}/>
          </View>
          <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
            <YTButton
              caption={isFetching ? "Updating..." : "Update Post"}
              isDisabled={!isFormValid || isFetching}
              onPress={this._handleAction}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStoreToProps = (store) => {

  return {
    isFetching: store.post.lists.all.isFetching
    , postMap: store.post.byId
    , selectedPost: store.post.selected
    , user: store.user.loggedIn.user
  }
}

export default connect(mapStoreToProps)(UpdatePost);
