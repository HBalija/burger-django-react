import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.scss';


const NavigationItems = () => (
  <ul className="navigation-items">
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;
