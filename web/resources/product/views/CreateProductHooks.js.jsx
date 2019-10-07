

import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, useStore } from 'react-redux'

import { useLocation, useHistory } from "react-router"

// import product components
import ProductForm from '../components/ProductForm.js.jsx';
import ProductLayout from '../components/ProductLayout.js.jsx';

// import actions
import * as productActions from '../productActions';

// import custom hooks
import useForm from '../../../global/utils/customHooks';



const CreateProductHooks = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [resource, handleChange, handleSubmit] = useForm();

  useEffect(() => {
    dispatch(productActions.fetchDefaultProduct().then(productRes => {
      if(productRes.success) {
        handleChange(productRes.defaultObj);
      }
    }));
  }, []) // The array passed here is a list of values that if changed will rerun this effect. In this case we only want the initial value, the empty array means never rerun it.
  return (
    <ProductLayout>
      <Breadcrumbs links={location.state.breadcrumbs} />
      {isEmpty ?
        <h2> Loading...</h2>
        :
        <ProductForm
          product={resource}
          cancelLink="/products"
          formTitle="Create Product"
          formType="create"
          handleFormChange={handleChange}
          handleFormSubmit={() => handleSubmit(dispatch(productActions.sendCreateProduct(resource)))}
        />
      }
    </ProductLayout>
  )
}

export default CreateProductHooks