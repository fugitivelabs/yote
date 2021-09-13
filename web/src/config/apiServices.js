// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// /**
//  * Recommended usage is to create one api for each baseUrl (we only have one baseUrl).
//  * We will define that here and then inject our endpoints for each resource as needed.
//  * 
//  * More info: https://redux-toolkit.js.org/rtk-query/usage/code-splitting
//  * 
//  * This may make it impossible to define individual reducers by resource and there are 
//  * examples where multiple apis are created (for users and posts for instance) so we'll do
//  * it by resource for now. May be worth revisiting.
//  */

// // initialize an empty api service that we'll inject endpoints into later as needed
// export const fetchApi = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
//   tagTypes: ['Products'], // one for each resource. Allows us to invalidate lists
//   endpoints: () => ({}),
// })