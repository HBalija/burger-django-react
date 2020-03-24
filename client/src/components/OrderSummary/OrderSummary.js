import React from 'react';

import Button from '../UI/Button/Button';


const OrderSummary = props => {
  const ingredients = [];
  for (let property in props.ingredients) {
    ingredients.push(
      <li key={property}><span
        style={{ textTransform: 'capitalize' }}>
        {property}</span>: {props.ingredients[property]}
      </li>);
  }
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>
        {ingredients}
      </ul>
      <p><strong>Total Price: {props.total_price.toFixed(1)}</strong></p>
      <p>Continue to checkout?</p>
      <Button clicked={props.onCancel} btnType="danger">CANCEL</Button>
      <Button clicked={props.onContinue} btnType="success">CONTINUE</Button>
    </>
  );
};

export default OrderSummary;
