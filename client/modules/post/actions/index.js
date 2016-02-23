/****

combine all post actions into one export file

****/


import * as listActions from './postListActions';
import * as singleActions from './postSingleActions';

export { listActions };
export { singleActions };

export default {
  listActions
  , singleActions
}
