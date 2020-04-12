import React, { useEffect, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/actionIndex';

import Layout from './hoc/Layout/Layout';
import BurgerContainer from './containers/BurgerContainer/BurgerContainer';
import Logout from './containers/AuthContainer/Logout/Logout';
import Spinner from './components/UI/Spinner/Spinner';


const Checkout = React.lazy(() => {
  return import('./containers/CheckoutContainer/CheckoutContainer');
});

const Orders = React.lazy(() => {
  return import('./containers/OrdersContainer/OrdersContainer');
});

const Auth = React.lazy(() => {
  return import('./containers/AuthContainer/AuthContainer');
});


const App = props => {

  useEffect(() => {
    props.onTryAutoSignin();
  }, []); // eslint-disable-line

  let routes = (
    <Switch>
      <Route component={BurgerContainer} exact path="/" />
      <Route render={() => <Auth />} path="/auth" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route component={BurgerContainer} exact path="/" />
        <Route render={() => <Checkout />} path="/checkout" />
        <Route render={() => <Orders />} path="/orders" />
        <Route render={() => <Auth />} path="/auth" />
        <Route component={Logout} path="/logout" />
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        {routes}
      </Suspense>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.email !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
