import React from 'react';
import { Router, Link } from 'react-router';

import PostAPI from "../PostAPI";
import PostActions from "../PostActions";
import PostStore from "../PostStore";
import PostConstants from "../PostConstants";

//initialize stores
PostActions.requestPostsList();

//get/set initial state
let getPostsListState = () => {
	console.log("get app state called in posts list");
	return {
		posts: PostStore.list()
	}
}

class List extends React.Component{

	constructor(props, context) {
		super(props);
		this.state = getPostsListState();
		this._onChange = this._onChange.bind(this); //lolwut
	}

	componentDidMount() {
	   PostStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
	  PostStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState(getPostsListState());
	}

	render() {
		return(
			<div className="post-list">
				<h1>LIST POSTS: {this.state.posts.length} found</h1>
				{ this.state.posts.map(post => 
					<div key={post._id}>
						<p>
							<Link to={`/posts/${post._id}`}> {post.title}</Link>
						</p>
					</div>
				)}
			</div>
		)
	}
}

export default List;