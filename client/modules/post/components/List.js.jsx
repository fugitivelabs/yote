import React from 'react';
import { Router, Link } from 'react-router';
import Base from "../../../global/components/BaseComponent.js.jsx";

import Post from "../PostHandler";

export default class List extends Base{

  getState() {
    //we could shorten this even further by just calling "setState({posts: Post.Store.list()})" instead of having it be it's own method.
    console.log("get app state called in posts list");
    return {
      posts: Post.Store.list()
    }
  }

  constructor(props, context) {
    super(props);
    this.state = this.getState();
    this._bind('_onChange');
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
    this.setState(this.getState());
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