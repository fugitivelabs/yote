import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AutoForm from 'react-auto-form';

const New = ({ createAction }) => {
  const post = {}
  return (
    <div className="post-create yt-container">
      <h1>CREATE NEW POST</h1>
      <hr />
      <div className="yt-row center-horiz">
        <div className="form-container card">
          <AutoForm className="post-create-form" onSubmit={createAction}>
            <div className="input-group">
              <label htmlFor="title"> Title </label>
              <input
                type="text"
                name="title"
                placeholder="Post Title"
                value={post.title}
              />
            </div>
            <div className="input-group">
              <label htmlFor="content"> Content </label>
              <textarea
                type="text"
                name="content"
                placeholder="Post Content"
                value={post.content}
              />
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                name="isPublished"
                value={post.isPublished}

              />
              <label htmlFor="isPublished"> Publish </label>
            </div>
            <div className="input-group">
              <div className="yt-row space-between">
                <Link className="yt-btn link" to={'/posts'}> Cancel</Link>
                <button className="yt-btn" type="submit"> Create Post </button>
              </div>
            </div>
          </AutoForm>
        </div>
      </div>
    </div>
  )
}

New.propTypes = {
  createAction: PropTypes.func.isRequired
}

export default New
