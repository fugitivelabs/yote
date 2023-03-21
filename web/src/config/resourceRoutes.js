/**
 * Reads and exports the routes as defined by each resource module.
 *
 * NOTE: this facilitates adding routes via the CLI. The CLI will automatically
 * build these exports with the camelCase version of the resource name so as to
 * add a consistent top-level path to the resource. A resource named UserWorkout
 * will show below as follows:
 *
 * export { default as userWorkout } from './userWorkout/UserWorkoutRouter.jsx'
 *
 * This will give it a top-level route path called 'user-workouts'
 */

import { lazy } from 'react';

// lazy load the routes so they aren't included in the intial bundle and don't load until they are needed or until we decide to preload them (on App.jsx)
export const user = lazy(() => import('../resources/user/UserRouter.jsx'));
export const products = lazy(() => import('../resources/product/ProductRouter.jsx'));