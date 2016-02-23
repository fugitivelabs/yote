/****

combine all product actions into one export file

****/


import * as listActions from './productListActions';
import * as singleActions from './productSingleActions';

export { listActions };
export { singleActions };

export default {
  listActions
  , singleActions
}
