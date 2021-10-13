/**
 * This set of hooks is how we'll interact with the productStore. The idea is to provide a simple api to get what
 * we need from the store without having to use `dispatch`, `connect`, `mapStoreToProps`, and all that stuff
 * in the components.
 */

 import { useEffect } from 'react';
 import { useSelector, useDispatch } from 'react-redux'
 import { usePagination } from '../../global/utils/customHooks';
 
 import apiUtils from '../../global/utils/api';
 
 // import all of the actions from the store
 import { // TODO: rename these so it still makes sense when we are importing selectors and action from other stores.
   selectListItems // call this selectProductListItems
   , fetchProductList
   , fetchListIfNeeded
   , selectSingleById
   , fetchSingleProduct
   , fetchDefaultProduct
   , sendCreateProduct
   , sendUpdateProduct
   , sendDeleteProduct
   , invalidateQuery
   , addProductToList
   , selectQuery
   , fetchSingleIfNeeded
 } from './productStore';
 
 
 // Define the hooks that we'll use to manage data in the components
 
 // CREATE
 
 /**
  * Use this hook to access the defaultProduct and the sendCreateProduct action
  * 
  * @returns an object containing the dispatched `sendCreateProduct` action and the fetch for the default product
  * @example // to use in a component
  * // access the create action and fetch the default product
  * const { sendCreateProduct, data: defaultProduct, ...productFetch } = useCreateProduct();
  * // dispatch the create action
  * sendCreateProduct(newProduct);
  */
 export const useCreateProduct = () => {
   const dispatch = useDispatch();
   const defaultProductFetch = useGetDefaultProduct();
   // return the default product fetch and the sendCreateProduct action
   return {
     sendCreateProduct: (newProduct) => dispatch(sendCreateProduct(newProduct))
     , ...defaultProductFetch
   }
 }
 
 // READ
 
 /**
  * NOTE: If you are using this because you want to create a new product, try `useCreateProduct`
  * instead. It returns the defaultProduct and the `sendCreateProduct` action in one go.
  * 
  * @param {boolean} forceFetch - optional override to force a fetch from the server
  * @returns an object containing fetch info and eventually the defaultProduct (as `data`)
  * @returns a refetch function for convenience (will probably never be used for default product, but keeps things consistent)
  */
 export const useGetDefaultProduct = (forceFetch = false) => {
   const dispatch = useDispatch();
 
   useEffect(() => {
     // fetch the default product if required
     if(forceFetch) {
       dispatch(fetchDefaultProduct())
     } else {
       dispatch(fetchSingleIfNeeded('defaultProduct'))
     }
     // this is the dependency array. useEffect will run anytime one of these changes
   }, [forceFetch, dispatch]);
 
   // get the query status from the store
   const { status, error } = useSelector(store => selectQuery(store, 'defaultProduct'));
 
   // get current item (if it exists)
   const defaultProduct = useSelector(store => selectSingleById(store, 'defaultProduct'));
 
   const isFetching = status === 'pending' || status === undefined;
   const isLoading = isFetching && !defaultProduct;
   const isError = status === 'rejected';
   const isSuccess = status === 'fulfilled';
   const isEmpty = isSuccess && !defaultProduct;
    
   // return the info for the caller of the hook to use
   return {
     data: defaultProduct
     , error
     , isFetching
     , isLoading
     , isError
     , isSuccess
     , isEmpty
     , refetch: () => dispatch(fetchDefaultProduct())
   }
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
     // only fetch if we need to
     if(forceFetch) {
       dispatch(fetchSingleProduct(id));
     } else {
       dispatch(fetchSingleIfNeeded(id))
     }
     // this is the dependency array. useEffect will run anytime one of these changes
   }, [id, forceFetch, dispatch]);
 
   // get the query status from the store
   const { status, error } = useSelector(store => selectQuery(store, id));
   // get current product data (if it exists)
   const product = useSelector(store => selectSingleById(store, id));
 
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
 
   // handle pagination right here as part of the fetch so we don't have to call usePagination every time from each component
   // this also allows us to prefetch the next page(s)
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
     if(forceFetch) {
       dispatch(fetchProductList(queryString));
     } else {
       dispatch(fetchListIfNeeded(queryString));
     }
   }, [queryString, forceFetch, dispatch]);
 
   // get the query info from the store
   const { status, error, totalPages, ids } = useSelector(store => selectQuery(store, queryString));
 
   // get current list items (if they exist)
   const products = useSelector(store => selectListItems(store, queryString));
 
   const isFetching = status === 'pending' || status === undefined;
   const isLoading = isFetching && !products;
   const isError = status === 'rejected';
   const isSuccess = status === 'fulfilled';
   const isEmpty = isSuccess && !products.length;
 
   if(totalPages) {
     // add totalPages from the query to the pagination object
     pagination.totalPages = totalPages;
   }
 
   // PREFETCH
 
   // if we are using pagination we can fetch the next page(s) now
   const nextQueryString = listArgs.page && listArgs.page < totalPages ? apiUtils.queryStringFromObject({ ...listArgs, page: Number(listArgs.page) + 1 }) : null;
 
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
  * Use this hook to fetch a product and access the `sendUpdateProduct` action
  * 
  * Under the hood it combines `useGetProductById` and `useUpdateProduct` in a more convenient package
  * 
  * @param {string} id - the id of the product to be fetched and updated.
  * @returns an object containing the sendUpdateProduct function and the fetch for the product id passed in
  * @example // to use in a component
  * // access the update action and fetch the product
  * const { sendUpdateProduct, data: product, ...productFetch } = useUpdateProduct(productId);
  * // dispatch the update action
  * sendUpdateProduct(updatedProduct);
  */
 export const useGetUpdatableProduct = (id) => {
   // use the existing hook to fetch the product
   const productFetch = useGetProductById(id);
   // use the existing hook to access the update action
   const { sendUpdateProduct } = useUpdateProduct();
   return {
     // return the update action and the product fetch
     sendUpdateProduct: sendUpdateProduct
     , ...productFetch
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
     // return the update action
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
   const product = useSelector(store => selectSingleById(store, id));
   return product
 }
 
 
 // idea to get some computed info that relies on a complicated set of fetches. This is adapted from the higher order component GcSovData from flip factory
 // export const useGcSovData = (sovId) => {
 
 //   // leverage existing stuff to get related resource info
 //   const { data: sov, ...sovFetch } = useGetSov(sovId);
 //   const { data: lineItems, ...lineItemFetch } = useGetLineItemList({ _sov: sovId });
 //   const { data: lineChangeOrders, ...lineChangeOrderFetch } = useGetLineChangeOrderList({ _sov: sovId });
 //   const { data: contracts, ...contractFetch } = useGetContractList({ _sov: sovId });
 //   const { data: contractChangeOrders, ...contractChangeOrderFetch } = useGetContractChangeOrderList({ _sov: sovId });
 //   const { data: phases, ...phaseFetch } = useGetPhaseList({ _sov: sovId });
 
 //   const isFetching = (
 //     sovFetch.isFetching
 //     || lineItemFetch.isFetching
 //     || lineChangeOrderFetch.isFetching
 //     || contractFetch.isFetching
 //     || contractChangeOrderFetch.isFetching
 //     || phaseFetch.isFetching
 //   )
 
 //   const isLoading = (
 //     sovFetch.isLoading
 //     || lineItemFetch.isLoading
 //     || lineChangeOrderFetch.isLoading
 //     || contractFetch.isLoading
 //     || contractChangeOrderFetch.isLoading
 //     || phaseFetch.isLoading
 //   )
 
 //   const isError = (
 //     sovFetch.isError
 //     || lineItemFetch.isError
 //     || lineChangeOrderFetch.isError
 //     || contractFetch.isError
 //     || contractChangeOrderFetch.isError
 //     || phaseFetch.isError
 //   )
 
 //   const isSuccess = (
 //     sovFetch.isSuccess
 //     && lineItemFetch.isSuccess
 //     && lineChangeOrderFetch.isSuccess
 //     && contractFetch.isSuccess
 //     && contractChangeOrderFetch.isSuccess
 //     && phaseFetch.isSuccess
 //   )
 
 //   const phaseTotals = !isSuccess ?
 //         sovUtils.getSovPhaseTotals({
 //           contractsByLineItem: _.groupBy(contracts, '_lineItem')
 //           , invoicesByContract: _.groupBy(invoices, '_contract')
 //           , phaseListItems: phases
 //         })
 //         :
 //         null
 
 //   // return the info for the caller of the hook to use
 //   return {
 //     data: phaseTotals,
 //     isFetching,
 //     isLoading,
 //     isError,
 //     isSuccess
 //   }
 
 // }
 