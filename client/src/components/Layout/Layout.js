import React from 'react';

import './Layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = props => (
  <>
    <Toolbar />
    <main className="content">
      {props.children}
    </main>
  </>
);

export default Layout;
