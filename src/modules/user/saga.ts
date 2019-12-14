import { call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as actions from './actions';

function* handleLoginAction(action: ReturnType<typeof actions.login.request>) {
  yield call(console.log, action.payload);
  yield put(
    actions.login.success({
      displayName: 'abc',
      email: 'abc@gmail.com',
    })
  );
}

export default function* sagas() {
  yield takeLatest(getType(actions.login.request), handleLoginAction);
}
