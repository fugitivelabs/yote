/**
 * Reusable stateless form component for Product
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import global components
import Button from '../../../global/components/base/Button';

// hooks
import { useFormState } from '../../../global/utils/customHooks';

// import form components
import { TextInput } from '../../../global/components/forms'

const ProductForm = ({
  cancelLink
  , disabled
  , formTitle
  , formType
  , handleFormSubmit
  , product
}) => {

  // use the helper to handle product state
  const [updatedProduct, handleChange] = useFormState(product); // pass product as initialState

  // set the button text
  const buttonText = formType === "create" ? "Create Product" : "Update Product";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h2> {formTitle} </h2><hr /></div> : <div />;
  
  const handleSubmit = e => {
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
            <Button
              disabled={disabled}
              link={cancelLink}
              skin="white"
            >
              Cancel
            </Button>
            <Button
              disabled={disabled}
              type="submit"
            >
              {buttonText}
            </Button>
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
  , handleFormSubmit: PropTypes.func.isRequired
  , product: PropTypes.object.isRequired
}

ProductForm.defaultProps = {
  disabled: false
  , formTitle: ''
}

export default ProductForm;
