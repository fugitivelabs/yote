import React from 'react';
import { Router, Link } from 'react-router';
import Base from "../../../global/components/BaseComponent.js.jsx";

import Post from "../PostHandler";

export default class View extends Base{

  getState() {
    return {
      post: Post.Store.get()
    }
  }

  constructor(props, context) {
    super(props);
    this.state = this.getState();
    this._bind('_onPostChange');
  }

  componentWillMount () {
    //request post from server
    Post.Actions.requestSinglePost(this.props.params.postId);
  }

  componentDidMount() {
    Post.Store.addChangeListener(this._onPostChange);
  }

  componentWillUnmount() {
    Post.Store.removeChangeListener(this._onPostChange);
  }

  _onPostChange() {
    this.setState(this.getState());
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