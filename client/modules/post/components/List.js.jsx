import React from 'react';
import { Router, Link } from 'react-router';

import Post from "../PostHandler";

//CAN'T HAVE THIS HERE. it will initiate the call every time the module is imported.
// better to have it in componentWillMount()
// //initialize stores
// Post.Actions.requestPostsList();

//get/set initial state
let getPostsListState = () => {
	console.log("get app state called in posts list");
	return {
		posts: Post.Store.list()
	}
}

class List extends React.Component{

	constructor(props, context) {
		super(props);
		this.state = getPostsListState();
		this._onChange = this._onChange.bind(this); //lolwut
	}

	componentWillMount() {
		//initialize stores
		Post.Actions.requestPostsList();
	}

	componentDidMount() {
	   Post.Store.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
	  Post.Store.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState(getPostsListState());
	}

	render() {
		return(
			<div className="post-list">
				<h1>LIST POSTS: {this.state.posts.length} found</h1>
				<Link to={'/posts/new'}> NEW POST </Link>
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