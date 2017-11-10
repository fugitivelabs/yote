/**
 * Reads and exports the routes as defined by each resource module.
 *
 * NOTE: this facilitates adding routes via the CLI. The CLI will automatically
 * build these exports with the camelCase version of the resource name so as to
 * add a consistent top-level path to the resource. A resource named UserWorkout
 * will show below as follows:
 *
 * export { default as userWorkout } from './userWorkout/UserWorkoutRouter.js.jsx'
 *
 * This will give it a top-level route path called 'user-workouts'
 */

export { default as admin } from  './admin/AdminRouter.js.jsx';
export { default as user } from './user/UserRouter.js.jsx';
export { default as products } from './product/ProductRouter.js.jsx';
