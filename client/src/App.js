import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOC/Layout/Layout';
import BurgerContainer from './containers/BurgerContainer/BurgerContainer';
import CheckoutContainer from './containers/CheckoutContainer/CheckoutContainer';
import OrdersContainer from './containers/OrdersContainer/OrdersContainer';


function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route component={CheckoutContainer} path="/checkout" />
          <Route component={OrdersContainer} path="/orders" />
          <Route component={BurgerContainer} exact path="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
