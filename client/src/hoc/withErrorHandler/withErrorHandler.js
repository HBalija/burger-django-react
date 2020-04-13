import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
  return props => {

    const [error, setError] = useState(null);

    // before: component willMount
    // setup global request / response interceptors
    const requestInterceptor = axios.interceptors.request.use(request => {
      setError(null);
      return request;
    });

    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      err => {
        setError(err);
      });

    // before: component will unmount
    // we clean up whenever our interceptors change
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.request.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);

    return (
      <>
        <Modal
          show={error}
          modalClosed={() => setError(null)}>
          {error && error.message}
        </Modal>
        <WrappedComponent { ...props } />
      </>
    );
  };

};

export default withErrorHandler;
