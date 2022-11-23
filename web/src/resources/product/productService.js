/**
 * This set of hooks is how we'll interact with the productStore. The idea is to provide a simple api to get what
 * we need from the store without having to use `dispatch`, `connect`, `mapStoreToProps`, and all that stuff
 * in the components.
 */

import { useSelector, useDispatch } from 'react-redux'
import apiUtils from '../../global/utils/api';
import { selectSingleById } from '../../global/utils/storeUtils';

// import all of the actions from the store
import {
  fetchProductList
  , fetchListIfNeeded
  , fetchSingleProduct
  , sendCreateProduct
  , sendUpdateProduct
  , sendDeleteProduct
  , invalidateQuery
  // , invalidateQueries
  , addProductToList
  , fetchSingleIfNeeded
} from './productStore';
import {
  useGetResourceById
  , useGetResourceList
  , useMutateResource
} from '../../global/utils/serviceHooks';


// Define the hooks that we'll use to manage data in the components

// CREATE

/**
 * Use this hook to handle the creation of a new product.
 * @param {Object} initialState - The initial state of the product (optional)
 * @param {Function} handleResponse - The function to call when the product is successfully created
 * 
 * @returns an object containing fetch info and the following:
 * - `newProduct` as `data`: the new product object as it currently exists in state, initially the default product
 * - `handleChange`: standard form change handler to be used in the form
 * - `handleSubmit`: standard form submit handler to be used in the form
 * - `setFormState`: a way to handle form state changes in the component instead of `handleChange`, rarely needed but sometimes necessary
 * @example // to use in a component
 * // access the create action and fetch the default product
 * const { data: newProduct, handleChange, handleSubmit, ...productQuery } = useCreateProduct({
 *   // optional, anything we want to add to the default object
 *   initialState: {
 *     someKey: 'someValue'
 *   }
 *   // optional, callback function that receives the response from the server
 *   , handleResponse: (product, error) => {
 *     if(error || !product) {
 *       alert(error || "An error occurred.")
 *     }
 *     history.push(`/products/${product._id}`)
 *   }
 * });
 * 
 * return (
 *   <WaitOn query={productQuery}>
 *     <ProductForm
 *       product={product}
 *       handleSubmit={handleSubmit}
 *       handleChange={handleChange}
 *     />
 *   </WaitOn>
 * )
 */
export const useCreateProduct = ({ initialState = {}, onResponse = () => { } }) => {
  const dispatch = useDispatch();
  // set up product specific stuff to be used by the shared hook
  const defaultProductQuery = useGetDefaultProduct();
  const sendMutation = (mutatedProduct) => dispatch(sendCreateProduct(mutatedProduct));

  // the hook will return everything the caller needs to create a new product
  return useMutateResource({ resourceQuery: defaultProductQuery, sendMutation, initialState, onResponse });
}

// READ

/**
 * NOTE: If you are using this because you want to create a new product, try `useCreateProduct`
 * instead. It handles everything for you!
 * 
 * @param {boolean} forceFetch - optional override to force a fetch from the server
 * @returns an object containing fetch info and eventually the defaultProduct (as `data`)
 * @returns a refetch function for convenience (will probably never be used for default product, but keeps things consistent)
 */
export const useGetDefaultProduct = (forceFetch = false) => {
  // leverage existing hooks to get the default product (using 'default' as the id will return the default product from the server)
  return useGetProductById('default', forceFetch);
}


/**
 * This hook will check for a fresh product in the store and fetch a new one if necessary
 * 
 * @param {string} id - the id of the product to be fetched
 * @param {boolean} forceFetch - optional override to force a fetch from the server
 * @returns an object containing fetch info and eventually the product (as `data`)
 * @returns an invalidate and refetch function for convenience
 */
export const useGetProductById = (id, forceFetch = false) => {
  const dispatch = useDispatch();
  // set up product specific stuff to be used by the shared hook
  const productStore = useSelector(({ product }) => product);
  const fetchProduct = forceFetch ? fetchSingleProduct : fetchSingleIfNeeded;
  const sendFetchById = (id) => dispatch(fetchProduct(id));
  const sendInvalidateSingle = (id) => dispatch(invalidateQuery(id));

  // return the (now product specific) hook
  return useGetResourceById({ id, fromStore: productStore, sendFetchById, sendInvalidateSingle });

}

/**
 * This hook will check for a fresh list in the store and fetch a new one if necessary
 * 
 * @param {object} listArgs - an object used to construct the query
 * @param {boolean} forceFetch - optional override to force a fetch from the server
 * @returns an object containing fetch info and eventually the product list (as `data`)
 * @returns an invalidate and refetch function for convenience
 */
export const useGetProductList = (listArgs = {}, forceFetch = false) => {
  const dispatch = useDispatch();
  // set up product specific stuff to be used by the shared hook
  const productStore = useSelector(({ product }) => product);
  const fetchProducts = forceFetch ? fetchProductList : fetchListIfNeeded;
  const sendFetchList = (queryString) => dispatch(fetchProducts(queryString));
  const sendInvalidateList = (queryString) => dispatch(invalidateQuery(queryString));

  // return the (now product specific) hook
  return useGetResourceList({ listArgs, fromStore: productStore, sendFetchList, sendInvalidateList });
}

// UPDATE

/**
 * Use this hook to access the `sendUpdateProduct` action
 * 
 * Useful if you want to update a product that you already have access to
 * 
 * NOTE: Check out `useGetUpdatableProduct` if you want to fetch and update a product
 * 
 * @returns the sendUpdateProduct action wrapped in dispatch
 * @example // to use in a component
 * // access the update action
 * const { sendUpdateProduct } = useUpdateProduct();
 * // dispatch the update action
 * sendUpdateProduct(updatedProduct);
 */
export const useUpdateProduct = () => {
  const dispatch = useDispatch();
  return {
    // return the update action
    sendUpdateProduct: (updatedProduct) => dispatch(sendUpdateProduct(updatedProduct))
  }
}

/**
 * Use this hook to handle the update of an existing product.
 * @param {string} id - the id of the product to be updated.
 * @param {Object} options - an object that expects an optional onResponse function that receives the updated product and error.
 * 
 * @returns an object containing fetch info and the following:
 * - `product` as `data`: the product object as it currently exists in state
 * - `handleChange`: standard form change handler to be used in the form
 * - `handleSubmit`: standard form submit handler to be used in the form
 * - `setFormState`: a way to handle form state changes in the component instead of `handleChange`, rarely needed but sometimes necessary
 * @example // to use in a component
 * // fetch the product and access everything needed to handle updating it
 * const { data: product, handleChange, handleSubmit, ...productQuery } = useGetUpdatableProduct(productId, {
 *   // optional, callback function to run after the request is complete
 *   onResponse: (updatedProduct, error) => {
 *     if(error || !updatedProduct) {
 *       alert(error || "An error occurred.")
 *     }
 *     history.push(`/products/${productId}`)
 *   }
 * });
 * 
 * return (
 *   <WaitOn query={productQuery}>
 *     <ProductForm
 *       product={product}
 *       handleSubmit={handleSubmit}
 *       handleChange={handleChange}
 *     />
 *   </WaitOn>
 * )
 */
export const useGetUpdatableProduct = (id, { onResponse = () => { } } = {}) => {
  const dispatch = useDispatch();
  // set up product specific stuff to be used by the shared hook
  // use the existing hook to get the productQuery
  const productQuery = useGetProductById(id);
  const sendMutation = (mutatedProduct) => dispatch(sendUpdateProduct(mutatedProduct));
  // return the (now product specific) hook
  return useMutateResource({ resourceQuery: productQuery, sendMutation, onResponse });

}


// DELETE

/**
 * Use this hook to access the `sendDeleteProduct` action
 * 
 * @returns the sendDeleteProduct action wrapped in dispatch
 * 
 * @example // to use in a component
 * // access the delete action
 * const { sendDeleteProduct } = useDeleteProduct();
 * // dispatch the delete action
 * sendDeleteProduct(productId);
 */
export const useDeleteProduct = () => {
  const dispatch = useDispatch();
  return {
    // return the delete action
    sendDeleteProduct: (id) => dispatch(sendDeleteProduct(id))
  }
}

// OTHERS

/**
 * @returns the `addProductToList` action wrapped in dispatch
 */
export const useAddProductToList = () => {
  const dispatch = useDispatch();
  return {
    addProductToList: (productId, listArgs) => dispatch(addProductToList({ id: productId, queryKey: apiUtils.queryStringFromObject(listArgs) || "all" }))
  }
}

/**
 * NOTE: Only use this if you're sure the product is already in the store. WILL NOT fetch from the server.
 * @param {string} id - the id of the product that you want to grab from the store
 * @returns the product from the store's byId map
 */
export const useProductFromMap = (id) => {
  const product = useSelector(({ product: productStore }) => selectSingleById(productStore, id));
  return product
}
