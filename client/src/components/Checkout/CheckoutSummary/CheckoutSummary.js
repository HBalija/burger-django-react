import React from 'react';

import './CheckoutSummary.scss';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';


const CheckoutSummary = props => {
  return (
    <div className="checkout-summary">
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        clicked={props.checkoutCancelled}
        btnType="danger">
        CANCEL
      </Button>
      <Button
        clicked={props.checkoutContinued}
        btnType="success">
          CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
