/**
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
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiUtils from '../../global/utils/api';
// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // this will preface all fetches so we only need to add "products/..." for each query below
  tagTypes: ['Products'],
  endpoints: (builder) => ({

    // CREATE
    createProduct: builder.mutation({
      query: body => ({
        url: `products`,
        method: 'POST',
        body
      }),
      transformResponse: (response) => response.product, // response looks like {success: true, product: {...}} we only want response.product
      // Invalidates all Product-type queries of type 'Products',after all, depending of the sort order,
      // that newly created product could show up in any list.
      invalidatesTags:  (product, error, {_id}) => [{ type: 'Products' }],
    }),

    // READ
    // fetch single
    productById: builder.query({
      query: (id) => `products/${id}`, // endpoint will be "/api/products/id"
      transformResponse: (response) => response.product, // response looks like {success: true, product: {...}} we only want response.product
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    // fetch list
    // Provides a list of `Products` with yote style listArgs.
    productList: builder.query({
      query: (listArgs) => apiUtils.getEndpointFromListArgs('products', listArgs),
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
    // fetch default
    defaultProduct: builder.query({
      query: () => `products/default`, // endpoint will be "/api/products/id"
      transformResponse: (response) => response.defaultObj,
    }),

    // UPDATE
    updateProduct: builder.mutation({
      query: ({ _id, ...patch }) => ({
        url: `products/${_id}`,
        method: 'PUT',
        body: patch, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
      transformResponse: (response) => response.product,
      // Invalidates all queries that subscribe to this Product `id` only.
      // In this case, `productById` will be re-run. `productList` *might*  rerun, if this id was under its results.
      invalidatesTags: (product, error, {_id}) => [{ type: 'Products', id: _id }],
    }),

    // DELETE
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE'
      }),
      // Invalidates all queries that subscribe to this Product `id` only.
      // In this case, `productById` will be re-run. `productList` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
  }),
})

// Export generated hooks for usage in functional components
export const {
  useCreateProductMutation,
  useDefaultProductQuery,
  useProductByIdQuery,
  useProductListQuery,
  useUpdateProductMutation,
} = productApi;

// export with friendlier names
export {
  useCreateProductMutation as useCreateProduct,
  useDefaultProductQuery as useDefaultProduct,
  useProductByIdQuery as useSingleProduct,
  useProductListQuery as useProductList,
  useUpdateProductMutation as useUpdateProduct,
}
