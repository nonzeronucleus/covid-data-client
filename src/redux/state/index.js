import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
// import _ from 'lodash'
import * as actions from '../actions';

const time = createReducer({
  [actions.setTime]: (state, payload) => payload
}, null)

export default combineReducers({
  time
});
