/**
 * Reusable stateless form component for Product
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import form components
import { NumberInput, TextInput, TextAreaInput } from '../../../global/components/forms';

function ProductForm({
  cancelLink
  , formTitle
  , formType
  , handleFormChange
  , handleFormSubmit
  , product
}) {

  // set the button text
  const buttonText = formType === "create" ? "Create Product" : "Update Product";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h2> {formTitle} </h2><hr/></div> : <div/>;

  return (
    <div className="yt-container">
      <div className="yt-row center-horiz">
        <div className="form-container -slim">
          <form name="productForm" className="product-form" onSubmit={handleFormSubmit}>
            {header}
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
              rows={3}
              placeholder="This is where the content goes..."
            />
            <NumberInput
              name="price"
              label="Price"
              currency={true}
              value={product.price}
              change={handleFormChange}
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
  cancelLink: PropTypes.string.isRequired
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , product: PropTypes.object.isRequired
}

ProductForm.defaultProps = {
  formTitle: ''
}

export default ProductForm;
