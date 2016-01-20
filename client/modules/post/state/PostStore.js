import AppDispatcher from "../../../dispatcher";
import AppEventEmitter from "../../../AppEventEmitter";
import PostConstants from "./PostConstants";
import _ from "lodash";

let _posts = [];
let _post = {};


let _addMorePosts = (newPosts, callback) => {
  // something here handles pagination
  _posts.push(newPosts);
  callback();
}

let _template = { //should be immutable
  post: {
    title: ''
    , content: ''
  }
}

class PostEventEmitter extends AppEventEmitter {
  list() {
    console.log("get all posts called in store");
    return _posts;
  }
  get() {
    console.log("get single post called in store");
    return _post;
  }
  checkForPost(postId) {
    var _postIndex = _.findIndex(_posts, { _id: postId });
    return _postIndex < 0 ? false : true;
  }
  getBlankTemplate() {
    console.log("get blank post object in store");
    return _template;
  }
}

let PostStore = new PostEventEmitter();

AppDispatcher.register(action => {
  switch(action.actionType) {
    case PostConstants.RECEIVED_POSTS_LIST:
      console.log("store received posts list change");
      console.log(action);
      _posts = action.posts;
      PostStore.emitChange();
      break;
    case PostConstants.RECEIVED_POST:
      console.log("store received single post change");
      console.log(action);
      _post = action.post;
      PostStore.emitChange();
      break;
    case PostConstants.CREATED_POST:
      console.log("store received create post success");
      _post = action.post;
      PostStore.emitChange();
      break;
    case PostConstants.UPDATED_POST:
      console.log("store received update post success");
      _post = action.post;
      PostStore.emitChange();
      break;
    default:
      break;
  }
});

export default PostStore;