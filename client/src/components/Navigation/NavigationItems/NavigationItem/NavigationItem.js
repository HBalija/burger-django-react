import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.scss';


const NavigationItem = props => (
  <li className="navigation-item">
    {/* active class is applied by default */}
    <NavLink exact to={props.link}>{props.children}</NavLink>
  </li>
);

export default NavigationItem;
