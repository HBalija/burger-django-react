import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {

  state = {
    ingredients: {},
    totalPrice: 0
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === 'price') totalPrice = +param[1];
      else ingredients[param[0]] = +param[1];  // convert to number by adding plus
    }
    this.setState({ ingredients, totalPrice });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients} />
        <Route
          render={props => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.totalPrice} />
          )}
          path={this.props.match.path + '/contact-data'} />
      </div>
    );
  }
}

export default Checkout;