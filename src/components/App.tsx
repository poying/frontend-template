import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('src/containers/HomePage'));

export default () => (
  <div>
    <Suspense fallback="loading...">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </div>
);
