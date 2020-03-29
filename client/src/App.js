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
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  };
};

export default connect(null, mapDispatchToProps)(App);
