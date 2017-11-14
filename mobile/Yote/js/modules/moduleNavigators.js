/**
 * Reads and exports the navigators as defined by each resource module
 *
 * To add a resource navigator to the tabs bar, import it from AppNavigator
 *
 * NOTE: this facilitates adding navigators via the CLI
 */

export { default as ProductNavigator } from './product/ProductNavigator'; 
export { default as UserNavigator } from './user/UserNavigator';
