import React from 'react';

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
      <p>Continue to checkout?</p>
    </>
  );
};

export default OrderSummary;
