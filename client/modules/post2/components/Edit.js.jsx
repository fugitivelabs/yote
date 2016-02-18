import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AutoForm from 'react-auto-form';

const Edit = ({ post, changeAction, submitAction }) => {
  return (
    <div className="post-edit yt-container">
      <h1>EDIT POST</h1>
      <hr />
      <div className="yt-row center-horiz">
        <div className="form-container card">
          <AutoForm className="post-create-form" onSubmit={submitAction}>
            <div className="input-group">
              <label htmlFor="title"> Title </label>
              <input
                type="text"
                name="title"
                placeholder="Post Title"
                value={post.title}
                onChange={changeAction}
              />
            </div>
            <div className="input-group">
              <label htmlFor="content"> Content </label>
              <textarea
                type="text"
                name="content"
                placeholder="Post Content"
                value={post.content}
                onChange={changeAction}
              />
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                name="isPublished"
                value={post.isPublished}
                onChange={changeAction}
              />
              <label htmlFor="isPublished"> Publish </label>
            </div>
            <div className="input-group">
              <div className="yt-row space-between">
                <Link className="yt-btn link" to={'/posts'}> Cancel</Link>
                <button className="yt-btn" type="submit"> Edit Post </button>
              </div>
            </div>
          </AutoForm>
        </div>
      </div>
    </div>
  )
}

Edit.propTypes = {
  post: PropTypes.object.isRequired
  , changeAction: PropTypes.func.isRequired
  , submitAction: PropTypes.func.isRequired
}

export default Edit
