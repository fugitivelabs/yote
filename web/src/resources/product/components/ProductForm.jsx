/**
 * Reusable stateless form component for Product
 */

// import primary libraries
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import global components


// import form components
import { CheckboxInput, TextInput } from '../../../global/components/forms'

const ProductForm = ({
  cancelLink
  , disabled
  , formTitle
  , formType
  , handleChange
  , handleSubmit
  , product
}) => {

  // set the button text
  const buttonText = formType === "create" ? "Create Product" : "Update Product";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h2> {formTitle} </h2><hr /></div> : <div />;

  return (
    <div className="form-container">
      <form name="productForm" className="product-form" onSubmit={handleSubmit}>
        {header}
        <TextInput
          name="title"
          label="Title"
          value={product.title || ""}
          change={handleChange}
          disabled={disabled}
          required={true}
        />
        <TextInput
          name="description"
          label="Description"
          value={product.description || ""}
          change={handleChange}
          disabled={disabled}
          required={true}
        />
        <CheckboxInput
          name="featured"
          label="Featured"
          value={product.featured || false}
          change={handleChange}
          disabled={disabled}
        />
        <div className="input-group">
          <div className="yt-row space-between">
            <Link
              to={cancelLink}
            >
              Cancel
            </Link>
            <button
              disabled={disabled}
              type="submit"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

ProductForm.propTypes = {
  cancelLink: PropTypes.string.isRequired
  , disabled: PropTypes.bool
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleChange: PropTypes.func.isRequired
  , handleSubmit: PropTypes.func.isRequired
  , product: PropTypes.object.isRequired
}

ProductForm.defaultProps = {
  disabled: false
  , formTitle: ''
}

export default ProductForm;
