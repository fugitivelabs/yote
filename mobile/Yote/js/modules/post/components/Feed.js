// import react/redux dependencies
import React, { PropTypes } from 'react';
import Base from '../../../global/components/BaseComponent';
import { connect } from 'react-redux';
// import react-native components & apis
import View from 'View';
import Text from 'Text';
import StyleSheet from 'StyleSheet';
import TouchableOpacity from 'TouchableOpacity';
import TextInput from 'TextInput'; 
import RefreshControl from 'RefreshControl'; 
import _ from 'lodash'; 
import Platform from 'Platform'; 


// import custom components
import YTHeader from '../../../global/components/YTHeader';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import ScrollContainer from '../../../global/components/ScrollContainer';
import ScrollView from 'ScrollView';  
import EmptyMessage from '../../../global/components/EmptyMessage'; 


// import Styles
import postStyles from '../postStyles'; 

// import actions
import * as postActions from '../actions/postActions'; 
// import * as postActions from '../../post/postActions.js'; 
// import * as commentActions from '../../comment/commentActions'; 
// import { listActions as userListActions } from '../..//user/actions';


class Feed extends Base {
  constructor(props) {
    super(props);
    this.state = {
      newPostContent: ""
      , showNewPost: false
      , perPage: 100 
      , refreshing: false
    }
    this._bind(
      '_closeModal'
      , '_handleSubmitPost'
      , '_toggleShowPostForm'
      , '_handlePostChange'
      , '_onRefresh'
      , '_handleOpenDrawer'
      , '_openProfile'
    );
  }

  componentWillMount() { 
    this.props.dispatch(postActions.fetchList()); 
  }

  _closeModal() {
    this.props.navigator.pop();
  }

  _toggleShowPostForm() {
    this.setState({showNewPost: !this.state.showNewPost}); 
  }

  _handlePostChange(e, target) { 
    var newState = _.update( this.state, target, function() {
      return e.nativeEvent.text; 
    })
    var newPost = e.target.value;
    this.setState(newState);
  }

  _handleSubmitPost() {
    const { dispatch } = this.props; 

    var newPost = {};
    newPost.content = this.state.newPostContent;
    // console.log(newPost); 

    dispatch(postActions.sendCreatePost(newPost)).then((action) => {
      if(action.success) {
          this.setState({
            newPostContent: ""
            , showNewPost: false 
          });

      } else {
        alert(action.message);
      }
    });

  }

  _onRefresh() {
    console.log('refreshin'); 
    this.setState({refreshing: true}); 
    this.props.dispatch(postActions.fetchList()).then(() => {
      this.setState({refreshing: false}); 
    });
  }

  _handleOpenDrawer() {
    this.context.openDrawer();  
  }

  _openProfile() {
    
    this.props.navigator.push({profile: true});

  }

  render() {

    const { navigator, user, posts, fetchingUsers, fetchingPosts, fetchingComments, comments, users, squadPostList, paginatedList, sortedList, pagination } = this.props; 
    const { showNewPost, newPostContent } = this.state;  

    // const sortedEmpty = sortedList.length === 0; 
 
    // let disableSubmit = newPostContent.length > 0 ? false : true;  

    let postList = posts.list.all.items;  

    const androidLeftItem = {
      onPress: this._handleOpenDrawer,
      icon: require('../../../global/components/img/bulletList.png'),
      layout: "icon",
    }

    const rightItem = {
      onPress: this._toggleShowPostForm
      , icon: require('../../../global/img/plus.png')
    }

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/wile.png');
    const leftItem = {

      onPress: () => this._openProfile(),
      image: profileImg,
      layout: "image",
    };

    if(fetchingUsers) {
      // console.log("fetchingUsers"); 
      return(
        <EmptyMessage
          message="Loading..."
        />
      )
    }

    return (
      <View style={postStyles.container}>
        <YTHeader
          title="Feed"
          leftItem={leftItem}
          rightItem={rightItem}
          />
        
        { showNewPost ? 
          <View style={postStyles.comment}>
            <TextInput
              name="newPostContent"
              value={newPostContent}
              multiline={true}
              placeholder="New Post"
              returnKeyType="send"
              blurOnSubmit={true}
              onChange={(e) => this._handlePostChange(e, 'newPostContent')}
              style={postStyles.input}>
            </TextInput>
            
            <View>
              <YTButton
                caption="Submit"
                onPress={(e) => this._handleSubmitPost(e)}
                
              />
              <YTButton
                type="secondary"
                caption="Cancel"
                onPress={(e) => this._toggleShowPostForm(e)}
              />
            </View>
          </View>
          : null
        }

        <ScrollView
          style={postStyles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}/>
          }>
          
          {postList.map((postId, i) =>
            <View key={i} style={{borderWidth: 1, borderColor: 'black', margin: 5}}>
              <Text style={postStyles.content}>{posts.map[postId].title} </Text>
              <Text style={postStyles.caption}>{posts.map[postId].content} </Text>
            </View>
          )}
          
          

        </ScrollView>
      </View>
    )
  }
}

Feed.propTypes = {
  dispatch: PropTypes.func
}

Feed.contextTypes = {
  openDrawer: React.PropTypes.func
}

const mapStoreToProps = (store) => {
  
  // let postList = store.post.lists;
  // let postMap = store.post.map;
  // let sortedList = postList.items.map((id)=> {
  //   var newItem = postMap[id];
  //   return newItem;
  // });
  // // console.log(sortedList); 

  // sortedList = _.orderBy(sortedList, ['updated'], ['desc']);

  // // apply pagination
  // let pagination = postList.pagination;
  // var start = (pagination.page - 1) * pagination.per;
  // var end = start + pagination.per;
  // var paginatedList = _.slice(sortedList, start, end);


  // console.log("sorted List ", sortedList); 
  // console.log("Paginated List: ", paginatedList); 




  return {
    user: store.user,
    users: store.user.itemMap,
    fetchingUsers: store.user.isFetching,
    posts: store.post,
    fetchingPosts: store.post.list.isFetching,
    // fetchingComments: store.comment.list.isFetching,
    comments: store.comment,
    // postList,
    // sortedList,
    // paginatedList,
    // pagination
  }
}

export default connect(
  mapStoreToProps
)(Feed);
