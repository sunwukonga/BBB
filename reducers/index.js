
import { combineReducers } from 'redux';
import * as ListingsReducer from './listings'

export default combineReducers(Object.assign({},
  ListingsReducer,
));

