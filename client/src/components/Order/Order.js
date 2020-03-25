import React from 'react';

import './Order.scss';


const Order = props => (
  <div className="order">
    <p>Ingredients: Salad ({props.salad}), Meat: ({props.meat}),
    Cheese: ({props.cheese}), Bacon: ({props.bacon})</p>
    <p>Price <strong>USD {props.price}</strong></p>
  </div>
);

export default Order;
