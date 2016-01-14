import AppDispatcher from "../../../dispatcher";
import AppEventEmitter from "../../../AppEventEmitter";
import PostConstants from "./PostConstants";

let _posts = [];
let _post = {};

class PostEventEmitter extends AppEventEmitter {
	list() {
		console.log("get all posts called in store");
		return _posts;
	}
	get() {
		console.log("get single post called in store");
		return _post;
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
		default:
			break;
	}
});

export default PostStore;