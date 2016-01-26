import React from 'react';
import { Router, Link } from 'react-router';
import Base from "../../../global/components/BaseComponent.js.jsx";

import SelectFromArray from "../../../global/components/forms/SelectFromArray.js.jsx";

import Post from "../PostHandler";

export default class Create extends Base {

  constructor(props, context) {
    super(props);
    this.state = Post.Store.getBlankTemplate();

    this._bind('_handleFormChange', '_handleFormSubmit', '_onPostChange');
    // this._handleFormChange = this._handleFormChange.bind(this);
    // this._handleFormSubmit = this._handleFormSubmit.bind(this);
    // this._onChange = this._onChange.bind(this); 
  }

  // componentWillMount() {
  // }

  componentDidMount() {
    Post.Store.addChangeListener(this._onPostChange);
  }

  componentWillUnmount() {
    Post.Store.removeChangeListener(this._onPostChange);
  }

  _onPostChange() {
    this.context.router.push("/posts");
  }

  _onSelectChange(value) {
    // console.log("do soemthing", value);
  }

  _handleFormChange(e) {
    //this works WAY better than having a separate onChange for every input box
    // just make sure input name attr == state name
    var newPostState = this.state.post;
    newPostState[e.target.name] = e.target.value;
    this.setState(newPostState);
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
      <div className="post-create yt-container">
        <h1>CREATE NEW POST</h1>
        <hr />
        <div className="yt-row center-horiz">
          <div className="form-container card">
            <form className="post-create-form" onSubmit={this._handleFormSubmit}>
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
                <input 
                  type="checkbox"
                  name="isPublished"
                  value={this.state.post.isPublished}

                />
                <label htmlFor="isPublished"> Publish </label>
              </div>
              <div className="input-group">
                <div className="yt-row space-between">
                  <Link className="yt-btn link" to={'/posts'}> Cancel</Link>
                  <button className="yt-btn" type="submit"> Create Post </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}