import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';


function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route component={BurgerBuilder} exact path="/" />
          <Route component={Checkout} path="/checkout" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
