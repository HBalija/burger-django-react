import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import './Modal.scss';


class Modal extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="modal"
          style={{
            transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
            opacity:  this.props.show ? '1': '0'
          }}>
          {this.props.children}
        </div>
      </>
    );

  }
}

export default Modal;
