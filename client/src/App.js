import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/actionIndex';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerContainer from './containers/BurgerContainer/BurgerContainer';
import Logout from './containers/AuthContainer/Logout/Logout';


const asyncCheckout = asyncComponent(() => {
  return import('./containers/CheckoutContainer/CheckoutContainer');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/OrdersContainer/OrdersContainer');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/AuthContainer/AuthContainer');
});


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {

    let routes = (
      <Switch>
        <Route component={BurgerContainer} exact path="/" />
        <Route component={asyncAuth} path="/auth" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route component={BurgerContainer} exact path="/" />
          <Route component={asyncCheckout} path="/checkout" />
          <Route component={asyncOrders} path="/orders" />
          <Route component={asyncAuth} path="/auth" />
          <Route component={Logout} path="/logout" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

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
