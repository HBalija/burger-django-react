import React from 'react';

import './Input.scss';


const Input = props => {

  let inputElement = null;

  switch (props.elementType) {

  case 'select':
    inputElement = (
      <select
        onChange={props.changed}
        className="input-element"
        value={props.value}>
        {props.elementConfig.options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          );
        })}
      </select>
    );
    break;

  case 'textarea':
    inputElement = <textarea
      onChange={props.changed}
      className="input-element"
      {...props.elementConfig}
      value={props.value} />;
    break;

  default:
    inputElement = <input
      onChange={props.changed}
      className="input-element"
      {...props.elementConfig }
      value={props.value} />;
  }

  return (
    <div className="input">
      <label className="label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
