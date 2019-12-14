import { ISagaModule } from 'redux-dynamic-modules-saga';
import reducer from './reducer';
import saga from './saga';

export function getUserModule(): ISagaModule<App.User.AwareState> {
  return {
    id: 'user',
    reducerMap: {
      user: reducer,
    },
    sagas: [saga],
  };
}
