import React from 'react';
import { Router, Link } from 'react-router';
import Base from "../../../global/components/BaseComponent.js.jsx";

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

  componentWillMount() {
    console.log("mounting Post Create");
    console.log(this.context);
  }

  componentDidMount() {
    Post.Store.addChangeListener(this._onPostChange);
  }

  componentWillUnmount() {
    Post.Store.removeChangeListener(this._onPostChange);
  }

  _onPostChange() {
    //on change from the store, we know the post was created successfully, assuming it was empty before.
    console.log("CREATE:  post changed");
    console.log("CREATE SUCCESSFUL. NAVIGATE AWAY NOW.");
    this.context.router.replace("/posts");

    // this.transitionTo('/posts'); //doesnt work.
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
      <div className="post-create">
        <Link to={'/posts'}> Back to list</Link>
        <h1>CREATE NEW POST</h1>
        <form className="post-create-form" onSubmit={this._handleFormSubmit}>
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
          <button type="submit"> Create </button>
        </form>
      </div>
    )
  }
}