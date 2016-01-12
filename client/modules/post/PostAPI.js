import axios from "axios";
import PostActions from "./PostActions";

let urlBase = "/api/posts";

var PostAPI = {
	getAllPosts() {
		console.log("get posts called in API");
		return axios.get(urlBase).then((res) => {
			if(res.data.success == true) {
				console.log("retrieved " + res.data.posts.length + " objects from server");
				PostActions.receivedPostsList(res.data.posts);
			} else {
				console.log("ERROR failed to retrieve objects from server");
			}
		}).catch((err) => {
			console.log("ERROR retrieving posts list");
			console.log(err);
		});
	}
	, getPost(postId) {
		console.log("get single post called in API");
		return axios.get(urlBase + "/" + postId).then((res) => {
			if(res.data.success == true) {
				console.log("retrieved post with id = " + postId);
				PostActions.receivedSinglePost(res.data.post);
			} else {
				console.log("ERROR failed to retrieve post from server");
			}
		}).catch((err) => {
			console.log("ERROR retrieving post");
			console.log(err);
		});
	}
}

export default PostAPI;