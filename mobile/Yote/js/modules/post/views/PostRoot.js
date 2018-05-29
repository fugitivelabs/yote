/**
 * Post component called from TabsView
 * sends postList as props to PostTitleList component for the ListView datasource
 */

// import react/redux dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components & apis
import {
  ActivityIndicator
  , ScrollView
  , StyleSheet
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native';

// import global components
import ActionButton from '../../../global/components/ActionButton';
import Base from '../../../global/components/BaseComponent';
import EmptyMessage from '../../../global/components/EmptyMessage';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import YTColors from '../../../global/styles/YTColors';
import YTHeader from '../../../global/components/YTHeader';

// import module components
import PostList from '../components/PostList';

// import actions
import * as postActions from '../postActions'

// import styles
import postStyles from '../postStyles';

class PostRoot extends Base {
  constructor(props) {
    super(props);
    this._bind(
     '_closeModal'
     , '_openNew'
     , '_sendDelete'
    );
  }

  componentDidMount() {
    this.props.dispatch(postActions.fetchListIfNeeded());
  }

  _closeModal() {
    this.props.navigation.goBack();
  }

  _openNew() {
    this.props.navigation.navigate('CreatePost');
  }

  _sendDelete(id) {
    this.props.dispatch(postActions.sendDelete(id)).then((res) => {
      this.props.dispatch(postActions.removePostFromList(id));
    })
  }

  render() {

    const {  postStore, navigation, user } = this.props;

    if(!postStore.lists.all || postStore.lists.all.isFetching) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator/>
        </View>
      )
    }
    let postList = postStore.lists.all ? postStore.lists.all.items : null;

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/default.png');

    const rightItem = {
      onPress: () => this._openNew()
      , icon: require('../../../global/img/plus.png')
      , layout: 'image'
    }

    const leftItem = {
      icon: require('../../../global/img/back.png'),
      layout: 'icon',
      onPress: this._closeModal,
    }

    return (
      <View style={{flex: 1}}>
        <YTHeader
          leftItem={leftItem}
          title="Post"
        >
        </YTHeader>

        <View style={{flex: 1}}>
          <PostList
            posts={postList}
            navigation={navigation}
          />
        </View>

      </View>
    )
  }
}

PostRoot.propTypes = {
  dispatch: PropTypes.func
}

const mapStoreToProps = (store) => {

  return {
    user: store.user
    , postStore: store.post

  }
}

export default connect(
  mapStoreToProps
)(PostRoot);
