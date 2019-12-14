import { createReducer, getType } from 'typesafe-actions';
import * as actions from './actions';

const initialState = {
  loginProcessing: false,
};

export default createReducer<App.User.State>(initialState, {
  [getType(actions.login.request)]: state => ({
    ...state,
    loginProcessing: true,
  }),
  [getType(actions.login.success)]: (state, action) => ({
    ...state,
    user: action.payload,
    loginProcessing: false,
  }),
  [getType(actions.login.failure)]: state => ({
    ...state,
    user: undefined,
    loginProcessing: false,
  }),
});
