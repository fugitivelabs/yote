import React from 'react';
import { Router, Link } from 'react-router';
import Base from "../../../global/components/BaseComponent.js.jsx";

import Post from "../PostHandler";

export default class Update extends Base{

  getState() {
    console.log("get app state called in post update");
    return {
      post: Post.Store.get()
    }
  }

  constructor(props, context) {
    super(props, context);
    this.state = this.getState();
    this._bind('_handleFormChange', '_handleFormSubmit', '_onPostChange');
  }

  componentWillMount() {
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

  _handleFormChange(e) {
    var newPostState = this.state.post;
    newPostState[e.target.name] = e.target.value;
    this.setState(newPostState);

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
      this.context.router.push("/posts/" + this.props.params.postId);
    }
  }

  render() {
    return(
      <div className="post-update yt-container">
        <h1>UPDATE POST</h1>
        <hr />
        <div className="yt-row center-horiz">
          <div className="form-container card">
            <form className="post-update-form" onSubmit={this._handleFormSubmit}>
              
              <div className="input-group">
                <label htmlFor="title"> Title </label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Post Title" 
                  value={this.state.post.title} 
                  onChange={this._handleFormChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="content"> Content </label>
                <textarea 
                  type="text" 
                  name="content"
                  placeholder="Post Content" 
                  value={this.state.post.content} 
                  onChange={this._handleFormChange} 
                />
              </div>
              <div className="input-group">
                <div className="yt-row space-between">
                  <Link className="yt-btn link" to={`/posts/${this.state.post._id}`}> Cancel</Link>
                  <button className="yt-btn" type="submit"> Save Changes </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}