/**
 * sets up datasource and necessary functions for the ListView call
 * _renderRow is where each postId of the datasource is sent to PostTitleCard
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , ListView
  , Platform
  , RefreshControl
  , ScrollView
  , StyleSheet
  , Text
  , TouchableHighlight
  , View
} from 'react-native';

// import actions
import * as postActions from '../postActions';

// import global components
import Base from '../../../global/components/BaseComponent';

// import module components
import PostListItem from './PostListItem';

// import Styles
import postStyles from '../postStyles';
import YTColors from '../../../global/styles/YTColors';

// FIXME: Android has a bug when scrolling ListView the view insertions
// will make it go reverse. Temporary fix - pre-render more rows
const LIST_VIEW_PAGE_SIZE = Platform.OS === 'android' ? 20 : 1;


class PostList extends Base {
  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      contentHeight: 0,
      dataSource: cloneWithData(dataSource, props.posts),
      refreshing: false
    }
    this._bind(
      '_renderFooter'
      , '_onContentSizeChange'
      , '_renderRow'
      , '_renderSeparator'
      , '_handleRefresh'
      , '_openPost'
      , '_renderHeader'
    )
  }

  componentDidMount() {
    // let listViewScrollView = this.refs.templateList.getScrollResponder();
    // listViewScrollView.scrollTo({y:1});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.posts !== nextProps.posts || this.props.postStore !== nextProps.postStore) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.posts)
      });
    }
  }

  _onContentSizeChange(contentWidth: number, contentHeight: number) {
    if(contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight});
    }
  }

  _renderHeader() {
    // return (
    //   <View>
    //     <Text style={postStyles.header}> ListView Header! </Text>
    //   </View>)
  }

  _renderFooter() {
    // console.log("render Footer");
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View style={postStyles.listSeparator} key={rowID} />
    )
  }

  _renderRow(postId) {
    const { postStore } = this.props;
    return (
      <PostListItem
        post={postStore[postId]}
        onPress={() => this._openPost(postId)}
      />
    )
  }

  _handleRefresh() {
    this.setState({refreshing: true});
    this.props.dispatch(postActions.fetchList()).then(() => {
      // console.log("REFRESHED", this.state.refreshing);
      this.setState({refreshing: false});

    });
  }

  _openPost(postId) {
    console.log("open post", postId);
    // this.props.dispatch(myPostSingleActions.setCurrent(post._id));
    this.props.navigation.navigate('SinglePost', {postId: postId});
  }

  render() {
    const { contentInset, posts } = this.props;
    const isEmpty = !posts || posts.length < 1;
    const bottom = contentInset.bottom + Math.max(0, this.props.minContentHeight - this.state.contentHeight);

    let listFlex = isEmpty ? { flex: 1 } : { flex: 1 }; // ??? the same

    const refreshControl =
     <RefreshControl
       refreshing={this.state.refreshing}
       onRefresh={this._handleRefresh}
     />

   return (
     <View style={postStyles.container}>

       <ListView
         ref="templateList"
         initialListSize={10}
         pageSize={LIST_VIEW_PAGE_SIZE}
         dataSource={this.state.dataSource}
         renderRow={this._renderRow}
         renderHeader={this._renderHeader}
         renderFooter={this._renderFooter}
         renderSeparator={this._renderSeparator}
         enableEmptySections={true}
         onContentSizeChange={this._onContentSizeChange}
         scrollRenderAheadDistance={600}
         refreshControl={ refreshControl }
         removeClippedSubviews={false}
       />

     </View>
   )
  }


}

PostList.propTypes = {
  posts: PropTypes.array
  , contentInset: PropTypes.object
  , minContentHeight: PropTypes.number
}

PostList.defaultProps = {
  posts: [],
  contentInset: { top: 0, bottom: 0 },
  // TODO: This has to be scrollview height + fake header
  minContentHeight: Dimensions.get('window').height + 20,
  renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />,
}


function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    // console.log("RENDER AS ARRAY");
    return dataSource.cloneWithRows(data);
  }
  return dataSource.cloneWithRowsAndSections(data);
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
    , postStore: store.post
  }
}

export default connect(mapStoreToProps)(PostList);
