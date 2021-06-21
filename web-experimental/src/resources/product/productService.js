/**
 * 
 * This file is basically our actions and reducers all rolled into one. Redux toolkit query handles
 * caching, invalidating, and refetching data from defined endpoints. It works a lot like the original
 * yote reducers but has some other tricks as well.
 * 
 * It uses "tags" to keep track of lists. We set these tags by adding a "providesTags" function to a query.
 * When we want to invalidate a list (on mutation like create, update, or delete) we make sure that action has
 * an "invalidateTags" function.
 * 
 * More info on this:
 * https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#automated-re-fetching
 * https://redux-toolkit.js.org/rtk-query/api/createApi#providestags
 * 
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import apiUtils from '../../global/utils/api';

// import { createEntityAdapter } from '@reduxjs/toolkit'; // https://redux-toolkit.js.org/api/createEntityAdapter
// this can be used to create a standardized map from an array of objects returned by the server.
// Returns an object like this: { ids: [1,2,3], entities: {1: {_id: 1, name: "first"}, 2: {_id: 2, name: "second"}, etc...} }
// May revisit this later, but seems like overkill at the moment.
// const mapAdapter = createEntityAdapter({
//   // Assume IDs are stored in a field other than `item.id`
//   selectId: (item) => item._id,
//   // Keep the "all IDs" array sorted based on title. Not sure when we would use the all IDs array though.
//   sortComparer: (a, b) => a.title.localeCompare(b.title)
// })


// Define a service using a base URL and expected endpoints
export const productService = createApi({
  reducerPath: 'product', // this is the name of the reducer that will deal with the data received from the fetches below.
  baseQuery: fetchBaseQuery({ baseUrl: '/api/products' }), // this will preface all fetches so we only need to add "/..." for each query below
  tagTypes: ['Products'],
  endpoints: (builder) => ({

    // CREATE
    createProduct: builder.mutation({
      query: body => ({
        url: `/`,
        method: 'POST',
        body
      }),
      transformResponse: (response) => response.product, // response looks like {success: true, product: {...}} we only want response.product
      // Invalidates all Product-type queries of type 'Products', after all, depending of the sort order,
      // that newly created product could show up in any list.
      invalidatesTags:  () => [{ type: 'Products' }],
    }),

    // READ
    // fetch single
    productById: builder.query({
      query: (id) => `/${id}`, // endpoint will be "/api/products/id"
      transformResponse: (response) => response.product, // response looks like {success: true, product: {...}} we only want response.product
      providesTags: (product, error, id) => [{ type: 'Products', id }],
    }),
    // fetch list
    // Provides a list of `Products` using yote style listArgs.
    productList: builder.query({
      query: (listArgs) => apiUtils.getEndpointFromListArgs('/', listArgs),
      transformResponse: (response) => response.products,
      // If any mutation is executed that invalidates any of these tags, this query will re-run to be always up-to-date.
      // listArgs id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Products` element was added.
      providesTags: (products, error, listArgs) =>
        // is result available?
        products ?
        // successful query
        [
          ...products.map((product) => ({ type: 'Products', id: product._id })),
          { type: 'Products', id: listArgs }
        ]
        :
        // an error occurred, but we still want to refetch this query when `{ type: 'Products', id: listArgs }` is invalidated
        [{ type: 'Products', id: listArgs }]
    }),
    // Provides an id map of `Products` using yote style listArgs.
    productIdMap: builder.query({
      query: (listArgs) => apiUtils.getEndpointFromListArgs('/', listArgs),
      transformResponse: (response) => apiUtils.convertListToMap(response.products, '_id'), // converts the products array to an object like this {1: {_id: 1, name: "first"}, 2: {_id: 2, name: "second"}, etc...}
      // If any mutation is executed that invalidates any of these tags, this query will re-run to be always up-to-date.
      // listArgs id is a "virtual id" we use to be able to invalidate this query specifically if a new `Products` element was added.
      providesTags: (productMap, error, listArgs) =>
        // is result available?
        productMap ?
        // successful query
        [
          ...Object.keys(productMap).map((productId) => ({ type: 'Products', id: productId })),
          { type: 'Products', id: listArgs }
        ]
        :
        // an error occurred, but we still want to refetch this query when `{ type: 'Products', id: listArgs }` is invalidated
        [{ type: 'Products', id: listArgs }]
    }),

    // fetch default
    defaultProduct: builder.query({
      query: () => `/default`, // endpoint will be "/api/products/id"
      transformResponse: (response) => response.defaultObj,
    }),

    // UPDATE
    updateProduct: builder.mutation({
      query: ({ _id, ...updates }) => ({
        url: `/${_id}`,
        method: 'PUT',
        body: updates, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(updates)`
      }),
      transformResponse: (response) => response.product,
      // Invalidates all queries that subscribe to this Product `id` only.
      // In this case, `productById` will be re-run. `productList` *might*  rerun, if this id was under its results.
      invalidatesTags: (product, error, {_id}) => [{ type: 'Products', id: _id }],
    }),

    // DELETE
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      // Invalidates all queries that subscribe to this Product `id` only.
      // In this case, `productById` will be re-run. `productList` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    extraReducers: (builder) => {
      builder
        .addCase(productService.endpoints.productList.matchFulfilled, (state, action) => {
          console.log('state', state);
          console.log('action', action);
      })
    }
  }),
  
  /**
   * Still considering storing all results in a byId map.
   * Would require using matching??? https://redux-toolkit.js.org/api/matching-utilities https://redux-toolkit.js.org/rtk-query/api/created-api/endpoints#matchers
   * 
   */
})

// Export generated hooks for usage in functional components
// These are generated with the useGetThingQuery naming convention. Might as well rename the exports.
export const {
  useCreateProductMutation: useCreateProduct,
  useDefaultProductQuery: useDefaultProduct,
  useProductByIdQuery: useSingleProduct,
  useProductListQuery: useProductList,
  useProductIdMapQuery: useProductIdMap,
  useUpdateProductMutation: useUpdateProduct,
} = productService;



// helpers

/**
 * A helper hook to get a single product from an existing list.
 * 
 * It uses the RTK Query `useQueryState` and `selectFromResult` functions but saves us the boilerplate.
 * 
 * @param {string} productId - the _id of the product object to be plucked from the list.
 * @param {[string]} listArgs - the same `listArgs` array that was used to fetch the list in the parent component.
 * 
 * @example const { product } = useProductFromList(productId, listArgs);
 * 
 * @links
 * `useQueryState` https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usequerystate
 * `selectFromResult` https://redux-toolkit.js.org/rtk-query/usage/queries#selecting-data-from-a-query-result
 */

export const useProductFromList = (productId, listArgs) => {
  // return the generated useProductList with the selectFromResult callback and boilerplate
  return productService.endpoints.productList.useQueryState(listArgs, {
    selectFromResult: ({ data }) => ({
      product: data?.find((product) => product._id === productId),
    }),
  })
}

// Will select the product with the given id from the existing list (or will fetch the list) and will only rerender if the given product's data changes
// Not really useful in this context, but could become useful.
// This actually works pretty well for singles as it doesn't make a fetch when you click through from productList to this view but will fetch the list if you reload on single. Could be interesting.
// more info: https://redux-toolkit.js.org/rtk-query/usage/queries#query-hook-options
// const { product } = useProductList(listArgs, {
//   selectFromResult: ({ data }) => ({
//     product: data?.find((product) => product._id === productId),
//   }),
// });

console.log('productService', productService);