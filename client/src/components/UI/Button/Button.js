import React from 'react';

import './Button.scss';


const Button = props => (
  <button onClick={props.clicked} className={['button', props.btnType].join(' ')}>
    {props.children}
  </button>
);

export default Button;
