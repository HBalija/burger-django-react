import React from 'react';

import './Layout.scss';

const layout = props => (
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className="content">
      {props.children}
    </main>
  </>
);

export default layout;
