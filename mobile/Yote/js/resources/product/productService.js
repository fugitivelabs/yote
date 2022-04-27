/**
 * This set of hooks is how we'll interact with the productStore. The idea is to provide a simple api to get what
 * we need from the store without having to use `dispatch`, `connect`, `mapStoreToProps`, and all that stuff
 * in the components.
 */

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { usePagination } from '../../global/utils/customHooks';

import apiUtils from '../../global/utils/api';

import {
  selectListItems
  , selectSingleById
  , selectQuery
} from '../../global/utils/storeUtils';

// import all of the actions from the store
import {
  fetchProductList
  , fetchListIfNeeded
  , fetchSingleProduct
  , sendCreateProduct
  , sendUpdateProduct
  , sendDeleteProduct
  , invalidateQuery
  , invalidateQueries
  , addProductToList
  , fetchSingleIfNeeded
} from './productStore';


// Define the hooks that we'll use to manage data in the components

// CREATE

/**
 * Use this hook to handle the creation of a new product.
 * @param {Object} initialState - The initial state of the product (optional)
 * @param {Function} handleResponse - The function to call when the product is successfully created
 * 
 * @returns an object containing fetch info and the following:
 * - `newProduct` as `data`: the new product object as it currently exists in state, initially the default product
 * - `handleFormChange`: standard form change handler to be used in the form
 * - `handleFormSubmit`: standard form submit handler to be used in the form
 * - `setFormState`: a way to handle form state changes in the component instead of `handleFormChange`, rarely needed but sometimes necessary
 * @example // to use in a component
 * // access the create action and fetch the default product
 * const { data: newProduct, handleFormChange, handleFormSubmit, ...productQuery } = useCreateProduct({
 *   // optional, anything we want to add to the default object
 *   initialState: {
 *     someKey: 'someValue'
 *   }
 *   // optional, callback function that receives the response from the server
 *   , handleResponse: (product, error) => {
 *     if(error || !product) {
 *       alert(error.message || "An error occurred.")
 *     }
 *     history.push(`/products/${product._id}`)
 *   }
 * });
 * 
 * return (
 *   <WaitOn query={productQuery}>
 *     <ProductForm
 *       product={product}
 *       handleFormSubmit={handleFormSubmit}
 *       handleFormChange={handleFormChange}
 *     />
 *   </WaitOn>
 * )
 */
export const useCreateProduct = ({ initialState = {}, onResponse = () => { } }) => {
  const dispatch = useDispatch();
  // STATE
  // set up a state variable to hold the product, start with what was passed in as initialState (or an empty object)
  const [newProduct, setFormState] = useState(initialState);
  // set up a state variable to hold the isCreating flag
  const [isCreating, setIsCreating] = useState(false)

  // FETCH
  // use the existing hook to get the default product
  const { data: defaultProduct, ...defaultProductQuery } = useGetDefaultProduct();

  useEffect(() => {
    // once we have the default product, set it to state
    if(defaultProduct) {
      // override default values with anything that was passed as initialState
      setFormState((currentState) => {
        return { ...defaultProduct, ...currentState }
      });
    }
  }, [defaultProduct])

  // FORM HANDLERS
  // setFormState will replace the entire product object with the new product object
  // set up a handleFormChange method to update nested state while preserving existing state(standard reducer pattern)
  const handleFormChange = e => {
    setFormState(currentState => {
      return { ...currentState, [e.target.name]: e.target.value }
    });
  }

  const handleFormSubmit = e => {
    // prevent the default form submit event if present
    e?.preventDefault && e.preventDefault();
    // set isCreating true so the component knows we're waiting on a response
    setIsCreating(true)
    // dispatch the create action
    dispatch(sendCreateProduct(newProduct)).then(response => {
      // set isCreating false so the component knows we're done waiting on a response
      setIsCreating(false)
      // send the response to the callback function
      onResponse(response.payload, response.error);
    })
  }

  // return everything the component needs to create a new product
  return {
    data: newProduct
    , handleFormChange
    , handleFormSubmit
    , setFormState // only used if we want to handle this in a component, will usually use handleFormChange
    , ...defaultProductQuery
    // override isFetching if we're waiting for the new product to get returned (for ui purposes)
    , isFetching: isCreating || defaultProductQuery.isFetching
  }
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

  useEffect(() => {
    if(id) {
      // only fetch if we need to
      if(forceFetch) {
        dispatch(fetchSingleProduct(id));
      } else {
        dispatch(fetchSingleIfNeeded(id));
      }
    } else {
      // no id yet, don't attempt fetch
      // console.log("still waiting for Product id");
    }
    // this is the dependency array. useEffect will run anytime one of these changes
  }, [id, forceFetch, dispatch]);

  // get the query status from the store
  const { status, error } = useSelector(({ product: productStore }) => selectQuery(productStore, id));
  // get current product data (if it exists)
  const product = useSelector(({ product: productStore }) => selectSingleById(productStore, id));

  const isFetching = status === 'pending' || status === undefined;
  const isLoading = isFetching && !product;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';
  const isEmpty = isSuccess && !product;

  // return the info for the caller of the hook to use
  return {
    data: product
    , error
    , isFetching
    , isLoading
    , isError
    , isSuccess
    , isEmpty
    , invalidate: () => dispatch(invalidateQuery(id))
    , refetch: () => dispatch(fetchSingleProduct(id))
  }
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
  /**
  * NOTE: tracking lists using the query string is easy because the `listArgs` passed into
  * dispatch(fetchProductList(listArgs)) are accessed in the store by using action.meta.arg.
  * We could try setting the queryKey to something different (or nesting it) but we'd need to figure
  * out how to access that info in the store. Maybe by passing it along as a named object like:
  * 
  * dispatch(fetchProductList({queryString: listArgs, queryKey: someParsedVersionOfListArgs}))
  * 
  */

  // first make sure all list args are present. If any are undefined we will wait to fetch.
  const readyToFetch = apiUtils.checkListArgsReady(listArgs);

  // handle pagination right here as part of the fetch so we don't have to call usePagination every time from each component
  // this also allows us to pre-fetch the next page(s)
  let { page, per } = listArgs;
  let pagination = usePagination({ page, per });

  if(page && per) {
    listArgs.page = pagination.page;
    listArgs.per = pagination.per;
  } else {
    pagination = {};
  }

  // convert the query object to a query string for the new server api
  // also makes it easy to track the lists in the reducer by query string
  const queryString = apiUtils.queryStringFromObject(listArgs) || "all";
  // console.log('queryString', queryString);

  useEffect(() => {
    if(readyToFetch) {
      if(forceFetch) {
        dispatch(fetchProductList(queryString));
      } else {
        dispatch(fetchListIfNeeded(queryString));
      }
    } else {
      // listArgs aren't ready yet, don't attempt fetch
      // console.log("still waiting for listArgs");
    }
  }, [readyToFetch, queryString, forceFetch, dispatch]);

  // get the query info from the store
  const { status, error, totalPages, ids } = useSelector(({ product: productStore }) => selectQuery(productStore, queryString));

  // get current list items (if they exist)
  const products = useSelector(({ product: productStore }) => selectListItems(productStore, queryString));

  const isFetching = status === 'pending' || status === undefined;
  const isLoading = isFetching && !products;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';
  const isEmpty = isSuccess && !products.length;

  // add totalPages from the query to the pagination object
  pagination.totalPages = totalPages || 0;

  // PREFETCH
  // if we are using pagination we can fetch the next page(s) now
  const nextQueryString = readyToFetch && listArgs.page && listArgs.page < totalPages ? apiUtils.queryStringFromObject({ ...listArgs, page: Number(listArgs.page) + 1 }) : null;

  useEffect(() => {
    if(nextQueryString) {
      // fetch the next page now
      dispatch(fetchListIfNeeded(nextQueryString))
    }
  }, [nextQueryString, dispatch]);

  // END PREFETCH

  // return the info for the caller of the hook to use
  return {
    ids
    , data: products
    , error
    , isFetching
    , isLoading
    , isError
    , isSuccess
    , isEmpty
    , invalidate: () => dispatch(invalidateQuery(queryString))
    , refetch: () => dispatch(fetchProductList(queryString))
    , pagination
  }
}


/**
 * This hook is designed to be used by a FLatList component for infinite scrolling.
 * It will fetch the next page of products and add them to the array when `getNextPage` is called.
 * 
 * @param {object} listArgs - an object used to construct the query
 * @param {boolean} forceFetch - optional override to force a fetch from the server
 * @returns an object containing fetch info and eventually the product list (as `data`)
 * @returns a `refresh` and `getNextPage` function designed to be used by FlatList
 */
export const useInfiniteProductList = (listArgs, forceFetch = false) => {
  const dispatch = useDispatch();
  // check force fetch to determine which action to use
  const fetchProducts = (query) => {
    if(forceFetch) return dispatch(fetchProductList(query));
    return dispatch(fetchListIfNeeded(query));
  }

  // keep track of the query keys so we can invalidate all pages on refresh
  const [queryKeys, setQueryKeys] = useState([]);

  // use the existing hook to control pagination
  const { page, per, setPage } = usePagination({ page: 1, per: 20 });

  // this will hold the accumulated pages of products. Each time page changes (and a fetch is made) the products will be added to this list. Each time the query changes the list will be cleared.
  const [productList, setProducts] = useState([]);

  // these will be updated on each fetch and returned to the component
  const [isFetching, setIsFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const isLoading = isFetching && !productList.length;
  const isError = !!error
  const isEmpty = !isFetching && !productList.length;

  // every time query changes reset the list and set the page to 1
  useEffect(() => {
    resetProductList();
  }, [listArgs, per]);

  // every time page changes fetch more products and add them to the list
  useEffect(() => {
    fetchNextProducts();
  }, [page]);

  const fetchNextProducts = () => {
    // if we're already fetching, don't do anything
    if(isFetching) return;
    // time to fetch next, clear any error and set fetching to true
    setError(null)
    setIsFetching(true);
    const productQuery = apiUtils.queryStringFromObject({ ...listArgs, page, per });
    // add the new query string to the array
    setQueryKeys(keys => ([...keys, productQuery]));
    // use the action defined at the top to fetch the next page
    fetchProducts(productQuery).then(productRes => {
      const { products: nextProducts = [], totalPages: nextTotalPages, totalCount: nextTotalCount, error } = productRes.payload;
      // add the new products to the list
      setError(error);
      setProducts((currentProducts) => [...currentProducts, ...nextProducts]);
      setTotalPages(nextTotalPages || 1);
      setTotalCount(nextTotalCount);
      setIsFetching(false);
    })
  }

  const resetProductList = () => {
    // clear the list and reset the page
    setProducts([]);
    if(page != 1) {
      // when page changes `fetchNextProducts` will be called
      setPage(1);
    } else {
      // still on first page, fetch manually
      fetchNextProducts();
    }
  }

  // to be used in a component
  const getNextPage = () => {
    const currentDataHasLoaded = !isFetching && productList.length > 0;
    const nextPageExists = page < totalPages;
    // when page changes `fetchNextProducts` will be called
    if(currentDataHasLoaded && nextPageExists) setPage(page + 1);
  }

  // to be used in a component
  const refresh = () => {
    dispatch(invalidateQueries(queryKeys))
    // clear current set of query keys
    setQueryKeys([]);
    resetProductList();
  }

  return {
    data: productList
    , isFetching
    , isLoading
    , isError
    , isEmpty
    , error
    , refresh
    , getNextPage
    , totalCount
  }
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
 * - `handleFormChange`: standard form change handler to be used in the form
 * - `handleFormSubmit`: standard form submit handler to be used in the form
 * - `setFormState`: a way to handle form state changes in the component instead of `handleFormChange`, rarely needed but sometimes necessary
 * @example // to use in a component
 * // fetch the product and access everything needed to handle updating it
 * const { data: product, handleFormChange, handleFormSubmit, ...productQuery } = useGetUpdatableProduct(productId, {
 *   // optional, callback function to run after the request is complete
 *   onResponse: (updatedProduct, error) => {
 *     if(error || !updatedProduct) {
 *       alert(error.message || "An error occurred.")
 *     }
 *     history.push(`/products/${productId}`)
 *   }
 * });
 * 
 * return (
 *   <WaitOn query={productQuery}>
 *     <ProductForm
 *       product={product}
 *       handleFormSubmit={handleFormSubmit}
 *       handleFormChange={handleFormChange}
 *     />
 *   </WaitOn>
 * )
 */
export const useGetUpdatableProduct = (id, { onResponse = () => { } } = {}) => {
  const dispatch = useDispatch();
  // STATE
  // set up a state variable to hold the product, start with an empty object
  const [updatedProduct, setFormState] = useState({});

  // FETCH
  // use the existing hook to get the product
  const { data: product, ...productQuery } = useGetProductById(id);

  useEffect(() => {
    // once we have the product, set it to state
    // this will also run when the update request is complete, because `product` will be updated, which is nice
    if(product) {
      setFormState({ ...product });
    }
  }, [product])

  // FORM HANDLERS
  // setFormState will replace the entire product object with the new product object
  // set up a handleFormChange method to update nested state while preserving existing state(standard reducer pattern)
  const handleFormChange = e => {
    setFormState(currentState => {
      return { ...currentState, [e.target.name]: e.target.value }
    });
  }

  const handleFormSubmit = e => {
    // prevent the default form submit event if present
    e?.preventDefault && e.preventDefault();
    // dispatch the update action then send the response to the callback function (successful or not)
    dispatch(sendUpdateProduct(updatedProduct)).then(response => {
      onResponse(response.payload, response.error);
    });
  }

  return {
    data: updatedProduct
    , handleFormChange
    , handleFormSubmit
    , setFormState // only used if we want to handle this in a component, will usually use handleFormChange
    , ...productQuery
  }
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
