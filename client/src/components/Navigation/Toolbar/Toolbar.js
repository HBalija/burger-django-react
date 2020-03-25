import React from 'react';

import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import './Toolbar.scss';


const Toolbar = props => (
  <header className="toolbar">
    <div onClick={props.onSideDrawerAction} className="drawer-toggle">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className="toolbar-logo">
      <Logo  />
    </div>
    <nav className="desktop-only">
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
