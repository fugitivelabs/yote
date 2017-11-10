/**
 * Reads and exports the routes as defined by each resource module
 *
 * NOTE: this facilitates adding routes via the CLI
 */

// import UserRouter from './user/UserRouter.js.jsx';
// import ProductRouter from './product/ProductRouter.js.jsx';
//
// export { UserRouter };
// export { ProductRouter };
//
// export default {
//   ProductRouter
//   , UserRouter
// }


export { default as UserRouter } from './user/UserRouter.js.jsx';
export { default as ProductRouter } from './product/ProductRouter.js.jsx';
