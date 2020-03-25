import React from 'react';

import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {

    state = {
      error: null
    }

    componentWillMount() {
      // setup global request / response interceptors
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error });
        });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.request.eject(this.responseInterceptor);
    }

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={() => this.setState({ error: null })}>
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent { ...this.props } />
        </>
      );
    }
  };

};

export default withErrorHandler;
