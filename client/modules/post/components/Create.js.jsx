import React from 'react';
import { Router, Link } from 'react-router';

import Post from "../PostHandler";

let getPostCreateState = () => {
	return {
		title: ''
		, content: ''
	}
}

class List extends React.Component{

	constructor(props, context) {
		super(props);
		this.state = getPostCreateState();
		this._handleFormChange = this._handleFormChange.bind(this);
		this._handleFormSubmit = this._handleFormSubmit.bind(this);
	}

	_handleFormChange(e) {
		//this works WAY better than having a separate onChange for every input box
		// just make sure input name attr == state name
		var newState = {};
		newState[e.target.name] = e.target.value;
		// console.log(newState);
		this.setState(newState);
	}

	_handleFormSubmit(e) {
		e.preventDefault();
		var postData = {
			title: this.state.title.trim()
			, content: this.state.content.trim()
		}
		if(!postData.title || !postData.content) {
			console.log("FORM NOT FILLED OUT");
			return;
		} else {
			console.log("submitting");
			Post.Actions.requestCreatePost(postData);
		}
	}


	render() {
		return(
			<div className="post-create">
				<h1>CREATE NEW POST</h1>
				<form className="post-create-form" onSubmit={this._handleFormSubmit}>
					<input 
						type="text" 
						name="title" 
						placeholder="Post Title" 
						value={this.state.title} 
						onChange={this._handleFormChange}/>
					<br />
					<textarea 
						type="text" 
						name="content"
						placeholder="Post Content" 
						value={this.state.content} 
						onChange={this._handleFormChange} />
					<button type="submit"> Create </button>
				</form>
			</div>
		)
	}
}

export default List;