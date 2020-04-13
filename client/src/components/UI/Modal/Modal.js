import React from 'react';

import Backdrop from '../Backdrop/Backdrop';

import './Modal.scss';


const shouldComponentUpdate = (prevProps, nextProps) => {
  // update component only if these props are equal
  return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
};


const Modal = props => {

  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className="modal"
        style={{
          transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
          opacity: props.show ? '1': '0'
        }}>
        {props.children}
      </div>
    </>
  );
};

export default React.memo(Modal, shouldComponentUpdate);
