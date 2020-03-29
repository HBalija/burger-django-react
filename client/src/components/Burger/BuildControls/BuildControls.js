import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import './BuildControls.scss';


const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = props => (
  <div className="build-controls">
    <p>Total Price: <strong>{props.total_price.toFixed(1)}</strong></p>
    {
      controls.map(control => (
        <BuildControl
          {...control}
          // set to false if value of type is zero
          disabled={!props.ingredients[control.type]}
          key={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)} />))
    }
    <button
      onClick={props.handlePurchase}
      className="order-button"
      disabled={!props.purchasable}>
      {props.isAuth ?'ORDER NOW' : 'SIGN IN TO ORDER'}
    </button>
  </div>
);

export default BuildControls;
