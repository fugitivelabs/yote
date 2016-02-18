import React, { PropTypes } from 'react'
import { Router, Link } from 'react-router';

// import form components
import TextInput from '../../../global/components/forms/TextInput.js.jsx';
import TextAreaInput from '../../../global/components/forms/TextAreaInput.js.jsx';

const NewsForm = ({post, formType, handleFormSubmit, handleFormChange  }) => {
  // const { post, type, handleFormSubmit, handleFormChange } = this.props;
  console.log(post);
  return (
    <div className="formContainer">
      <form name="newsForm" className="card news-form" onSubmit={handleFormSubmit}>
        <TextInput
          name="title"
          label="Title"
          value={post.title}
          change={handleFormChange}
          placeholder="title required"
          required={true}
          />
        <TextInput
          name="author"
          label="Author"
          value={post.author}
          placeholder="Author optional"
          change={handleFormChange}
          required={false}
          />
        <TextAreaInput
          name="content"
          label="Content"
          value={post.content}
          change={handleFormChange}
          required={true}
          placeholder="This is whre the content goes..."
          />
      </form>
    </div>
  )
}

NewsForm.propTypes = {
  post: PropTypes.object.isRequired
  , formType: PropTypes.string.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , handleFormChange: PropTypes.func.isRequired
}

export default NewsForm;
