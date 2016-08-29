import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import {
  TextInput,
  TextAreaInput,
  CheckboxInput,
  SelectFromArray,
  SimpleArrayEditor,
} from '../../../global/components/forms';

const PostForm = ({post, formType, handleFormSubmit, handleFormChange,  cancelLink, formTitle }) => {
  const buttonText = formType === "create" ? "Create Post" : "Update Post";
  const header = formTitle ? <div className="formHeader"><h1> {formTitle} </h1><hr/></div> : <div/>;
  return (
    <div className="yt-container">
      {header}
      <div className="yt-row center-horiz">
        <div className="form-container">
          <form name="postForm" className="card post-form" onSubmit={handleFormSubmit}>
            <TextInput
              name="title"
              label="Title"
              value={post.title}
              change={handleFormChange}
              placeholder="Title (required)"
              required={true}
            />
            <TextAreaInput
              name="content"
              label="Content"
              value={post.content}
              change={handleFormChange}
              required={true}
              placeholder="This is where the content goes..."
            />
            <CheckboxInput
              name="featured"
              label="Featured"
              value={post.featured}
              change={handleFormChange}
            />
            <SelectFromArray
              name="status"
              label="Status:"
              items={["draft","published","featured"]}
              value={post.status}
              change={handleFormChange}
            />
            <SimpleArrayEditor
              name="tags"
              label="Keywords/Tags"
              items={post.tags}
              arrayType="string"
              change={handleFormChange}
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
  post: PropTypes.object.isRequired
  , formType: PropTypes.string.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , cancelLink: PropTypes.string.isRequired
  , formTitle: PropTypes.string
}

export default PostForm;
