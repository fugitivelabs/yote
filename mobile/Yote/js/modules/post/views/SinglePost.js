/**
 * Displays a single post by the postId sent from props and the postStore 
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Alert
  , Dimensions
  , Image
  , ListView
  , Platform
  , ScrollView
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native';

// import global components
import ActionButton from '../../../global/components/ActionButton';
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as postActions from '../postActions';

// import styles
import postStyles from '../postStyles';
import YTColors from '../../../global/styles/YTColors';

class SinglePost extends Base {
  constructor(props){
    super(props);
    this._bind(
      '_closeModal'
      , '_openEdit'
    )
  }

  componentDidMount() {
    const { postId } = this.props.navigation.state.params;
    this.props.dispatch(postActions.fetchSinglePostById(postId));
  }

  _closeModal() {
    this.props.navigation.goBack();
  }

  _openEdit() {
    // console.log("open update post");
    const { postId } = this.props.navigation.state.params;
    this.props.navigation.navigate('UpdatePost', {postId: postId});
  }

  render() {
    const { postStore } = this.props;
    const { postId } = this.props.navigation.state.params;
    let post = postStore[postId];
    // console.log(post);

    const leftItem = {
      icon: require('../../../global/img/back.png'),
      layout: 'icon',
      onPress: this._closeModal,
    }

    const rightItem = {
      title: "Edit",
      onPress: this._openEdit,
    };

    return(
      <View style={postStyles.container}>
        <YTHeader
          leftItem={leftItem}
          title={'Single Post'}
        />
        <ScrollView>
          <View style={postStyles.cell}>
            <Text style={[postStyles.headerLeft, {padding: 5}]}>Single Post </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

SinglePost.propTypes = {
  postId: PropTypes.string
}

const mapStoreToProps = (store) => {

  return {
    userStore: store.user
    , postStore: store.post
  }
}

export default connect(mapStoreToProps)(SinglePost);
