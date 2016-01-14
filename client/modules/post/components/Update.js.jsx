import React from 'react';
import { Router, Link } from 'react-router';

import Post from "../PostHandler";

let getPostUpdateState = () => {
	console.log("get app state called in post update");
	return {
		post: Post.Store.get()
	}
}

class List extends React.Component{

	constructor(props, context) {
		super(props);
		this.state = getPostUpdateState();
		this._handleFormChange = this._handleFormChange.bind(this);
		this._handleFormSubmit = this._handleFormSubmit.bind(this);
		this._onChange = this._onChange.bind(this); 
	}

	componentWillMount() {
		Post.Actions.requestSinglePost(this.props.params.postId);
	}

	componentDidMount() {
		Post.Store.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
	  Post.Store.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState(getPostUpdateState());
	}

	_handleFormChange(e) {
		var newPostState = this.state.post;
		newPostState[e.target.name] = e.target.value;
		this.setState(newPostState);
		// console.log(this.state);
	}

	_handleFormSubmit(e) {
		e.preventDefault();
		console.log(this.state.post);
		var postData = this.state.post;
		if(!postData.title || !postData.content) {
			console.log("FORM NOT FILLED OUT");
			return;
		} else {
			console.log("submitting");
			Post.Actions.requestUpdatePost(postData);
		}
	}

	render() {
		return(
			<div className="post-create">
				<Link to={`/posts/${this.state.post._id}`}> Back to view</Link>
				<h1>UPDATE POST</h1>
				<form className="post-update-form" onSubmit={this._handleFormSubmit}>
					<input 
						type="text" 
						name="title" 
						placeholder="Post Title" 
						value={this.state.post.title} 
						onChange={this._handleFormChange}/>
					<br />
					<textarea 
						type="text" 
						name="content"
						placeholder="Post Content" 
						value={this.state.post.content} 
						onChange={this._handleFormChange} />
					<button type="submit"> SAVE </button>
				</form>
			</div>
		)
	}
}

export default List;