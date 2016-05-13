import React, { PropTypes } from 'react'
import { Link } from 'react-router';

// import form components
import { TextInput, TextAreaInput, CheckboxInput } from '../../../global/components/forms';

const ProductForm = ({product, formType, handleFormSubmit, handleFormChange,  cancelLink, formTitle }) => {
  const buttonText = formType === "create" ? "Create Product" : "Update Product";
  const header = formTitle ? <div className="formHeader"><h1> {formTitle} </h1><hr/></div> : <div/>;
  return (
    <div className="yt-container">
      {header}
      <div className="yt-row center-horiz">
        <div className="form-container">
          <form name="productForm" className="card product-form" onSubmit={handleFormSubmit}>
            <TextInput
              name="title"
              label="Title"
              value={product.title}
              change={handleFormChange}
              placeholder="Title (required)"
              required={true}
              />
            <TextAreaInput
              name="description"
              label="Description"
              value={product.description}
              change={handleFormChange}
              required={false}
              placeholder="This is where the content goes..."
              />
            <TextInput
              name="price"
              label="Price"
              value={product.price}
              change={handleFormChange}
              placeholder="Price (US)"
              required={false}
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

ProductForm.propTypes = {
  product: PropTypes.object.isRequired
  , formType: PropTypes.string.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , cancelLink: PropTypes.string.isRequired
  , formTitle: PropTypes.string
}

export default ProductForm;
