import React from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import './Layout.scss';


class Layout extends React.Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  }

  render() {
    return (
      <>
        <Toolbar onSideDrawerAction={this.sideDrawerHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerHandler} />
        <main className="content">
          {this.props.children}
        </main>
      </>
    );
  }
}
export default Layout;
