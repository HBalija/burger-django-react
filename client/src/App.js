import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/actionIndex';

import Layout from './hoc/Layout/Layout';
import AuthContainer from './containers/AuthContainer/AuthContainer';
import BurgerContainer from './containers/BurgerContainer/BurgerContainer';
import CheckoutContainer from './containers/CheckoutContainer/CheckoutContainer';
import OrdersContainer from './containers/OrdersContainer/OrdersContainer';
import Logout from './containers/AuthContainer/Logout/Logout';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {

    let routes = (
      <Switch>
        <Route component={BurgerContainer} exact path="/" />
        <Route component={AuthContainer} path="/auth" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route component={BurgerContainer} exact path="/" />
          <Route component={CheckoutContainer} path="/checkout" />
          <Route component={OrdersContainer} path="/orders" />
          <Route component={AuthContainer} path="/auth" />
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
