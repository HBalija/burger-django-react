import React from 'react';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.scss';


export const NavigationItems = ({ email }) => {

  let auth = <NavigationItem link="/auth">Authenticate</NavigationItem>;
  if (email) auth = (
    <>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/logout">{email}: Log out</NavigationItem>;
    </>
  );
  return (
    <ul className="navigation-items">
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {auth}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    email: state.auth.email
  };
};

export default connect(mapStateToProps)(NavigationItems);
