/*****

CUSTOM ACTIONS GO HERE

i.e. non-CRUD actions like toggling tabs or filters 

*****/

export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER
    , filter
  }
}
