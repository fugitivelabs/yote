/****

combine all post actions into one export file

****/



import * as listActions from './userListActions';
import * as singleActions from './userSingleActions';

export { listActions };
export { singleActions };

export default {
  listActions
  , singleActions
}
