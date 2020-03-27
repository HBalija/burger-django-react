import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.scss';


const NavigationItems = () => (
  <ul className="navigation-items">
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Authenticate</NavigationItem>
  </ul>
);

export default NavigationItems;
