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
	}

	_handleFormChange(event) {
		//this works WAY better than having a separate onChange for every input box
		// just make sure input name attr == state name
		var newState = {};
		newState[event.target.name] = event.target.value;
		console.log(newState);
		this.setState(newState);
	}


	render() {
		return(
			<div className="post-create">
				<h1>CREATE NEW POST</h1>
				<form className="post-create-form">
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