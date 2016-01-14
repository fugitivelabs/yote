import React from 'react';
import { Router, Route, Link } from 'react-router';

import PostList from './List.js.jsx';
import PostView from './View.js.jsx';
import PostCreate from './Create.js.jsx';

import Post from "../PostHandler";

//THIS DOES NOT WORK YET AND AS SUCH IS NOT IMPORTED BY ANY OTHER MODULES
//LEAVING FOR LATER USE

class PostRouter extends React.Component{
	constructor(props, context) {
		console.log("POST ROUTER LOADED");
		super(props);
	}

	render() {
		console.log("POST ROUTER RENDER");
		return(
			<Router path="/">
		        <Route path="/posts" component={PostList} />
		        <Route path="/posts/new" component={PostCreate} />
		        <Route path="/posts/:postId" component={PostView} />
	        </Router> 
		)
	}
}

export default PostRouter;