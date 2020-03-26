import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


const Checkout = props => (
  <>
    <CheckoutSummary
      checkoutCancelled={() => props.history.goBack()}
      checkoutContinued={() => props.history.replace(`${props.match.path}/contact-data`)}
      ingredients={props.ings} />
    <Route component={ContactData} path={`${props.match.path}/contact-data`} />
  </>
);

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.total_price
  };
};

export default connect(mapStateToProps)(Checkout);
