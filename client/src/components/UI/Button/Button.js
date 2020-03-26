import React from 'react';

import './Button.scss';


const Button = props => (
  <button
    onClick={props.clicked}
    disabled={props.disabled}
    className={['button', props.btnType].join(' ')}>
    {props.children}
  </button>
);

export default Button;
