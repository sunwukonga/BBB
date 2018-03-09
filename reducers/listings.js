
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const searchedListings = createReducer({}, {

});

export const listingCount = createReducer(0, {
  [types.ADD_LISTING](state, action) {
    return state + 1;
  }

});

