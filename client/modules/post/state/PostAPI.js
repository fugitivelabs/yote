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

	, createPost(postData) {
		console.log("create post called in API");
		return axios.post(urlBase, postData).then((res) => {
			if(res.data.success == true) {
				console.log("created post in API");
				PostActions.receivedCreatePost(res.data.post);
			} else {
				console.log("ERROR failed to create post");
				console.log(res.data);
			}
		}).catch((err) => {
			console.log("ERROR creating post");
			console.log(err);
		});
	}

	, updatePost(postData) {
		console.log("update post called in API");
		return axios.put(urlBase + "/" + postData._id, postData).then((res) => {
			if(res.data.success == true) {
				console.log("updated post in API");
				PostActions.receivedUpdatePost(res.data.post);
			} else {
				console.log("ERROR failed to update post");
				console.log(res.data);
			}
		}).catch((err) => {
			console.log("ERROR updating post");
			console.log(err);
		});
	}
}

export default PostAPI;