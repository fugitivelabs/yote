import React from 'react';
import { Router, Link } from 'react-router';

import Post from "../PostHandler";

//get/set initial state
let getPostViewState = () => {
  // console.log("get app state called in post view");
  return {
    post: Post.Store.get()
  }
}

export default class View extends React.Component{

  constructor(props, context) {
    super(props);
    this.state = getPostViewState();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    //request post from server
    Post.Actions.requestSinglePost(this.props.params.postId);
  }

  componentDidMount() {
    Post.Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Post.Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("SHOW:  post changed");
    this.setState(getPostViewState());
  }

  render() {
    return(
      <div className="post-view">
        <Link to={'/posts'}> Back to list</Link>
        <br />
        <Link to={`/posts/${this.state.post._id}/update`}> edit post</Link>
        <h1>VIEW POST</h1>
        <p>{this.state.post.title}</p>
        <p>{this.state.post.content}</p>
      </div>
    )
  }
}