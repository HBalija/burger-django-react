import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import './Modal.scss';


const Modal = props => (
  <>
    <Backdrop show={props.show} exitPurchaseMode={props.exitPurchaseMode} />
    <div
      className="modal"
      style={{
        transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
        opacity:  props.show ? '1': '0'
      }}>
      {props.children}
    </div>
  </>
);

export default Modal;
