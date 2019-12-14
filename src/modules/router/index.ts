import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, LocationState } from 'history';
import { IModule } from 'redux-dynamic-modules';

export const history = createBrowserHistory();

export const getRouterModule = (): IModule<LocationState> => ({
  id: 'router',
  reducerMap: {
    router: connectRouter(history),
  } as any,
  middlewares: [routerMiddleware(history)],
});
