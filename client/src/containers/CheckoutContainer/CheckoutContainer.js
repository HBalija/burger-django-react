import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


const Checkout = props => {

  // redirect on refresh
  let summary = <Redirect to="/" />;
  if (props.ings) {
    summary = (
      <>
        <CheckoutSummary
          checkoutCancelled={() => props.history.goBack()}
          checkoutContinued={() => props.history.replace(`${props.match.path}/contact-data`)}
          ingredients={props.ings} />
        <Route component={ContactData} path={`${props.match.path}/contact-data`} />
      </>
    );
  }

  return (
    <>
      {summary}
    </>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    totalPrice: state.burger.total_price
  };
};

export default connect(mapStateToProps)(Checkout);
