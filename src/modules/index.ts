import { createStore, IModuleStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { getRouterModule } from './router';
import { getUserModule } from './user';

export const configureStore = (): IModuleStore<App.State> =>
  createStore(
    {
      initialState: {},
      enhancers: [],
      extensions: [
        getSagaExtension(),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
      ],
    },
    getRouterModule(),
    getUserModule()
  );
