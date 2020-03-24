import React from 'react';

import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {

    state = {
      error: null
    }

    componentDidMount() {
      // setup global request / response interceptors
      axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });

      axios.interceptors.response.use(response => response, error => {
        this.setState({ error });
      });
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
