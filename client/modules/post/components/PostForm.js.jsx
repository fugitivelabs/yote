/**
 * Reusable stateless form component for Post
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import form components
import { TextInput, TextAreaInput } from '../../../global/components/forms';

function PostForm({
  cancelLink
  , formHelpers
  , formTitle
  , formType
  , handleFormChange
  , handleFormSubmit
  , post
}) {

  // set the button text
  const buttonText = formType === "create" ? "Create Post" : "Update Post";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h2> {formTitle} </h2><hr/></div> : <div/>;

  return (
    <div className="yt-container">
      <div className="yt-row center-horiz">
        <div className="form-container -slim">
          <form name="postForm" className="post-form" onSubmit={handleFormSubmit}>
            {header}
            <TextInput
              change={handleFormChange}
              label="Title"
              name="title"
              placeholder="Title (required)"
              required={true}
              value={post.title}
            />
            <TextAreaInput
              name="content"
              label="Content"
              value={post.content}
              change={handleFormChange}
              required={true}
              rows={3}
              placeholder="This is where the content goes..."
            />
            <div className="input-group">
              <div className="yt-row space-between">
                <Link className="yt-btn link" to={cancelLink}>Cancel</Link>
                <button className="yt-btn " type="submit" > {buttonText} </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

PostForm.propTypes = {
  cancelLink: PropTypes.string.isRequired
  , formHelpers: PropTypes.object
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , post: PropTypes.object.isRequired
}

PostForm.defaultProps = {
  formHelpers: {}
  , formTitle: ''
}

export default PostForm;
