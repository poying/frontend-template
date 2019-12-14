import React from 'react';
import { hot } from 'react-hot-loader/root';
import App from './App';
import Provider from './Provider';

function Entry() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}

export default hot(Entry);
