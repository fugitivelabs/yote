/**
 * Reads and exports the reducers as defined by each resource module
 *
 * NOTE: this facilitates adding reducers via the CLI
 */

export { default as user } from './user/userReducers.js';
export { default as product } from './product/productReducers.js';
