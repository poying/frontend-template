import { ConnectedRouter } from 'connected-react-router';
import React, { PropsWithChildren } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { configureStore } from 'src/modules';
import { history } from 'src/modules/router';

const store = configureStore();

export default function Provider(props: PropsWithChildren<{}>) {
  return (
    <StoreProvider store={store}>
      <ConnectedRouter history={history}>{props.children}</ConnectedRouter>
    </StoreProvider>
  );
}
