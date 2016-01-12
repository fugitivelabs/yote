import React from 'react';
import { Router, Link } from 'react-router';

import PostAPI from "../PostAPI";
import PostActions from "../PostActions";
import PostStore from "../PostStore";
import PostConstants from "../PostConstants";

//get/set initial state
let getPostViewState = () => {
	console.log("get app state called in post view");
	return {
		post: PostStore.get()
	}
}

class List extends React.Component{

	constructor(props, context) {
		super(props);
		this.state = getPostViewState();
		this._onChange = this._onChange.bind(this); //lolwut
	}

	componentWillMount () {
		//request post from server
		PostActions.requestSinglePost(this.props.params.postId);
	}

	componentDidMount() {
		PostStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
	  PostStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState(getPostViewState());
	}

	render() {
		return(
			<div className="test">
				<h1>VIEW POST</h1>
				<p>{this.state.post.title}</p>
				<p>{this.state.post.content}</p>
			</div>
		)
	}
}

export default List;