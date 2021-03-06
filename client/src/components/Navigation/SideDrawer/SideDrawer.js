import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import './SideDrawer.scss';


const SideDrawer = props => {
  const attachedClasses = ['side-drawer', props.open ? 'open': 'close'].join(' ');
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses} onClick={props.closed}>
        <div className="side-drawer-logo">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
