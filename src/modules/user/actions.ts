import { createAction, createAsyncAction } from 'typesafe-actions';

export const login = createAsyncAction(
  'user/login',
  'user/loginSuccess',
  'user/loginFailure'
)<App.User.LoginPayload, App.User, void>();
export const logout = createAction('user/logout')();
