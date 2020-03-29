import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import AuthContainer from './containers/AuthContainer/AuthContainer';
import BurgerContainer from './containers/BurgerContainer/BurgerContainer';
import CheckoutContainer from './containers/CheckoutContainer/CheckoutContainer';
import OrdersContainer from './containers/OrdersContainer/OrdersContainer';
import Logout from './containers/AuthContainer/Logout/Logout';


function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route component={BurgerContainer} exact path="/" />
          <Route component={CheckoutContainer} path="/checkout" />
          <Route component={OrdersContainer} path="/orders" />
          <Route component={AuthContainer} path="/auth" />
          <Route component={Logout} path="/logout" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
