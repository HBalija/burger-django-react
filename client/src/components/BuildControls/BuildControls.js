import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import './BuildControls.scss';


const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = () => (
  <div className="build-controls">
    { controls.map(control => <BuildControl {...control} key={control.type} />) }
  </div>
);

export default BuildControls;
