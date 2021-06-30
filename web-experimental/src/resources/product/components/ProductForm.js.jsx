/**
 * Reusable stateless form component for Product
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from '../../../global/utils/customHooks';

// import form components
// import { TextInput, TextAreaInput } from '../../../global/components/forms';

import { TextInput } from '../../../global/components/forms'

const ProductForm = ({
  cancelLink
  , disabled
  , formTitle
  , formType
  // , handleFormChange
  , handleFormSubmit
  , product
}) => {

  const [ updatedProduct, handleChange ] = useForm(product); // pass product as initialState

  // set the button text
  const buttonText = formType === "create" ? "Create Product" : "Update Product";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h2> {formTitle} </h2><hr /></div> : <div />;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(updatedProduct)
  }

  return (
    <div className="form-container">
      <form name="productForm" className="product-form" onSubmit={handleSubmit}>
        {header}
        <TextInput
          name="title"
          label="Title"
          value={updatedProduct.title || ""}
          change={handleChange}
          disabled={disabled}
          required={true}
        />
        <TextInput
          name="description"
          label="Description"
          value={updatedProduct.description || ""}
          change={handleChange}
          disabled={disabled}
          required={true}
        />
        <div className="input-group">
          <div className="yt-row space-between">
            <Link
              // we can disable links using the pointer-events attribute
              // more info: https://stackoverflow.com/questions/10276133/how-to-disable-html-links/10276157#10276157
              className={`yt-btn link ${disabled && 'pointer-events-none'}`}
              to={cancelLink}
              // disable a link!
              // style={disabled ? { pointerEvents: 'none' } : null}
            >
              Cancel
            </Link>
            <button disabled={disabled} className="yt-btn " type="submit" > {buttonText} </button>
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
  // , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , product: PropTypes.object.isRequired
}

ProductForm.defaultProps = {
  disabled: false
  , formTitle: ''
}

export default ProductForm;
