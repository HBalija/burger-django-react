import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import './Toolbar.scss';


const Toolbar = props => (
  <header className="toolbar">
    <div onClick={props.onSideDrawerAction}>MENU</div>
    <div className="toolbar-logo">
      <Logo  />
    </div>
    <nav className="desktop-only">
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
