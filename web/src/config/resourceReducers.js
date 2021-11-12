/**
 * Reads and exports the reducers as defined by each resource module
 *
 * NOTE: this facilitates adding reducers via the CLI
 */

export { default as auth } from '../resources/user/authStore.js';
export { default as product } from '../resources/product/productStore.js';
export { default as notification } from '../resources/notification/notificationStore.js';