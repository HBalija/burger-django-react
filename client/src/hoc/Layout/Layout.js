import React, { useState } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import './Layout.scss';


const Layout = props => {

  const [showSideDrawer, setShowSideDrawer] = useState(false);


  const sideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <>
      <Toolbar onSideDrawerAction={sideDrawerHandler} />
      <SideDrawer open={showSideDrawer} closed={sideDrawerHandler} />
      <main className="content">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
